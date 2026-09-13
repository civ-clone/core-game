import { Game } from '../Game';
import City from '@civ-clone/core-city/City';
import Player from '@civ-clone/core-player/Player';
import { createRng } from '@civ-clone/core-random';
import { defaultGame } from '../defaultGame';
import { expect } from 'chai';
import { instance as cityRegistryInstance } from '@civ-clone/core-city/CityRegistry';
import { instance as playerRegistryInstance } from '@civ-clone/core-player/PlayerRegistry';

describe('Game', (): void => {
  it('should give each game its own registries', (): void => {
    const a = new Game();
    const b = new Game();

    expect(a.cities).to.not.equal(b.cities);
    expect(a.units).to.not.equal(b.units);
    expect(a.rules).to.not.equal(b.rules);
    expect(a.players).to.not.equal(b.players);
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
  });

  it('should keep `defaultGame` separate from a fresh game', (): void => {
    const fresh = new Game();

    expect(fresh.cities).to.not.equal(defaultGame.cities);
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
});
