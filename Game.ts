import { AIClientRegistry } from '@civ-clone/core-ai-client/AIClientRegistry';
import { AdditionalDataRegistry } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import { AdvanceRegistry } from '@civ-clone/core-science/AdvanceRegistry';
import { AttributeRegistry } from '@civ-clone/core-civilization/AttributeRegistry';
import { AvailableCityBuildItemsRegistry } from '@civ-clone/core-city-build/AvailableCityBuildItemsRegistry';
import { AvailableGovernmentRegistry } from '@civ-clone/core-government/AvailableGovernmentRegistry';
import { AvailableTerrainFeatureRegistry } from '@civ-clone/core-terrain-feature/AvailableTerrainFeatureRegistry';
import { AvailableTradeRateRegistry } from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';
import { CityBuildRegistry } from '@civ-clone/core-city-build/CityBuildRegistry';
import { CityGrowthRegistry } from '@civ-clone/core-city-growth/CityGrowthRegistry';
import { CityImprovementRegistry } from '@civ-clone/core-city-improvement/CityImprovementRegistry';
import { CityNameRegistry } from '@civ-clone/core-civilization/CityNameRegistry';
import { CityRegistry } from '@civ-clone/core-city/CityRegistry';
import { CivilizationRegistry } from '@civ-clone/core-civilization/CivilizationRegistry';
import { ClientRegistry } from '@civ-clone/core-client/ClientRegistry';
import { CurrentPlayerRegistry } from '@civ-clone/core-player/CurrentPlayerRegistry';
import { GeneratorRegistry } from '@civ-clone/core-world-generator/GeneratorRegistry';
import { GoodyHutRegistry } from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import { Engine } from '@civ-clone/core-engine/Engine';
import { IRng, createRng } from '@civ-clone/core-random';
import { InteractionRegistry } from '@civ-clone/core-diplomacy/InteractionRegistry';
import { LandMassRegistry } from '@civ-clone/core-world/LandMassRegistry';
import { LayoutRegistry } from '@civ-clone/core-spaceship/LayoutRegistry';
import { LeaderRegistry } from '@civ-clone/core-civilization/LeaderRegistry';
import { PathFinderRegistry } from '@civ-clone/core-world-path/PathFinderRegistry';
import { PlayerGovernmentRegistry } from '@civ-clone/core-government/PlayerGovernmentRegistry';
import { PlayerRegistry } from '@civ-clone/core-player/PlayerRegistry';
import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import { PlayerTradeRatesRegistry } from '@civ-clone/core-trade-rate/PlayerTradeRatesRegistry';
import { PlayerTreasuryRegistry } from '@civ-clone/core-treasury/PlayerTreasuryRegistry';
import { PlayerWorldRegistry } from '@civ-clone/core-player-world/PlayerWorldRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { SpaceshipRegistry } from '@civ-clone/core-spaceship/SpaceshipRegistry';
import { StrategyNoteRegistry } from '@civ-clone/core-strategy/StrategyNoteRegistry';
import { StrategyRegistry } from '@civ-clone/core-strategy/StrategyRegistry';
import { TerrainFeatureRegistry } from '@civ-clone/core-terrain-feature/TerrainFeatureRegistry';
import { TerrainRegistry } from '@civ-clone/core-terrain/TerrainRegistry';
import { TileImprovementRegistry } from '@civ-clone/core-tile-improvement/TileImprovementRegistry';
import { TraitRegistry } from '@civ-clone/core-civilization/TraitRegistry';
import { TransportRegistry } from '@civ-clone/core-unit-transport/TransportRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
import { UnitImprovementRegistry } from '@civ-clone/core-unit-improvement/UnitImprovementRegistry';
import { UnitRegistry } from '@civ-clone/core-unit/UnitRegistry';
import { WonderRegistry } from '@civ-clone/core-wonder/WonderRegistry';
import { WorkedTileRegistry } from '@civ-clone/core-city/WorkedTileRegistry';
import { Year } from '@civ-clone/core-game-year/Year';
import { YieldRegistry } from '@civ-clone/core-yield/YieldRegistry';

/**
 * Everything one game owns. Every slot is a registry or a piece of per-game
 * state that until now existed as a module-level singleton.
 *
 * Singletons are why two games cannot run in one process: they would share
 * every registry and interleave their state. They are also why tests need a
 * `beforeEach` reset, and why loading a save means mutating the running game
 * rather than building a new one beside it.
 *
 * The injection this depends on already existed — every class and every rule
 * factory in the engine already takes its registries as constructor parameters
 * with singleton defaults. What was missing was something to pass.
 */
