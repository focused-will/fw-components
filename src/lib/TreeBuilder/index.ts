export interface TalentNode {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

export default class TalentTreeBuilder {
  private tree: TalentNode[][] = [];
  private talentNameMap: Record<string, TalentNode> | null = null;
  private talentLinks: [string, string][] = [];
  private talentLinksById: [number, number][] = [];

  /**
   * Add a single talent to the current row
   */
  addTalent(talent: TalentNode) {
    const row = this.tree[this.tree.length - 1];

    if (row) {
      this.tree[this.tree.length - 1].push(talent);
    } else {
      this.tree.push([talent]);
    }

    return this;
  }

  /**
   * Add a row of talents
   */
  addTalentRow(talents: TalentNode[]) {
    this.tree.push([]);
    talents.forEach((talent) => this.addTalent(talent));
    return this;
  }

  /**
   * Link two talents together
   */
  addLink(from: string, to: string) {
    const fromTalent = from.toLowerCase();
    const toTalent = to.toLowerCase();

    this.talentLinks.push([fromTalent, toTalent]);
    return this;
  }

  /**
   * Build a map of talent ids to talent ids
   */
  private buildLinksById() {
    const links = this.talentLinks.map<[number, number]>(([from, to]) => {
      const fromTalent = this.talentNameMap![from];
      const toTalent = this.talentNameMap![to];

      return [fromTalent.id, toTalent.id];
    });

    this.talentLinksById = links;
  }

  /**
   * Build a map of names to talents
   */
  private buildTalentNameMap() {
    const nameMap = this.tree.reduce<Record<string, TalentNode>>((acc, row) => {
      row.forEach((talent) => {
        acc[talent.name.toLowerCase()] = talent;
      });

      return acc;
    }, {});

    this.talentNameMap = nameMap;
  }

  build() {
    this.buildTalentNameMap();
    this.buildLinksById();

    return {
      rows: this.tree,
      links: this.talentLinksById,
    };
  }
}
