# @focused-will/components

This repository contains shareable components for writing WoW related applications.

## Components

### TalentTree

`TalentTree` is a component that will accept a specific talent set and render it as a talent tree,
currently it uses css-grid to render them in the expected layout that the game does.

```tsx
import { TalentTree, SUPPORTED_SPECS } from "@focused-will/components";

/**
 * Render a TalentTree that displays the Discipline Priest talents
 */
<TalentTree
  talentNodes={SUPPORTED_SPECS.PRIEST.DISCIPLINE.TREE}
  onChange={(talents) => console.log(talents)}
/>;
```

Each specialization has a `GENERAL` and `TREE` member that correspond to their general and
spec-specific trees. **General trees for each spec are not interchangeable.**