export type GameSlots = {
  additionalData: AdditionalDataRegistry;
  advances: AdvanceRegistry;
  aiClients: AIClientRegistry;
  attributes: AttributeRegistry;
  availableCityBuildItems: AvailableCityBuildItemsRegistry;
  availableGovernments: AvailableGovernmentRegistry;
  availableTerrainFeatures: AvailableTerrainFeatureRegistry;
  availableTradeRates: AvailableTradeRateRegistry;
  cities: CityRegistry;
  cityBuilds: CityBuildRegistry;
  cityGrowth: CityGrowthRegistry;
  cityImprovements: CityImprovementRegistry;
  cityNames: CityNameRegistry;
  civilizations: CivilizationRegistry;
  clients: ClientRegistry;
  currentPlayers: CurrentPlayerRegistry;
  generators: GeneratorRegistry;
  goodyHuts: GoodyHutRegistry;
  interactions: InteractionRegistry;
  landMasses: LandMassRegistry;
  layouts: LayoutRegistry;
  leaders: LeaderRegistry;
  pathFinders: PathFinderRegistry;
  playerGovernments: PlayerGovernmentRegistry;
  playerResearch: PlayerResearchRegistry;
  players: PlayerRegistry;
  playerTradeRates: PlayerTradeRatesRegistry;
  playerTreasuries: PlayerTreasuryRegistry;
  playerWorlds: PlayerWorldRegistry;
  rules: RuleRegistry;
  spaceships: SpaceshipRegistry;
  strategies: StrategyRegistry;
  strategyNotes: StrategyNoteRegistry;
  terrainFeatures: TerrainFeatureRegistry;
  terrains: TerrainRegistry;
  tileImprovements: TileImprovementRegistry;
  traits: TraitRegistry;
  transports: TransportRegistry;
  unitImprovements: UnitImprovementRegistry;
  units: UnitRegistry;
  wonders: WonderRegistry;
  workedTiles: WorkedTileRegistry;
  yields: YieldRegistry;
  engine: Engine;
  rng: IRng;
  turn: Turn;
  year: Year;
};

