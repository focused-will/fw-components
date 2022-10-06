import React, { CSSProperties } from "react";
import Xarrow from "react-xarrows";
import * as Tooltip from "@radix-ui/react-tooltip";

import { Main } from "./style";
import { SelectedTalents, useTalentTree } from "./hooks/useTalentTree";
import { TalentNode } from "./Talent/index";
import { useUniqueId } from "./hooks/useUniqueId";
import { ParsedSpecTalents } from "@/lib/trees/types";
import { PointCount } from "./types";
import { TalentNodeWithMetadata } from "@/lib/serialization/wowhead";

export type TalentTreeOnChange = (selectedTalents: SelectedTalents, pointCount: PointCount) => void;
export type LinkStyle = {
  strokeWidth?: number;
  strokeColor?: string;
  curveness?: number;
};

export type TalentTreeProps = {
  talentNodes: ParsedSpecTalents;
  onChange?: TalentTreeOnChange;
  className?: string;
  style?: CSSProperties;
  linkStyle?: LinkStyle;
  initialSelectedTalents?: TalentNodeWithMetadata[];
};

export function TalentTree({
  talentNodes,
  onChange,
  className,
  style,
  linkStyle,
  initialSelectedTalents,
}: TalentTreeProps) {
  const { talents, invest, uninvest } = useTalentTree(
    talentNodes,
    onChange,
    initialSelectedTalents
  );
  const treeId = useUniqueId();

  return (
    <Tooltip.Provider>
      {/* Render main talent body */}
      <Main className={className} style={style}>
        {talents.map((talent) => (
          <TalentNode
            invest={invest}
            uninvest={uninvest}
            id={`${talent.data.cell}-${treeId}`}
            className={`talent-${talent.data.cell}`}
            key={`talent-${talent.data.cell}`}
            talent={talent}
          />
        ))}
      </Main>

      {/* Render out links */}
      {talents.map((talent) => {
        return (
          "links" in talent.data &&
          talent.data?.links?.map((link) => (
            <Xarrow
              key={`${talent.data.cell}-${link}-${treeId}`}
              strokeWidth={linkStyle?.strokeWidth || 2}
              curveness={linkStyle?.curveness || 0}
              startAnchor="middle"
              endAnchor="middle"
              color={linkStyle?.strokeColor || "black"}
              headSize={0}
              start={`${talent.data.cell}-${treeId}`}
              end={`${link}-${treeId}`}
            />
          ))
        );
      })}
    </Tooltip.Provider>
  );
}
