import React, { ComponentPropsWithoutRef } from "react";
import { ITalentSet } from "@/lib/trees/types";
import { LinkStyle, TalentTree } from "../TalentTree";
import { StyledArticle } from "./styled";
import { SelectedTalents } from "../TalentTree/hooks/useTalentTree";
import { PointCount } from "../TalentTree/types";

interface TreeReturn {
  selectedTalents: SelectedTalents;
  points: PointCount;
}

export interface TalentSetProps extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  classTalents: ITalentSet;
  onChange: (result: { GENERAL?: TreeReturn; TREE?: TreeReturn }) => void;
  linkStyle?: LinkStyle;
}

export function TalentSet({
  classTalents,
  className,
  onChange,
  linkStyle,
  ...rest
}: TalentSetProps) {
  return (
    <div className={className} {...rest}>
      <StyledArticle className="general-tree">
        <TalentTree
          talentNodes={classTalents.GENERAL}
          onChange={(t, p) => onChange({ GENERAL: { selectedTalents: t, points: p } })}
          linkStyle={linkStyle}
        />
      </StyledArticle>
      <StyledArticle className="spec-tree">
        <TalentTree
          talentNodes={classTalents.TREE}
          onChange={(t, p) => onChange({ TREE: { selectedTalents: t, points: p } })}
          linkStyle={linkStyle}
        />
      </StyledArticle>
    </div>
  );
}
