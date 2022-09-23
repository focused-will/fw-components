import TalentTreeBuilder from ".";

describe("TalentTreeBuilder", () => {
  it("should build a tree", () => {
    const tree = new TalentTreeBuilder()
      .addTalentRow([
        { name: "A", id: 1 },
        { name: "B", id: 2 },
      ])
      .addTalentRow([{ name: "C", id: 3 }])
      .addLink("A", "B")
      .addLink("B", "C")
      .build();

    expect(tree).toEqual({
      rows: [
        [
          { name: "A", id: 1 },
          { name: "B", id: 2 },
        ],
        [{ name: "C", id: 3 }],
      ],
      links: [
        [1, 2],
        [2, 3],
      ],
    });
  });

  it("should ignore case for adding links", () => {
    const tree = new TalentTreeBuilder()
      .addTalentRow([{ name: "A", id: 1 }])
      .addTalentRow([{ name: "B", id: 2 }])
      .addLink("a", "b")
      .build();

    expect(tree).toEqual({
      rows: [[{ name: "A", id: 1 }], [{ name: "B", id: 2 }]],
      links: [[1, 2]],
    });
  });

  it("should add single talents to the last row by default", () => {
    const tree = new TalentTreeBuilder()
      .addTalentRow([{ name: "A", id: 1 }])
      .addTalent({ name: "B", id: 2 })
      .build();

    expect(tree).toEqual({
      rows: [
        [
          { name: "A", id: 1 },
          { name: "B", id: 2 },
        ],
      ],
      links: [],
    });
  });
});
