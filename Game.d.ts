import { AIClientRegistry } from '@civ-clone/core-ai-client/AIClientRegistry';
import { AdditionalDataRegistry } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import { ClassRegistry } from '@civ-clone/core-data-object/ClassRegistry';
import { DataObject } from '@civ-clone/core-data-object/DataObject';
import { AdvanceRegistry } from '@civ-clone/core-science/AdvanceRegistry';
import { AttributeRegistry } from '@civ-clone/core-civilization/AttributeRegistry';
import { AvailableCityBuildItemsRegistry } from '@civ-clone/core-city-build/AvailableCityBuildItemsRegistry';
import { AvailableGovernmentRegistry } from '@civ-clone/core-government/AvailableGovernmentRegistry';
import { AvailableTerrainFeatureRegistry } from '@civ-clone/core-terrain-feature/AvailableTerrainFeatureRegistry';
import { AvailableTileImprovementRegistry } from '@civ-clone/core-tile-improvement/AvailableTileImprovementRegistry';
import { AvailableUnitImprovementRegistry } from '@civ-clone/core-unit-improvement/AvailableUnitImprovementRegistry';
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
import { IRng } from '@civ-clone/core-random';
import { InteractionRegistry } from '@civ-clone/core-diplomacy/InteractionRegistry';
import { LandMassRegistry } from '@civ-clone/core-world/LandMassRegistry';
import { LayoutRegistry } from '@civ-clone/core-spaceship/LayoutRegistry';
import { LeaderRegistry } from '@civ-clone/core-civilization/LeaderRegistry';
import { PathFinderRegistry } from '@civ-clone/core-world-path/PathFinderRegistry';
import { PendingEffectRegistry } from '@civ-clone/core-pending-effect';
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
    classes: ClassRegistry;
    aiClients: AIClientRegistry;
    attributes: AttributeRegistry;
    availableCityBuildItems: AvailableCityBuildItemsRegistry;
    availableGovernments: AvailableGovernmentRegistry;
    availableTerrainFeatures: AvailableTerrainFeatureRegistry;
    availableTileImprovements: AvailableTileImprovementRegistry;
    availableTradeRates: AvailableTradeRateRegistry;
    availableUnitImprovements: AvailableUnitImprovementRegistry;
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
    pendingEffects: PendingEffectRegistry;
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
export declare class Game {
    readonly additionalData: AdditionalDataRegistry;
    readonly advances: AdvanceRegistry;
    readonly classes: ClassRegistry;
    readonly aiClients: AIClientRegistry;
    readonly attributes: AttributeRegistry;
    readonly availableCityBuildItems: AvailableCityBuildItemsRegistry;
    readonly availableGovernments: AvailableGovernmentRegistry;
    readonly availableTerrainFeatures: AvailableTerrainFeatureRegistry;
    readonly availableTileImprovements: AvailableTileImprovementRegistry;
    readonly availableTradeRates: AvailableTradeRateRegistry;
    readonly availableUnitImprovements: AvailableUnitImprovementRegistry;
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
    readonly pendingEffects: PendingEffectRegistry;
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
    constructor(adopted?: Partial<GameSlots>);
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
    injectAll(entities: Iterable<DataObject>): void;
    inject(entity: DataObject): void;
    private fill;
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
    private hydrated;
    /**
     * The part that matters more than the tables. A field added to a `transient`
     * declaration and not to this method leaves `undefined` behind, which is a
     * wrong answer rather than an error — see `Yield` above. This turns it into
     * a load failure naming the class and the field.
     */
    private assertInjected;
}
export default Game;
