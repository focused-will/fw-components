import { Priest } from "../trees";
import { deserialize } from "./wowhead";

describe("wowhead serialization", () => {
  describe("serialize", () => {});

  describe("deserialize", () => {
    it("should deserialize a string", () => {
      const { GENERAL, TREE } = Priest.DISCIPLINE;

      const result = deserialize("DAEAEAEBACRBBA", GENERAL, TREE);

      expect(result).toEqual({
        GENERAL: [
          {
            talentNodeData: {
              id: 393870,
              name: "Improved Flash Heal",
              icon: "spell_holy_heal",
              capacity: 1,
              cell: 23,
              row: 2,
              column: 7,
              talentType: 2,
              links: [38, 40, 42],
            },
            points: 1,
          },
          {
            talentNodeData: {
              capacity: 1,
              cell: 40,
              row: 3,
              column: 7,
              talentType: 3,
              left: {
                id: 193063,
                name: "Protective Light",
                icon: "spell_holy_holyprotection",
                url: "https://www.wowhead.com/beta/spell=193063/protective-light",
              },
              right: {
                id: 390615,
                name: "From Darkness Comes Light",
                icon: "spell_holy_flashheal",
                url: "https://www.wowhead.com/beta/spell=390615/from-darkness-comes-light",
              },
              links: [57],
            },
            selectedId: 193063,
            points: 1,
          },
        ],
        TREE: [
          {
            talentNodeData: {
              id: 81749,
              name: "Atonement",
              icon: "ability_priest_atonement",
              capacity: 1,
              cell: 8,
              row: 1,
              column: 9,
              talentType: 2,
              links: [23, 25, 27],
            },
            points: 1,
          },
          {
            talentNodeData: {
              id: 33206,
              name: "Pain Suppression",
              icon: "spell_holy_painsupression",
              capacity: 1,
              cell: 25,
              row: 2,
              column: 9,
              talentType: 1,
              links: [42],
            },
            points: 1,
          },
          {
            talentNodeData: {
              capacity: 1,
              cell: 42,
              row: 3,
              column: 9,
              talentType: 3,
              left: {
                id: 372991,
                name: "Pain Transformation",
                icon: "spell_holy_blessedrecovery",
                url: "https://www.wowhead.com/beta/spell=372991/pain-transformation",
              },
              right: {
                id: 373035,
                name: "Protector of the Frail",
                icon: "ability_racial_forceshield",
                url: "https://www.wowhead.com/beta/spell=373035/protector-of-the-frail",
              },
              links: [57, 59],
            },
            selectedId: 372991,
            points: 1,
          },
        ],
      });
    });
  });
});