export class Game {
  readonly additionalData: AdditionalDataRegistry;
  readonly advances: AdvanceRegistry;
  readonly aiClients: AIClientRegistry;
  readonly attributes: AttributeRegistry;
  readonly availableCityBuildItems: AvailableCityBuildItemsRegistry;
  readonly availableGovernments: AvailableGovernmentRegistry;
  readonly availableTerrainFeatures: AvailableTerrainFeatureRegistry;
  readonly availableTradeRates: AvailableTradeRateRegistry;
  readonly cities: CityRegistry;
  readonly cityBuilds: CityBuildRegistry;
  readonly cityGrowth: CityGrowthRegistry;
  readonly cityImprovements: CityImprovementRegistry;
  readonly cityNames: CityNameRegistry;
  readonly civilizations: CivilizationRegistry;
  readonly clients: ClientRegistry;
  readonly currentPlayers: CurrentPlayerRegistry;
  readonly generators: GeneratorRegistry;
  readonly goodyHuts: GoodyHutRegistry;
  readonly interactions: InteractionRegistry;
  readonly landMasses: LandMassRegistry;
  readonly layouts: LayoutRegistry;
  readonly leaders: LeaderRegistry;
  readonly pathFinders: PathFinderRegistry;
  readonly playerGovernments: PlayerGovernmentRegistry;
  readonly playerResearch: PlayerResearchRegistry;
  readonly players: PlayerRegistry;
  readonly playerTradeRates: PlayerTradeRatesRegistry;
  readonly playerTreasuries: PlayerTreasuryRegistry;
  readonly playerWorlds: PlayerWorldRegistry;
  readonly rules: RuleRegistry;
  readonly spaceships: SpaceshipRegistry;
  readonly strategies: StrategyRegistry;
  readonly strategyNotes: StrategyNoteRegistry;
  readonly terrainFeatures: TerrainFeatureRegistry;
  readonly terrains: TerrainRegistry;
  readonly tileImprovements: TileImprovementRegistry;
  readonly traits: TraitRegistry;
  readonly transports: TransportRegistry;
  readonly unitImprovements: UnitImprovementRegistry;
  readonly units: UnitRegistry;
  readonly wonders: WonderRegistry;
  readonly workedTiles: WorkedTileRegistry;
  readonly yields: YieldRegistry;
  readonly engine: Engine;
  readonly rng: IRng;
  readonly turn: Turn;
  readonly year: Year;

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
  constructor(adopted: Partial<GameSlots> = {}) {
    // `Engine` is per-game too: it carries the event stream a game runs on, so
    // two games sharing one would each see the other's turns start.
    this.engine = adopted.engine ?? new Engine();
    this.rng = adopted.rng ?? createRng(Date.now());
    this.turn = adopted.turn ?? new Turn();
    this.year = adopted.year ?? new Year();

    // `rules` and `rng` are assigned before the registries that take them.
    this.rules = adopted.rules ?? new RuleRegistry();

    this.additionalData =
      adopted.additionalData ?? new AdditionalDataRegistry();
    this.advances = adopted.advances ?? new AdvanceRegistry();
    this.aiClients = adopted.aiClients ?? new AIClientRegistry();
    this.attributes = adopted.attributes ?? new AttributeRegistry();
    this.availableCityBuildItems =
      adopted.availableCityBuildItems ?? new AvailableCityBuildItemsRegistry();
    this.availableGovernments =
      adopted.availableGovernments ?? new AvailableGovernmentRegistry();
    this.availableTerrainFeatures =
      adopted.availableTerrainFeatures ?? new AvailableTerrainFeatureRegistry();
    this.availableTradeRates =
      adopted.availableTradeRates ?? new AvailableTradeRateRegistry();
    this.cities = adopted.cities ?? new CityRegistry();
    this.cityBuilds = adopted.cityBuilds ?? new CityBuildRegistry();
    this.cityGrowth = adopted.cityGrowth ?? new CityGrowthRegistry();
    this.cityImprovements =
      adopted.cityImprovements ?? new CityImprovementRegistry();
    this.cityNames = adopted.cityNames ?? new CityNameRegistry(this.rng);
    this.civilizations = adopted.civilizations ?? new CivilizationRegistry();
    this.clients = adopted.clients ?? new ClientRegistry();
    this.currentPlayers = adopted.currentPlayers ?? new CurrentPlayerRegistry();
    this.generators = adopted.generators ?? new GeneratorRegistry();
    this.goodyHuts = adopted.goodyHuts ?? new GoodyHutRegistry();
    this.interactions = adopted.interactions ?? new InteractionRegistry();
    this.landMasses = adopted.landMasses ?? new LandMassRegistry();
    this.layouts = adopted.layouts ?? new LayoutRegistry();
    this.leaders = adopted.leaders ?? new LeaderRegistry();
    this.pathFinders = adopted.pathFinders ?? new PathFinderRegistry();
    this.playerGovernments =
      adopted.playerGovernments ?? new PlayerGovernmentRegistry();
    this.playerResearch =
      adopted.playerResearch ?? new PlayerResearchRegistry();
    this.players = adopted.players ?? new PlayerRegistry();
    this.playerTradeRates =
      adopted.playerTradeRates ?? new PlayerTradeRatesRegistry();
    this.playerTreasuries =
      adopted.playerTreasuries ?? new PlayerTreasuryRegistry();
    this.playerWorlds = adopted.playerWorlds ?? new PlayerWorldRegistry();
    this.spaceships = adopted.spaceships ?? new SpaceshipRegistry();
    this.strategies = adopted.strategies ?? new StrategyRegistry(this.rng);
    this.strategyNotes = adopted.strategyNotes ?? new StrategyNoteRegistry();
    this.terrainFeatures =
      adopted.terrainFeatures ?? new TerrainFeatureRegistry();
    this.terrains = adopted.terrains ?? new TerrainRegistry();
    this.tileImprovements =
      adopted.tileImprovements ?? new TileImprovementRegistry();
    this.traits = adopted.traits ?? new TraitRegistry();
    this.transports = adopted.transports ?? new TransportRegistry();
    this.unitImprovements =
      adopted.unitImprovements ?? new UnitImprovementRegistry();
    this.units = adopted.units ?? new UnitRegistry();
    this.wonders = adopted.wonders ?? new WonderRegistry();
    this.workedTiles =
      adopted.workedTiles ?? new WorkedTileRegistry(this.rules);
    this.yields = adopted.yields ?? new YieldRegistry();
  }
}

export default Game;
