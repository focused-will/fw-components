# @focused-will/components

This repository contains shareable components for writing WoW related applications.

## Components

### TalentTree

`TalentTree` is a component that will accept a specific talent set and render it as a talent tree,
currently it uses css-grid to render them in the expected layout that the game does.

```tsx
import { TalentTree, SUPPORTED_SPECS } from "@focused-will/components";

/**
 * Render a TalentTree that displays the Discipline Priest spec talents
 */
<TalentTree
  talentNodes={SUPPORTED_SPECS.PRIEST.DISCIPLINE.TREE}
  onChange={(talents, points) => console.log(talents, points)}
/>;
```

### TalentSet

`TalentSet` is a component that will accept a specific class and specs talent set and render it as a
coupled set of talents. Use this if you are seeking to make use of WoWHead import functionality.

```tsx
import { TalentTree, SUPPORTED_SPECS } from "@focused-will/components";

/**
 * Render a TalentSet that displays the Discipline Priest general and spec talents
 */
<TalentSpec
  classTalents={SUPPORTED_SPECS.PRIEST.DISCIPLINE}
  onChange={({ GENERAL, TREE }) => {
    if (GENERAL) {
      // handle general tree changes here
    }

    if (TREE) {
      // handle spec tree changes here
    }
  }}
/>;
```

Each specialization has a `GENERAL` and `TREE` member that correspond to their general and
spec-specific trees. **General trees for each spec are not interchangeable.**
