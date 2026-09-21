"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const AIClientRegistry_1 = require("@civ-clone/core-ai-client/AIClientRegistry");
const AdditionalDataRegistry_1 = require("@civ-clone/core-data-object/AdditionalDataRegistry");
const AttributeRegistry_1 = require("@civ-clone/core-civilization/AttributeRegistry");
const ClassRegistry_1 = require("@civ-clone/core-data-object/ClassRegistry");
const Generator_1 = require("@civ-clone/core-world-generator/Generator");
const AdvanceRegistry_1 = require("@civ-clone/core-science/AdvanceRegistry");
const AttributeRegistry_2 = require("@civ-clone/core-civilization/AttributeRegistry");
const AvailableCityBuildItemsRegistry_1 = require("@civ-clone/core-city-build/AvailableCityBuildItemsRegistry");
const AvailableGovernmentRegistry_1 = require("@civ-clone/core-government/AvailableGovernmentRegistry");
const AvailableTerrainFeatureRegistry_1 = require("@civ-clone/core-terrain-feature/AvailableTerrainFeatureRegistry");
const AvailableTileImprovementRegistry_1 = require("@civ-clone/core-tile-improvement/AvailableTileImprovementRegistry");
const AvailableUnitImprovementRegistry_1 = require("@civ-clone/core-unit-improvement/AvailableUnitImprovementRegistry");
const AvailableTradeRateRegistry_1 = require("@civ-clone/core-trade-rate/AvailableTradeRateRegistry");
const CityBuildRegistry_1 = require("@civ-clone/core-city-build/CityBuildRegistry");
const CityGrowthRegistry_1 = require("@civ-clone/core-city-growth/CityGrowthRegistry");
const CityImprovementRegistry_1 = require("@civ-clone/core-city-improvement/CityImprovementRegistry");
const CityNameRegistry_1 = require("@civ-clone/core-civilization/CityNameRegistry");
const CityRegistry_1 = require("@civ-clone/core-city/CityRegistry");
const CivilizationRegistry_1 = require("@civ-clone/core-civilization/CivilizationRegistry");
const ClientRegistry_1 = require("@civ-clone/core-client/ClientRegistry");
const CurrentPlayerRegistry_1 = require("@civ-clone/core-player/CurrentPlayerRegistry");
const GeneratorRegistry_1 = require("@civ-clone/core-world-generator/GeneratorRegistry");
const GoodyHutRegistry_1 = require("@civ-clone/core-goody-hut/GoodyHutRegistry");
const Engine_1 = require("@civ-clone/core-engine/Engine");
const core_random_1 = require("@civ-clone/core-random");
const InteractionRegistry_1 = require("@civ-clone/core-diplomacy/InteractionRegistry");
const LandMassRegistry_1 = require("@civ-clone/core-world/LandMassRegistry");
const LayoutRegistry_1 = require("@civ-clone/core-spaceship/LayoutRegistry");
const LeaderRegistry_1 = require("@civ-clone/core-civilization/LeaderRegistry");
const PathFinderRegistry_1 = require("@civ-clone/core-world-path/PathFinderRegistry");
const core_pending_effect_1 = require("@civ-clone/core-pending-effect");
const PlayerGovernmentRegistry_1 = require("@civ-clone/core-government/PlayerGovernmentRegistry");
const PlayerRegistry_1 = require("@civ-clone/core-player/PlayerRegistry");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const PlayerTradeRatesRegistry_1 = require("@civ-clone/core-trade-rate/PlayerTradeRatesRegistry");
const PlayerTreasuryRegistry_1 = require("@civ-clone/core-treasury/PlayerTreasuryRegistry");
const PlayerWorldRegistry_1 = require("@civ-clone/core-player-world/PlayerWorldRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const SpaceshipRegistry_1 = require("@civ-clone/core-spaceship/SpaceshipRegistry");
const StrategyNoteRegistry_1 = require("@civ-clone/core-strategy/StrategyNoteRegistry");
const StrategyRegistry_1 = require("@civ-clone/core-strategy/StrategyRegistry");
const TerrainFeatureRegistry_1 = require("@civ-clone/core-terrain-feature/TerrainFeatureRegistry");
const TerrainRegistry_1 = require("@civ-clone/core-terrain/TerrainRegistry");
const TileImprovementRegistry_1 = require("@civ-clone/core-tile-improvement/TileImprovementRegistry");
const TraitRegistry_1 = require("@civ-clone/core-civilization/TraitRegistry");
const TransportRegistry_1 = require("@civ-clone/core-unit-transport/TransportRegistry");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const UnitImprovementRegistry_1 = require("@civ-clone/core-unit-improvement/UnitImprovementRegistry");
const UnitRegistry_1 = require("@civ-clone/core-unit/UnitRegistry");
const WonderRegistry_1 = require("@civ-clone/core-wonder/WonderRegistry");
const WorkedTileRegistry_1 = require("@civ-clone/core-city/WorkedTileRegistry");
const Year_1 = require("@civ-clone/core-game-year/Year");
const YieldRegistry_1 = require("@civ-clone/core-yield/YieldRegistry");
class Game {
    /**
     * `adopted` lets a game take ownership of registries that already exist,
     * which is what `defaultGame` uses to wrap the module singletons. Without it
     * the two worlds would diverge: code still importing `instance` and code
     * using `game.cities` would be looking at different registries, and the
     * migration could not be done a package at a time.
     *
     * Constructed with no argument, a game gets its own of everything — which is
     * the point of the exercise.
     */
    constructor(adopted = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26;
        // `Engine` is per-game too: it carries the event stream a game runs on, so
        // two games sharing one would each see the other's turns start.
        this.engine = (_a = adopted.engine) !== null && _a !== void 0 ? _a : new Engine_1.Engine();
        this.rng = (_b = adopted.rng) !== null && _b !== void 0 ? _b : (0, core_random_1.createRng)(Date.now());
        this.turn = (_c = adopted.turn) !== null && _c !== void 0 ? _c : new Turn_1.Turn();
        this.year = (_d = adopted.year) !== null && _d !== void 0 ? _d : new Year_1.Year();
        // `rules` and `rng` are assigned before the registries that take them.
        this.rules = (_e = adopted.rules) !== null && _e !== void 0 ? _e : new RuleRegistry_1.RuleRegistry();
        this.additionalData =
            (_f = adopted.additionalData) !== null && _f !== void 0 ? _f : new AdditionalDataRegistry_1.AdditionalDataRegistry();
        this.advances = (_g = adopted.advances) !== null && _g !== void 0 ? _g : new AdvanceRegistry_1.AdvanceRegistry();
        this.aiClients = (_h = adopted.aiClients) !== null && _h !== void 0 ? _h : new AIClientRegistry_1.AIClientRegistry();
        this.classes = (_j = adopted.classes) !== null && _j !== void 0 ? _j : new ClassRegistry_1.ClassRegistry();
        this.attributes = (_k = adopted.attributes) !== null && _k !== void 0 ? _k : new AttributeRegistry_2.AttributeRegistry();
        this.availableCityBuildItems =
            (_l = adopted.availableCityBuildItems) !== null && _l !== void 0 ? _l : new AvailableCityBuildItemsRegistry_1.AvailableCityBuildItemsRegistry();
        this.availableGovernments =
            (_m = adopted.availableGovernments) !== null && _m !== void 0 ? _m : new AvailableGovernmentRegistry_1.AvailableGovernmentRegistry();
        this.availableTerrainFeatures =
            (_o = adopted.availableTerrainFeatures) !== null && _o !== void 0 ? _o : new AvailableTerrainFeatureRegistry_1.AvailableTerrainFeatureRegistry();
        this.availableTileImprovements =
            (_p = adopted.availableTileImprovements) !== null && _p !== void 0 ? _p : new AvailableTileImprovementRegistry_1.AvailableTileImprovementRegistry();
        this.availableUnitImprovements =
            (_q = adopted.availableUnitImprovements) !== null && _q !== void 0 ? _q : new AvailableUnitImprovementRegistry_1.AvailableUnitImprovementRegistry();
        this.availableTradeRates =
            (_r = adopted.availableTradeRates) !== null && _r !== void 0 ? _r : new AvailableTradeRateRegistry_1.AvailableTradeRateRegistry();
        this.cities = (_s = adopted.cities) !== null && _s !== void 0 ? _s : new CityRegistry_1.CityRegistry();
        this.cityBuilds = (_t = adopted.cityBuilds) !== null && _t !== void 0 ? _t : new CityBuildRegistry_1.CityBuildRegistry();
        this.cityGrowth = (_u = adopted.cityGrowth) !== null && _u !== void 0 ? _u : new CityGrowthRegistry_1.CityGrowthRegistry();
        this.cityImprovements =
            (_v = adopted.cityImprovements) !== null && _v !== void 0 ? _v : new CityImprovementRegistry_1.CityImprovementRegistry();
        this.cityNames = (_w = adopted.cityNames) !== null && _w !== void 0 ? _w : new CityNameRegistry_1.CityNameRegistry(this.rng);
        this.civilizations = (_x = adopted.civilizations) !== null && _x !== void 0 ? _x : new CivilizationRegistry_1.CivilizationRegistry();
        this.clients = (_y = adopted.clients) !== null && _y !== void 0 ? _y : new ClientRegistry_1.ClientRegistry();
        this.currentPlayers = (_z = adopted.currentPlayers) !== null && _z !== void 0 ? _z : new CurrentPlayerRegistry_1.CurrentPlayerRegistry();
        this.generators = (_0 = adopted.generators) !== null && _0 !== void 0 ? _0 : new GeneratorRegistry_1.GeneratorRegistry();
        this.goodyHuts = (_1 = adopted.goodyHuts) !== null && _1 !== void 0 ? _1 : new GoodyHutRegistry_1.GoodyHutRegistry();
        this.interactions = (_2 = adopted.interactions) !== null && _2 !== void 0 ? _2 : new InteractionRegistry_1.InteractionRegistry();
        this.landMasses = (_3 = adopted.landMasses) !== null && _3 !== void 0 ? _3 : new LandMassRegistry_1.LandMassRegistry();
        this.layouts = (_4 = adopted.layouts) !== null && _4 !== void 0 ? _4 : new LayoutRegistry_1.LayoutRegistry();
        this.leaders = (_5 = adopted.leaders) !== null && _5 !== void 0 ? _5 : new LeaderRegistry_1.LeaderRegistry();
        this.pathFinders = (_6 = adopted.pathFinders) !== null && _6 !== void 0 ? _6 : new PathFinderRegistry_1.PathFinderRegistry();
        this.pendingEffects = (_7 = adopted.pendingEffects) !== null && _7 !== void 0 ? _7 : new core_pending_effect_1.PendingEffectRegistry();
        this.playerGovernments =
            (_8 = adopted.playerGovernments) !== null && _8 !== void 0 ? _8 : new PlayerGovernmentRegistry_1.PlayerGovernmentRegistry();
        this.playerResearch =
            (_9 = adopted.playerResearch) !== null && _9 !== void 0 ? _9 : new PlayerResearchRegistry_1.PlayerResearchRegistry();
        this.players = (_10 = adopted.players) !== null && _10 !== void 0 ? _10 : new PlayerRegistry_1.PlayerRegistry();
        this.playerTradeRates =
            (_11 = adopted.playerTradeRates) !== null && _11 !== void 0 ? _11 : new PlayerTradeRatesRegistry_1.PlayerTradeRatesRegistry();
        this.playerTreasuries =
            (_12 = adopted.playerTreasuries) !== null && _12 !== void 0 ? _12 : new PlayerTreasuryRegistry_1.PlayerTreasuryRegistry();
        this.playerWorlds = (_13 = adopted.playerWorlds) !== null && _13 !== void 0 ? _13 : new PlayerWorldRegistry_1.PlayerWorldRegistry();
        this.spaceships = (_14 = adopted.spaceships) !== null && _14 !== void 0 ? _14 : new SpaceshipRegistry_1.SpaceshipRegistry();
        this.strategies = (_15 = adopted.strategies) !== null && _15 !== void 0 ? _15 : new StrategyRegistry_1.StrategyRegistry(this.rng);
        this.strategyNotes = (_16 = adopted.strategyNotes) !== null && _16 !== void 0 ? _16 : new StrategyNoteRegistry_1.StrategyNoteRegistry();
        this.terrainFeatures =
            (_17 = adopted.terrainFeatures) !== null && _17 !== void 0 ? _17 : new TerrainFeatureRegistry_1.TerrainFeatureRegistry();
        this.terrains = (_18 = adopted.terrains) !== null && _18 !== void 0 ? _18 : new TerrainRegistry_1.TerrainRegistry();
        this.tileImprovements =
            (_19 = adopted.tileImprovements) !== null && _19 !== void 0 ? _19 : new TileImprovementRegistry_1.TileImprovementRegistry();
        this.traits = (_20 = adopted.traits) !== null && _20 !== void 0 ? _20 : new TraitRegistry_1.TraitRegistry();
        this.transports = (_21 = adopted.transports) !== null && _21 !== void 0 ? _21 : new TransportRegistry_1.TransportRegistry();
        this.unitImprovements =
            (_22 = adopted.unitImprovements) !== null && _22 !== void 0 ? _22 : new UnitImprovementRegistry_1.UnitImprovementRegistry();
        this.units = (_23 = adopted.units) !== null && _23 !== void 0 ? _23 : new UnitRegistry_1.UnitRegistry();
        this.wonders = (_24 = adopted.wonders) !== null && _24 !== void 0 ? _24 : new WonderRegistry_1.WonderRegistry();
        this.workedTiles =
            (_25 = adopted.workedTiles) !== null && _25 !== void 0 ? _25 : new WorkedTileRegistry_1.WorkedTileRegistry(this.rules);
        this.yields = (_26 = adopted.yields) !== null && _26 !== void 0 ? _26 : new YieldRegistry_1.YieldRegistry();
    }
    /**
     * Re-attach everything a hydrated entity did not get from the save.
     *
     * `stateKeys()` omits every transient field, so an entity rebuilt with
     * `Object.assign(Object.create(Type.prototype), state)` arrives with those
     * fields *absent* — not null, not empty, `undefined`. Three of the four
     * categories below then misbehave, and one of them does so silently: a
     * `Yield` whose `_valueCache` is `undefined` fails the `=== null` guard that
     * would have recomputed it, so `value()` returns `undefined` and every yield
     * in a loaded game reads empty with no error at all. Measured, and written
     * up in `03-save-format.md`.
     *
     * Blunt tables rather than a clever field-name-to-slot mapping: there are
     * twenty-six fields in total, they are greppable this way, and the
     * assertion at the end is what actually keeps this honest as classes change.
     */
    /**
     * Inject a whole hydration's worth of entities.
     *
     * Three sweeps, not one, because an `onHydrated` hook may read any other
     * entity: `City`'s recomputes its fat cross, which asks the world for
     * surrounding tiles, which needs the world's own injected generator. Injected
     * one at a time, a city reached before its world threw inside the hook —
     * after a load that had otherwise succeeded.
     *
     * The assertion runs last for the same reason: a transient field a hook
     * fills is not missing until every hook has had its turn.
     */
    injectAll(entities) {
        const all = [...entities];
        all.forEach((entity) => this.fill(entity));
        all.forEach((entity) => this.hydrated(entity));
        all.forEach((entity) => this.assertInjected(entity));
    }
    inject(entity) {
        this.fill(entity);
        this.hydrated(entity);
        this.assertInjected(entity);
    }
    fill(entity) {
        // Typed structurally rather than relying on `DataObject`'s own declaration:
        // this package's `node_modules` can hold an older `core-data-object` than
        // the one the renderer resolves, and the compile should not depend on which.
        const saveable = entity;
        const target = entity;
        // 1. Collaborators the game holds. `_id` and `_keys` are transient but come
        //    from the save rather than from here — they are bookkeeping, and the
        //    hydrator sets them alongside the entity's id.
        const collaborators = {
            _additionalDataRegistry: this.additionalData,
            _advanceRegistry: this.advances,
            _availableCityBuildItemsRegistry: this.availableCityBuildItems,
            _availableGovernmentRegistry: this.availableGovernments,
            _cityBuildRegistry: this.cityBuilds,
            _cityNamesRegistry: this.cityNames,
            _cityRegistry: this.cities,
            _landMassRegistry: this.landMasses,
            _playerResearchRegistry: this.playerResearch,
            _playerTreasuryRegistry: this.playerTreasuries,
            // Two spellings of one thing, both present in the engine.
            _ruleRegistry: this.rules,
            _rulesRegistry: this.rules,
            _turn: this.turn,
            _unitRegistry: this.units,
            _workedTileRegistry: this.workedTiles,
            _year: this.year,
            // `IRng` is callable, so a `() => number` field takes the game's
            // generator directly and resumes the same stream.
            _randomNumberGenerator: this.rng,
        };
        // 2. Caches, which need their *initialiser* rather than a collaborator —
        //    the lazy guards are written against it, not against `undefined`.
        const caches = {
            _cache: () => new Map(),
            _cachedSearch: () => new Map(),
            _neighbours: () => [],
            _tileCache: () => null,
            _valueCache: () => null,
            _yieldCache: () => new Map(),
        };
        // 3. Derived from the game *and* the entity's own restored state, so
        //    neither table can express them.
        const derived = {
            // A civilisation's own attributes are a filtered view of the game's,
            // which is exactly what its constructor builds.
            _attributes: () => {
                const attributes = new AttributeRegistry_1.AttributeRegistry();
                attributes.register(...this.attributes.getByCivilization(saveable.sourceClass()));
                return attributes;
            },
            // `World` never exposes its generator and uses it for two things:
            // `generate()`, which a loaded world never calls, and `coordsToIndex`
            // in `get(x, y)`. Every geometry method is a pure function of height and
            // width, both of which are saved state, so a plain `Generator` built
            // from them is exact. The original's class and options matter only for
            // regenerating.
            _generator: () => {
                var _a, _b;
                return new Generator_1.default((_a = target._height) !== null && _a !== void 0 ? _a : 0, (_b = target._width) !== null && _b !== void 0 ? _b : 0);
            },
        };
        saveable.allTransient().forEach((field) => {
            if (field === '_id' || field === '_keys') {
                return;
            }
            if (field in collaborators) {
                target[field] = collaborators[field];
                return;
            }
            if (field in caches) {
                target[field] = caches[field]();
                return;
            }
            if (field in derived) {
                target[field] = derived[field]();
            }
        });
    }
    /**
     * For what a class has to put back itself.
     *
     * `PlayerTile` installs an accessor per registered `AdditionalData`,
     * non-enumerable, so `stateKeys()` never saw them; `City` recomputes its fat
     * cross; and `World` puts the registry back around its restored tiles,
     * because `encode` writes a registry held as a field as a plain array and
     * the class around a collection is the one thing the format cannot record.
     *
     * Those last two were found by playing a loaded game rather than by
     * comparing its bytes — a save can round-trip perfectly and still restore a
     * world whose `tiles()` returns an array iterator.
     */
    hydrated(entity) {
        const hook = entity.onHydrated;
        if (typeof hook === 'function') {
            hook.call(entity);
        }
    }
    /**
     * The part that matters more than the tables. A field added to a `transient`
     * declaration and not to this method leaves `undefined` behind, which is a
     * wrong answer rather than an error — see `Yield` above. This turns it into
     * a load failure naming the class and the field.
     */
    assertInjected(entity) {
        const saveable = entity;
        const target = entity;
        const missed = saveable
            .allTransient()
            .filter((field) => field !== '_id' && field !== '_keys')
            .filter((field) => target[field] === undefined);
        if (missed.length > 0) {
            throw new TypeError(`Game.inject left ${saveable.constructor.name}.${missed.join(', ')} ` +
                'undefined. A transient field has no source here, so a loaded game ' +
                'would read it as `undefined` rather than fail. Add it to the ' +
                'collaborator, cache or derived table in `Game.inject`.');
        }
    }
}
exports.Game = Game;
exports.default = Game;
//# sourceMappingURL=Game.js.map