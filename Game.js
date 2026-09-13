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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23;
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
        this.availableTradeRates =
            (_p = adopted.availableTradeRates) !== null && _p !== void 0 ? _p : new AvailableTradeRateRegistry_1.AvailableTradeRateRegistry();
        this.cities = (_q = adopted.cities) !== null && _q !== void 0 ? _q : new CityRegistry_1.CityRegistry();
        this.cityBuilds = (_r = adopted.cityBuilds) !== null && _r !== void 0 ? _r : new CityBuildRegistry_1.CityBuildRegistry();
        this.cityGrowth = (_s = adopted.cityGrowth) !== null && _s !== void 0 ? _s : new CityGrowthRegistry_1.CityGrowthRegistry();
        this.cityImprovements =
            (_t = adopted.cityImprovements) !== null && _t !== void 0 ? _t : new CityImprovementRegistry_1.CityImprovementRegistry();
        this.cityNames = (_u = adopted.cityNames) !== null && _u !== void 0 ? _u : new CityNameRegistry_1.CityNameRegistry(this.rng);
        this.civilizations = (_v = adopted.civilizations) !== null && _v !== void 0 ? _v : new CivilizationRegistry_1.CivilizationRegistry();
        this.clients = (_w = adopted.clients) !== null && _w !== void 0 ? _w : new ClientRegistry_1.ClientRegistry();
        this.currentPlayers = (_x = adopted.currentPlayers) !== null && _x !== void 0 ? _x : new CurrentPlayerRegistry_1.CurrentPlayerRegistry();
        this.generators = (_y = adopted.generators) !== null && _y !== void 0 ? _y : new GeneratorRegistry_1.GeneratorRegistry();
        this.goodyHuts = (_z = adopted.goodyHuts) !== null && _z !== void 0 ? _z : new GoodyHutRegistry_1.GoodyHutRegistry();
        this.interactions = (_0 = adopted.interactions) !== null && _0 !== void 0 ? _0 : new InteractionRegistry_1.InteractionRegistry();
        this.landMasses = (_1 = adopted.landMasses) !== null && _1 !== void 0 ? _1 : new LandMassRegistry_1.LandMassRegistry();
        this.layouts = (_2 = adopted.layouts) !== null && _2 !== void 0 ? _2 : new LayoutRegistry_1.LayoutRegistry();
        this.leaders = (_3 = adopted.leaders) !== null && _3 !== void 0 ? _3 : new LeaderRegistry_1.LeaderRegistry();
        this.pathFinders = (_4 = adopted.pathFinders) !== null && _4 !== void 0 ? _4 : new PathFinderRegistry_1.PathFinderRegistry();
        this.playerGovernments =
            (_5 = adopted.playerGovernments) !== null && _5 !== void 0 ? _5 : new PlayerGovernmentRegistry_1.PlayerGovernmentRegistry();
        this.playerResearch =
            (_6 = adopted.playerResearch) !== null && _6 !== void 0 ? _6 : new PlayerResearchRegistry_1.PlayerResearchRegistry();
        this.players = (_7 = adopted.players) !== null && _7 !== void 0 ? _7 : new PlayerRegistry_1.PlayerRegistry();
        this.playerTradeRates =
            (_8 = adopted.playerTradeRates) !== null && _8 !== void 0 ? _8 : new PlayerTradeRatesRegistry_1.PlayerTradeRatesRegistry();
        this.playerTreasuries =
            (_9 = adopted.playerTreasuries) !== null && _9 !== void 0 ? _9 : new PlayerTreasuryRegistry_1.PlayerTreasuryRegistry();
        this.playerWorlds = (_10 = adopted.playerWorlds) !== null && _10 !== void 0 ? _10 : new PlayerWorldRegistry_1.PlayerWorldRegistry();
        this.spaceships = (_11 = adopted.spaceships) !== null && _11 !== void 0 ? _11 : new SpaceshipRegistry_1.SpaceshipRegistry();
        this.strategies = (_12 = adopted.strategies) !== null && _12 !== void 0 ? _12 : new StrategyRegistry_1.StrategyRegistry(this.rng);
        this.strategyNotes = (_13 = adopted.strategyNotes) !== null && _13 !== void 0 ? _13 : new StrategyNoteRegistry_1.StrategyNoteRegistry();
        this.terrainFeatures =
            (_14 = adopted.terrainFeatures) !== null && _14 !== void 0 ? _14 : new TerrainFeatureRegistry_1.TerrainFeatureRegistry();
        this.terrains = (_15 = adopted.terrains) !== null && _15 !== void 0 ? _15 : new TerrainRegistry_1.TerrainRegistry();
        this.tileImprovements =
            (_16 = adopted.tileImprovements) !== null && _16 !== void 0 ? _16 : new TileImprovementRegistry_1.TileImprovementRegistry();
        this.traits = (_17 = adopted.traits) !== null && _17 !== void 0 ? _17 : new TraitRegistry_1.TraitRegistry();
        this.transports = (_18 = adopted.transports) !== null && _18 !== void 0 ? _18 : new TransportRegistry_1.TransportRegistry();
        this.unitImprovements =
            (_19 = adopted.unitImprovements) !== null && _19 !== void 0 ? _19 : new UnitImprovementRegistry_1.UnitImprovementRegistry();
        this.units = (_20 = adopted.units) !== null && _20 !== void 0 ? _20 : new UnitRegistry_1.UnitRegistry();
        this.wonders = (_21 = adopted.wonders) !== null && _21 !== void 0 ? _21 : new WonderRegistry_1.WonderRegistry();
        this.workedTiles =
            (_22 = adopted.workedTiles) !== null && _22 !== void 0 ? _22 : new WorkedTileRegistry_1.WorkedTileRegistry(this.rules);
        this.yields = (_23 = adopted.yields) !== null && _23 !== void 0 ? _23 : new YieldRegistry_1.YieldRegistry();
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
    inject(entity) {
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
        // Exactly one class in the 328 packages builds per-instance structure in
        // its constructor — `PlayerTile`, which installs an accessor per registered
        // `AdditionalData`. Those accessors are non-enumerable, so `stateKeys()`
        // never saw them and hydration never restored them. One class, so an
        // optional hook rather than a convention.
        const hook = entity.onHydrated;
        if (typeof hook === 'function') {
            hook.call(entity);
        }
        // The part that matters more than the tables. A field added to a
        // `transient` declaration and not to this method leaves `undefined`
        // behind, which is a wrong answer rather than an error — see `Yield` above.
        // This turns it into a load failure naming the class and the field.
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