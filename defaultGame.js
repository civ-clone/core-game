"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultGame = exports.defaultSlots = void 0;
const Game_1 = require("./Game");
const Engine_1 = require("@civ-clone/core-engine/Engine");
const AdditionalDataRegistry_1 = require("@civ-clone/core-data-object/AdditionalDataRegistry");
const AdvanceRegistry_1 = require("@civ-clone/core-science/AdvanceRegistry");
const AIClientRegistry_1 = require("@civ-clone/core-ai-client/AIClientRegistry");
const AttributeRegistry_1 = require("@civ-clone/core-civilization/AttributeRegistry");
const AvailableCityBuildItemsRegistry_1 = require("@civ-clone/core-city-build/AvailableCityBuildItemsRegistry");
const AvailableGovernmentRegistry_1 = require("@civ-clone/core-government/AvailableGovernmentRegistry");
const AvailableTerrainFeatureRegistry_1 = require("@civ-clone/core-terrain-feature/AvailableTerrainFeatureRegistry");
const AvailableTradeRateRegistry_1 = require("@civ-clone/core-trade-rate/AvailableTradeRateRegistry");
const CityRegistry_1 = require("@civ-clone/core-city/CityRegistry");
const CityBuildRegistry_1 = require("@civ-clone/core-city-build/CityBuildRegistry");
const CityGrowthRegistry_1 = require("@civ-clone/core-city-growth/CityGrowthRegistry");
const CityImprovementRegistry_1 = require("@civ-clone/core-city-improvement/CityImprovementRegistry");
const CityNameRegistry_1 = require("@civ-clone/core-civilization/CityNameRegistry");
const CivilizationRegistry_1 = require("@civ-clone/core-civilization/CivilizationRegistry");
const ClientRegistry_1 = require("@civ-clone/core-client/ClientRegistry");
const CurrentPlayerRegistry_1 = require("@civ-clone/core-player/CurrentPlayerRegistry");
const GeneratorRegistry_1 = require("@civ-clone/core-world-generator/GeneratorRegistry");
const GoodyHutRegistry_1 = require("@civ-clone/core-goody-hut/GoodyHutRegistry");
const InteractionRegistry_1 = require("@civ-clone/core-diplomacy/InteractionRegistry");
const LandMassRegistry_1 = require("@civ-clone/core-world/LandMassRegistry");
const LayoutRegistry_1 = require("@civ-clone/core-spaceship/LayoutRegistry");
const LeaderRegistry_1 = require("@civ-clone/core-civilization/LeaderRegistry");
const PathFinderRegistry_1 = require("@civ-clone/core-world-path/PathFinderRegistry");
const PlayerGovernmentRegistry_1 = require("@civ-clone/core-government/PlayerGovernmentRegistry");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const PlayerTradeRatesRegistry_1 = require("@civ-clone/core-trade-rate/PlayerTradeRatesRegistry");
const PlayerTreasuryRegistry_1 = require("@civ-clone/core-treasury/PlayerTreasuryRegistry");
const PlayerWorldRegistry_1 = require("@civ-clone/core-player-world/PlayerWorldRegistry");
const PlayerRegistry_1 = require("@civ-clone/core-player/PlayerRegistry");
const core_random_1 = require("@civ-clone/core-random");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const SpaceshipRegistry_1 = require("@civ-clone/core-spaceship/SpaceshipRegistry");
const StrategyRegistry_1 = require("@civ-clone/core-strategy/StrategyRegistry");
const StrategyNoteRegistry_1 = require("@civ-clone/core-strategy/StrategyNoteRegistry");
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
/**
 * The game the module-level singletons belong to.
 *
 * It adopts them rather than constructing its own, so that during the
 * migration a package still importing `instance` and a package using
 * `game.cities` are looking at the same registry. Without that the two
 * halves of a half-migrated engine would quietly disagree, which is the sort
 * of thing that shows up as a rule not firing rather than as an error.
 *
 * Every other `new Game()` gets its own of everything.
 */
/**
 * The module-level singletons, as a slot map.
 *
 * Exported so that a ruleset's own game context can extend this one without
 * silently losing the adoption: `new Game({ ...defaultSlots, ...mine })` keeps
 * the core registries pointing at the same objects every unmigrated package
 * still imports directly.
 */
exports.defaultSlots = {
    additionalData: AdditionalDataRegistry_1.instance,
    advances: AdvanceRegistry_1.instance,
    aiClients: AIClientRegistry_1.instance,
    attributes: AttributeRegistry_1.instance,
    availableCityBuildItems: AvailableCityBuildItemsRegistry_1.instance,
    availableGovernments: AvailableGovernmentRegistry_1.instance,
    availableTerrainFeatures: AvailableTerrainFeatureRegistry_1.instance,
    availableTradeRates: AvailableTradeRateRegistry_1.instance,
    cities: CityRegistry_1.instance,
    cityBuilds: CityBuildRegistry_1.instance,
    cityGrowth: CityGrowthRegistry_1.instance,
    cityImprovements: CityImprovementRegistry_1.instance,
    cityNames: CityNameRegistry_1.instance,
    civilizations: CivilizationRegistry_1.instance,
    clients: ClientRegistry_1.instance,
    currentPlayers: CurrentPlayerRegistry_1.instance,
    generators: GeneratorRegistry_1.instance,
    goodyHuts: GoodyHutRegistry_1.instance,
    interactions: InteractionRegistry_1.instance,
    landMasses: LandMassRegistry_1.instance,
    layouts: LayoutRegistry_1.instance,
    leaders: LeaderRegistry_1.instance,
    pathFinders: PathFinderRegistry_1.instance,
    playerGovernments: PlayerGovernmentRegistry_1.instance,
    playerResearch: PlayerResearchRegistry_1.instance,
    players: PlayerRegistry_1.instance,
    playerTradeRates: PlayerTradeRatesRegistry_1.instance,
    playerTreasuries: PlayerTreasuryRegistry_1.instance,
    playerWorlds: PlayerWorldRegistry_1.instance,
    rules: RuleRegistry_1.instance,
    spaceships: SpaceshipRegistry_1.instance,
    strategies: StrategyRegistry_1.instance,
    strategyNotes: StrategyNoteRegistry_1.instance,
    terrainFeatures: TerrainFeatureRegistry_1.instance,
    terrains: TerrainRegistry_1.instance,
    tileImprovements: TileImprovementRegistry_1.instance,
    traits: TraitRegistry_1.instance,
    transports: TransportRegistry_1.instance,
    unitImprovements: UnitImprovementRegistry_1.instance,
    units: UnitRegistry_1.instance,
    wonders: WonderRegistry_1.instance,
    workedTiles: WorkedTileRegistry_1.instance,
    yields: YieldRegistry_1.instance,
    engine: Engine_1.instance,
    rng: core_random_1.instance,
    turn: Turn_1.instance,
    year: Year_1.instance,
};
exports.defaultGame = new Game_1.Game(exports.defaultSlots);
exports.default = exports.defaultGame;
//# sourceMappingURL=defaultGame.js.map