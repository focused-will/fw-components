import { z } from "zod";

// Zod schema for TalentNodeData
const baseTalentNodeDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
  capacity: z.number(),
  cell: z.number(),
  row: z.number(),
  column: z.number(),
  talentType: z.number(),
  links: z.array(z.number()).optional(),
});

const choiceTalentNodeDataSchema = z.object({
  capacity: z.number(),
  cell: z.number(),
  row: z.number(),
  column: z.number(),
  talentType: z.literal(3),
  left: z.object({
    id: z.number(),
    name: z.string(),
    icon: z.string(),
    url: z.string(),
  }),
  right: z.object({
    id: z.number(),
    name: z.string(),
    icon: z.string(),
    url: z.string(),
  }),
});

export const TalentNodeDataSchema = z.union([
  choiceTalentNodeDataSchema,
  baseTalentNodeDataSchema,
]);

export type TalentNodeData = z.infer<typeof TalentNodeDataSchema>;
