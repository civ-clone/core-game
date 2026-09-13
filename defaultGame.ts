import { Game } from './Game';
import { instance as additionalDataInstance } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import { instance as advancesInstance } from '@civ-clone/core-science/AdvanceRegistry';
import { instance as aiClientsInstance } from '@civ-clone/core-ai-client/AIClientRegistry';
import { instance as attributesInstance } from '@civ-clone/core-civilization/AttributeRegistry';
import { instance as availableCityBuildItemsInstance } from '@civ-clone/core-city-build/AvailableCityBuildItemsRegistry';
import { instance as availableGovernmentsInstance } from '@civ-clone/core-government/AvailableGovernmentRegistry';
import { instance as availableTerrainFeaturesInstance } from '@civ-clone/core-terrain-feature/AvailableTerrainFeatureRegistry';
import { instance as availableTradeRatesInstance } from '@civ-clone/core-trade-rate/AvailableTradeRateRegistry';
import { instance as citiesInstance } from '@civ-clone/core-city/CityRegistry';
import { instance as cityBuildsInstance } from '@civ-clone/core-city-build/CityBuildRegistry';
import { instance as cityGrowthInstance } from '@civ-clone/core-city-growth/CityGrowthRegistry';
import { instance as cityImprovementsInstance } from '@civ-clone/core-city-improvement/CityImprovementRegistry';
import { instance as cityNamesInstance } from '@civ-clone/core-civilization/CityNameRegistry';
import { instance as civilizationsInstance } from '@civ-clone/core-civilization/CivilizationRegistry';
import { instance as clientsInstance } from '@civ-clone/core-client/ClientRegistry';
import { instance as currentPlayersInstance } from '@civ-clone/core-player/CurrentPlayerRegistry';
import { instance as generatorsInstance } from '@civ-clone/core-world-generator/GeneratorRegistry';
import { instance as goodyHutsInstance } from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import { instance as interactionsInstance } from '@civ-clone/core-diplomacy/InteractionRegistry';
import { instance as landMassesInstance } from '@civ-clone/core-world/LandMassRegistry';
import { instance as layoutsInstance } from '@civ-clone/core-spaceship/LayoutRegistry';
import { instance as leadersInstance } from '@civ-clone/core-civilization/LeaderRegistry';
import { instance as pathFindersInstance } from '@civ-clone/core-world-path/PathFinderRegistry';
import { instance as playerGovernmentsInstance } from '@civ-clone/core-government/PlayerGovernmentRegistry';
import { instance as playerResearchInstance } from '@civ-clone/core-science/PlayerResearchRegistry';
import { instance as playerTradeRatesInstance } from '@civ-clone/core-trade-rate/PlayerTradeRatesRegistry';
import { instance as playerTreasuriesInstance } from '@civ-clone/core-treasury/PlayerTreasuryRegistry';
import { instance as playerWorldsInstance } from '@civ-clone/core-player-world/PlayerWorldRegistry';
import { instance as playersInstance } from '@civ-clone/core-player/PlayerRegistry';
import { instance as rngInstance } from '@civ-clone/core-random';
import { instance as rulesInstance } from '@civ-clone/core-rule/RuleRegistry';
import { instance as spaceshipsInstance } from '@civ-clone/core-spaceship/SpaceshipRegistry';
import { instance as strategiesInstance } from '@civ-clone/core-strategy/StrategyRegistry';
import { instance as strategyNotesInstance } from '@civ-clone/core-strategy/StrategyNoteRegistry';
import { instance as terrainFeaturesInstance } from '@civ-clone/core-terrain-feature/TerrainFeatureRegistry';
import { instance as terrainsInstance } from '@civ-clone/core-terrain/TerrainRegistry';
import { instance as tileImprovementsInstance } from '@civ-clone/core-tile-improvement/TileImprovementRegistry';
import { instance as traitsInstance } from '@civ-clone/core-civilization/TraitRegistry';
import { instance as transportsInstance } from '@civ-clone/core-unit-transport/TransportRegistry';
import { instance as turnInstance } from '@civ-clone/core-turn-based-game/Turn';
import { instance as unitImprovementsInstance } from '@civ-clone/core-unit-improvement/UnitImprovementRegistry';
import { instance as unitsInstance } from '@civ-clone/core-unit/UnitRegistry';
import { instance as wondersInstance } from '@civ-clone/core-wonder/WonderRegistry';
import { instance as workedTilesInstance } from '@civ-clone/core-city/WorkedTileRegistry';
import { instance as yearInstance } from '@civ-clone/core-game-year/Year';
import { instance as yieldsInstance } from '@civ-clone/core-yield/YieldRegistry';

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
export const defaultGame: Game = new Game({
  additionalData: additionalDataInstance,
  advances: advancesInstance,
  aiClients: aiClientsInstance,
  attributes: attributesInstance,
  availableCityBuildItems: availableCityBuildItemsInstance,
  availableGovernments: availableGovernmentsInstance,
  availableTerrainFeatures: availableTerrainFeaturesInstance,
  availableTradeRates: availableTradeRatesInstance,
  cities: citiesInstance,
  cityBuilds: cityBuildsInstance,
  cityGrowth: cityGrowthInstance,
  cityImprovements: cityImprovementsInstance,
  cityNames: cityNamesInstance,
  civilizations: civilizationsInstance,
  clients: clientsInstance,
  currentPlayers: currentPlayersInstance,
  generators: generatorsInstance,
  goodyHuts: goodyHutsInstance,
  interactions: interactionsInstance,
  landMasses: landMassesInstance,
  layouts: layoutsInstance,
  leaders: leadersInstance,
  pathFinders: pathFindersInstance,
  playerGovernments: playerGovernmentsInstance,
  playerResearch: playerResearchInstance,
  players: playersInstance,
  playerTradeRates: playerTradeRatesInstance,
  playerTreasuries: playerTreasuriesInstance,
  playerWorlds: playerWorldsInstance,
  rules: rulesInstance,
  spaceships: spaceshipsInstance,
  strategies: strategiesInstance,
  strategyNotes: strategyNotesInstance,
  terrainFeatures: terrainFeaturesInstance,
  terrains: terrainsInstance,
  tileImprovements: tileImprovementsInstance,
  traits: traitsInstance,
  transports: transportsInstance,
  unitImprovements: unitImprovementsInstance,
  units: unitsInstance,
  wonders: wondersInstance,
  workedTiles: workedTilesInstance,
  yields: yieldsInstance,
  rng: rngInstance,
  turn: turnInstance,
  year: yearInstance,
});

export default defaultGame;
