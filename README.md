# `@civ-clone/core-game`

Everything one game owns: 43 registries plus its turn, year and random number
generator.

```ts
import { Game } from '@civ-clone/core-game';

const game = new Game();

game.players.register(new Player(game.rules));
```

Two `Game`s in one process share nothing, which is what makes a host able to
run two matches, a test able to skip its `beforeEach` reset, and a save able to
load into a fresh context beside the running one.

## `defaultGame`

The engine's registries have always been module-level singletons. `defaultGame`
**adopts** them rather than constructing its own:

```ts
import { defaultGame } from '@civ-clone/core-game';
import { instance as cityRegistryInstance } from '@civ-clone/core-city/CityRegistry';

defaultGame.cities === cityRegistryInstance; // true
```

That is what lets packages migrate one at a time. A package still importing
`instance` and one using `game.cities` see the same registry, so a
half-migrated engine does not quietly disagree with itself — which would show
up as a rule not firing rather than as an error.

Every other `new Game()` gets its own of everything.

## Why this is not in `core-engine`

`Game` imports every registry, and the seventeen packages with a
`registerRules.ts` will import `Game`. Putting it in a package those registries
already depend on would make a cycle. Nothing `Game` imports imports `Game`:
the registry owners are all `core-*`, the registrars are all plugins.

Plugin registries stay out for the same reason and one more — `core-game`
should not depend on a particular ruleset.
