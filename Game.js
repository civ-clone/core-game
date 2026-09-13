"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const AIClientRegistry_1 = require("@civ-clone/core-ai-client/AIClientRegistry");
const AdditionalDataRegistry_1 = require("@civ-clone/core-data-object/AdditionalDataRegistry");
const AdvanceRegistry_1 = require("@civ-clone/core-science/AdvanceRegistry");
const AttributeRegistry_1 = require("@civ-clone/core-civilization/AttributeRegistry");
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21;
        this.rng = (_a = adopted.rng) !== null && _a !== void 0 ? _a : (0, core_random_1.createRng)(Date.now());
        this.turn = (_b = adopted.turn) !== null && _b !== void 0 ? _b : new Turn_1.Turn();
        this.year = (_c = adopted.year) !== null && _c !== void 0 ? _c : new Year_1.Year();
        // `rules` and `rng` are assigned before the registries that take them.
        this.rules = (_d = adopted.rules) !== null && _d !== void 0 ? _d : new RuleRegistry_1.RuleRegistry();
        this.additionalData =
            (_e = adopted.additionalData) !== null && _e !== void 0 ? _e : new AdditionalDataRegistry_1.AdditionalDataRegistry();
        this.advances = (_f = adopted.advances) !== null && _f !== void 0 ? _f : new AdvanceRegistry_1.AdvanceRegistry();
        this.aiClients = (_g = adopted.aiClients) !== null && _g !== void 0 ? _g : new AIClientRegistry_1.AIClientRegistry();
        this.attributes = (_h = adopted.attributes) !== null && _h !== void 0 ? _h : new AttributeRegistry_1.AttributeRegistry();
        this.availableCityBuildItems =
            (_j = adopted.availableCityBuildItems) !== null && _j !== void 0 ? _j : new AvailableCityBuildItemsRegistry_1.AvailableCityBuildItemsRegistry();
        this.availableGovernments =
            (_k = adopted.availableGovernments) !== null && _k !== void 0 ? _k : new AvailableGovernmentRegistry_1.AvailableGovernmentRegistry();
        this.availableTerrainFeatures =
            (_l = adopted.availableTerrainFeatures) !== null && _l !== void 0 ? _l : new AvailableTerrainFeatureRegistry_1.AvailableTerrainFeatureRegistry();
        this.availableTradeRates =
            (_m = adopted.availableTradeRates) !== null && _m !== void 0 ? _m : new AvailableTradeRateRegistry_1.AvailableTradeRateRegistry();
        this.cities = (_o = adopted.cities) !== null && _o !== void 0 ? _o : new CityRegistry_1.CityRegistry();
        this.cityBuilds = (_p = adopted.cityBuilds) !== null && _p !== void 0 ? _p : new CityBuildRegistry_1.CityBuildRegistry();
        this.cityGrowth = (_q = adopted.cityGrowth) !== null && _q !== void 0 ? _q : new CityGrowthRegistry_1.CityGrowthRegistry();
        this.cityImprovements =
            (_r = adopted.cityImprovements) !== null && _r !== void 0 ? _r : new CityImprovementRegistry_1.CityImprovementRegistry();
        this.cityNames = (_s = adopted.cityNames) !== null && _s !== void 0 ? _s : new CityNameRegistry_1.CityNameRegistry(this.rng);
        this.civilizations = (_t = adopted.civilizations) !== null && _t !== void 0 ? _t : new CivilizationRegistry_1.CivilizationRegistry();
        this.clients = (_u = adopted.clients) !== null && _u !== void 0 ? _u : new ClientRegistry_1.ClientRegistry();
        this.currentPlayers = (_v = adopted.currentPlayers) !== null && _v !== void 0 ? _v : new CurrentPlayerRegistry_1.CurrentPlayerRegistry();
        this.generators = (_w = adopted.generators) !== null && _w !== void 0 ? _w : new GeneratorRegistry_1.GeneratorRegistry();
        this.goodyHuts = (_x = adopted.goodyHuts) !== null && _x !== void 0 ? _x : new GoodyHutRegistry_1.GoodyHutRegistry();
        this.interactions = (_y = adopted.interactions) !== null && _y !== void 0 ? _y : new InteractionRegistry_1.InteractionRegistry();
        this.landMasses = (_z = adopted.landMasses) !== null && _z !== void 0 ? _z : new LandMassRegistry_1.LandMassRegistry();
        this.layouts = (_0 = adopted.layouts) !== null && _0 !== void 0 ? _0 : new LayoutRegistry_1.LayoutRegistry();
        this.leaders = (_1 = adopted.leaders) !== null && _1 !== void 0 ? _1 : new LeaderRegistry_1.LeaderRegistry();
        this.pathFinders = (_2 = adopted.pathFinders) !== null && _2 !== void 0 ? _2 : new PathFinderRegistry_1.PathFinderRegistry();
        this.playerGovernments =
            (_3 = adopted.playerGovernments) !== null && _3 !== void 0 ? _3 : new PlayerGovernmentRegistry_1.PlayerGovernmentRegistry();
        this.playerResearch =
            (_4 = adopted.playerResearch) !== null && _4 !== void 0 ? _4 : new PlayerResearchRegistry_1.PlayerResearchRegistry();
        this.players = (_5 = adopted.players) !== null && _5 !== void 0 ? _5 : new PlayerRegistry_1.PlayerRegistry();
        this.playerTradeRates =
            (_6 = adopted.playerTradeRates) !== null && _6 !== void 0 ? _6 : new PlayerTradeRatesRegistry_1.PlayerTradeRatesRegistry();
        this.playerTreasuries =
            (_7 = adopted.playerTreasuries) !== null && _7 !== void 0 ? _7 : new PlayerTreasuryRegistry_1.PlayerTreasuryRegistry();
        this.playerWorlds = (_8 = adopted.playerWorlds) !== null && _8 !== void 0 ? _8 : new PlayerWorldRegistry_1.PlayerWorldRegistry();
        this.spaceships = (_9 = adopted.spaceships) !== null && _9 !== void 0 ? _9 : new SpaceshipRegistry_1.SpaceshipRegistry();
        this.strategies = (_10 = adopted.strategies) !== null && _10 !== void 0 ? _10 : new StrategyRegistry_1.StrategyRegistry(this.rng);
        this.strategyNotes = (_11 = adopted.strategyNotes) !== null && _11 !== void 0 ? _11 : new StrategyNoteRegistry_1.StrategyNoteRegistry();
        this.terrainFeatures =
            (_12 = adopted.terrainFeatures) !== null && _12 !== void 0 ? _12 : new TerrainFeatureRegistry_1.TerrainFeatureRegistry();
        this.terrains = (_13 = adopted.terrains) !== null && _13 !== void 0 ? _13 : new TerrainRegistry_1.TerrainRegistry();
        this.tileImprovements =
            (_14 = adopted.tileImprovements) !== null && _14 !== void 0 ? _14 : new TileImprovementRegistry_1.TileImprovementRegistry();
        this.traits = (_15 = adopted.traits) !== null && _15 !== void 0 ? _15 : new TraitRegistry_1.TraitRegistry();
        this.transports = (_16 = adopted.transports) !== null && _16 !== void 0 ? _16 : new TransportRegistry_1.TransportRegistry();
        this.unitImprovements =
            (_17 = adopted.unitImprovements) !== null && _17 !== void 0 ? _17 : new UnitImprovementRegistry_1.UnitImprovementRegistry();
        this.units = (_18 = adopted.units) !== null && _18 !== void 0 ? _18 : new UnitRegistry_1.UnitRegistry();
        this.wonders = (_19 = adopted.wonders) !== null && _19 !== void 0 ? _19 : new WonderRegistry_1.WonderRegistry();
        this.workedTiles =
            (_20 = adopted.workedTiles) !== null && _20 !== void 0 ? _20 : new WorkedTileRegistry_1.WorkedTileRegistry(this.rules);
        this.yields = (_21 = adopted.yields) !== null && _21 !== void 0 ? _21 : new YieldRegistry_1.YieldRegistry();
    }
}
exports.Game = Game;
exports.default = Game;
//# sourceMappingURL=Game.js.map