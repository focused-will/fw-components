import React, { ComponentPropsWithoutRef, useCallback } from "react";
import { ITalentSet } from "@/lib/trees/types";
import { LinkStyle, TalentTree } from "../TalentTree";
import { StyledArticle } from "./styled";
import { SelectedTalents } from "../TalentTree/hooks/useTalentTree";
import { PointCount } from "../TalentTree/types";
import { SubmitInput } from "../SubmitInput";
import { deserialize, TalentNodeWithMetadata } from "@/lib/serialization/wowhead";

export interface TreeReturn {
  selectedTalents: SelectedTalents;
  points: PointCount;
}

export interface TalentSetReturn {
  // The general tree changes for the class
  GENERAL?: TreeReturn;
  // The spec trees changes for the class
  TREE?: TreeReturn;
}

export interface TalentSetProps extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  classTalents: ITalentSet;
  onChange: (result: { GENERAL?: TreeReturn; TREE?: TreeReturn }) => void;
  linkStyle?: LinkStyle;
}

function _TalentSet({ classTalents, className, onChange, linkStyle, ...rest }: TalentSetProps) {
  const [generalTalents, setGeneral] = React.useState<TalentNodeWithMetadata[]>();
  const [treeTalents, setTree] = React.useState<TalentNodeWithMetadata[]>();

  const handleWowheadImport = useCallback(
    (str: string) => {
      const initialTalents = deserialize(str, classTalents.GENERAL, classTalents.TREE);

      if (initialTalents) {
        setGeneral(initialTalents.GENERAL);
        setTree(initialTalents.TREE);
      }
    },
    [classTalents, setGeneral, setTree]
  );

  return (
    <div className={className} {...rest}>
      <SubmitInput
        className="talent-set-form"
        label="Import from WoWHead"
        submitText="Import"
        onSubmit={handleWowheadImport}
      />

      <StyledArticle className="general-tree">
        <TalentTree
          initialSelectedTalents={generalTalents}
          talentNodes={classTalents.GENERAL}
          onChange={(t, p) => onChange({ GENERAL: { selectedTalents: t, points: p } })}
          linkStyle={linkStyle}
        />
      </StyledArticle>
      <StyledArticle className="spec-tree">
        <TalentTree
          initialSelectedTalents={treeTalents}
          talentNodes={classTalents.TREE}
          onChange={(t, p) => onChange({ TREE: { selectedTalents: t, points: p } })}
          linkStyle={linkStyle}
        />
      </StyledArticle>
    </div>
  );
}

export const TalentSet = React.memo(_TalentSet);
TalentSet.displayName = "TalentSet";
