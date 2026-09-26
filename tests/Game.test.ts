import { DataObject } from '@civ-clone/core-data-object/DataObject';
import { Game } from '../Game';
import City from '@civ-clone/core-city/City';
import Player from '@civ-clone/core-player/Player';
import { createRng } from '@civ-clone/core-random';
import { defaultGame } from '../defaultGame';
import { expect } from 'chai';
import { instance as availableSpecialistRegistryInstance } from '@civ-clone/core-city/AvailableSpecialistRegistry';
import { instance as cityRegistryInstance } from '@civ-clone/core-city/CityRegistry';
import { instance as playerRegistryInstance } from '@civ-clone/core-player/PlayerRegistry';
import { instance as specialistRegistryInstance } from '@civ-clone/core-city/SpecialistRegistry';

describe('Game', (): void => {
  it('should give each game its own registries', (): void => {
    const a = new Game();
    const b = new Game();

    expect(a.cities).to.not.equal(b.cities);
    expect(a.units).to.not.equal(b.units);
    expect(a.rules).to.not.equal(b.rules);
    expect(a.players).to.not.equal(b.players);
    expect(a.specialists).to.not.equal(b.specialists);
    expect(a.availableSpecialists).to.not.equal(b.availableSpecialists);
  });

  it('should not let one game see another game`s entities', (): void => {
    const a = new Game();
    const b = new Game();

    a.players.register(new Player(a.rules));

    expect(a.players.entries()).to.have.lengthOf(1);
    expect(b.players.entries()).to.have.lengthOf(0);
  });

  it('should give each game its own random stream', (): void => {
    const a = new Game({ rng: createRng(1) });
    const b = new Game({ rng: createRng(1) });

    a.rng();
    a.rng();

    expect(a.rng.calls()).to.equal(2);
    expect(b.rng.calls()).to.equal(0);

    // Same seed, so b's first draw matches a's first — the streams are
    // independent, not merely separate objects.
    const bFirst = b.rng();

    a.rng.restore(1, 0);

    expect(a.rng()).to.equal(bFirst);
  });

  it('should give each game its own engine', (): void => {
    // Sharing one would mean each game saw the other's turns start.
    const a = new Game();
    const b = new Game();
    let heard = 0;

    a.engine.on('turn:start', () => (heard += 1));
    b.engine.emit('turn:start', 1);

    expect(heard).to.equal(0);

    a.engine.emit('turn:start', 1);

    expect(heard).to.equal(1);
  });

  it('should give each game its own turn and year', (): void => {
    const a = new Game();
    const b = new Game();

    a.turn.increment();
    a.turn.increment();

    expect(a.turn.value()).to.equal(2);
    expect(b.turn.value()).to.equal(0);
  });

  it('should let `defaultGame` adopt the module singletons', (): void => {
    // This is what makes the migration incremental: a package still importing
    // `instance` and one using `game.cities` must see the same registry, or a
    // half-migrated engine quietly disagrees with itself.
    expect(defaultGame.cities).to.equal(cityRegistryInstance);
    expect(defaultGame.players).to.equal(playerRegistryInstance);
    expect(defaultGame.specialists).to.equal(specialistRegistryInstance);
    expect(defaultGame.availableSpecialists).to.equal(
      availableSpecialistRegistryInstance
    );
  });

  it('should keep `defaultGame` separate from a fresh game', (): void => {
    const fresh = new Game();

    expect(fresh.cities).to.not.equal(defaultGame.cities);
    expect(fresh.specialists).to.not.equal(defaultGame.specialists);
    expect(fresh.availableSpecialists).to.not.equal(
      defaultGame.availableSpecialists
    );
  });

  it('should wire the registries that need other slots', (): void => {
    // `WorkedTileRegistry` takes a `RuleRegistry`, and it must be the game's
    // own — not the singleton, which is what a naive `new WorkedTileRegistry()`
    // would have picked up.
    const game = new Game();

    expect((game.workedTiles as any)._ruleRegistry).to.equal(game.rules);
    expect((game.cityNames as any)._randomNumberGenerator).to.equal(game.rng);
    expect((game.strategies as any)._randomNumberGenerator).to.equal(game.rng);
  });

  it('should give each game its own ClassRegistry', (): void => {
    const a = new Game();
    const b = new Game();

    expect(a.classes).not.to.equal(b.classes);
  });

  it('should refuse to leave a transient field undefined', (): void => {
    // `inject` fills what the save omitted. A `transient` field it has no
    // source for would otherwise be left `undefined`, which is a wrong answer
    // rather than an error — `Yield.value()` returns `undefined` in exactly
    // that state, with no throw. See 03-save-format.md.
    class Unknown extends DataObject {
      static readonly transient = ['_id', '_keys', '_noSourceForThis'];
      private _noSourceForThis: object | null = null;
    }

    expect(() => new Game().inject(Object.create(Unknown.prototype))).to.throw(
      /_noSourceForThis/
    );
  });

  it('should fill a cache with its initialiser, not a registry', (): void => {
    // The three categories differ: a cache needs the value its own field
    // initialiser would have produced, because the lazy guard that recomputes
    // it is written against that and not against `undefined`.
    class Cached extends DataObject {
      static readonly transient = ['_id', '_keys', '_valueCache'];
      private _valueCache: number | null = null;
    }

    const entity = Object.create(Cached.prototype);

    new Game().inject(entity);

    expect(entity._valueCache).to.equal(null);
  });
});
