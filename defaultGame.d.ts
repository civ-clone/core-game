import { Game } from './Game';
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
export declare const defaultGame: Game;
export default defaultGame;
