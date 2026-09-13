import { Game, GameSlots } from './Game';
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
export declare const defaultSlots: GameSlots;
export declare const defaultGame: Game;
export default defaultGame;
