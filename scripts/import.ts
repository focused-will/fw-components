#!/usr/bin/env ts-node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import puppeteer from "puppeteer";
import fs from "fs/promises";

function writePrettyJsonFile(path: string, object: object) {
  const output = JSON.stringify(object, null, 2);

  return fs.writeFile(path, output);
}

/**
 * This is the closure handed to the browser to fetch data
 */
function importTreeSpells(type = "class") {
  const ICON_REGEX = /(:?\/)([^\/]+).jpg/;
  const SPELL_REGEX = /(?:spell=)(\d+)/;
  const spellEls = document.querySelectorAll(
    `[data-tree-type=${type}] .dragonflight-talent-tree-talent`
  ) as NodeListOf<HTMLElement>;

  const connectionEls = document.querySelectorAll(
    `[data-tree-type=${type}] .dragonflight-talent-tree-connection`
  ) as NodeListOf<HTMLElement>;

  const connections = [...connectionEls].map((connectionEl) => {
    const from = connectionEl.dataset.fromCell;
    const to = connectionEl.dataset.toCell;

    if (!from || !to) {
      throw new Error("Could not find from or to");
    }

    return {
      from,
      to,
    };
  });

  const spells = [...spellEls].map((spellEl) => {
    const row = spellEl.dataset.row;
    const cell = spellEl.dataset.cell;
    const column = spellEl.dataset.column;
    const talentType = spellEl.dataset.talentType;
    const url = spellEl.getAttribute("href");
    const name = spellEl.querySelector(".dragonflight-talent-tree-talent-name")?.textContent;

    const iconContainer = spellEl.querySelector(".dragonflight-talent-tree-talent-inner-background") as HTMLElement;
    const backgroundImageStyle = iconContainer.style.backgroundImage;

    const icon = backgroundImageStyle.match(ICON_REGEX)?.[2];
    const id = url?.match(SPELL_REGEX)?.[1];

    const pointMax = document.querySelector(
      `div[data-tree-type=${type}] .dragonflight-talent-tree-talent-points[data-row="${row}"][data-cell="${cell}"]`
    )?.textContent;

    const [_, total] = pointMax?.split("/") ?? [];

    // Multichoice
    if (talentType === "3") {
      const [leftName, rightName] = name?.split(" / ") || [];
      const backgroundImageEls = spellEl.querySelectorAll(
        ".dragonflight-talent-tree-talent-inner-background"
      ) as NodeListOf<HTMLElement>;
      const [leftIcon, rightIcon] = [...backgroundImageEls].map((el) => {
        const backgroundImageStyle = el.style.backgroundImage;
        return backgroundImageStyle.match(ICON_REGEX)?.[2];
      });

      const leftUrl = spellEl.dataset.choiceHref0;
      const rightUrl = spellEl.dataset.choiceHref1;

      const leftId = leftUrl?.match(SPELL_REGEX)?.[1];
      const rightId = rightUrl?.match(SPELL_REGEX)?.[1];

      return {
        cell: +(cell || 0),
        row: +(row || 0),
        column: +(column || 0),
        talentType: +(talentType || 0),
        capacity: +total,
        left: {
          id: +(leftId || 0),
          name: leftName,
          icon: leftIcon,
          url: leftUrl,
        },
        right: {
          id: +(rightId || 0),
          name: rightName,
          icon: rightIcon,
          url: rightUrl,
        },
      };
    }

    return {
      id: +(id || 0),
      name,
      icon,
      capacity: +(total || 0),
      cell: +(cell || 0),
      row: +(row || 0),
      column: +(column || 0),
      talentType: +(talentType || 0),
      url,
    };
  });

  const spellMap = spells.reduce<Record<string, any>>((acc, spell) => {
    if (!spell.cell) return acc;
    acc[spell.cell] = spell;
    return acc;
  }, {});

  // Mutating here, but it's fine (promise)
  connections.forEach(({ from, to }) => {
    const fromSpell = spellMap[from];
    const toSpell = spellMap[to];

    if (!fromSpell || !toSpell) {
      throw new Error("Could not find from or to spell");
    }

    if (toSpell.links) {
      toSpell.links.push(+from);
    } else {
      toSpell.links = [+from];
    }
  });

  return spells;
}

/**
 * Scrapes the class and talent tree at the requested page
 */
async function importTree(url: string) {
  const browser = await puppeteer.launch();
  console.log("Launched browser 🚀");

  const page = await browser.newPage();
  console.log("Loaded page 🚀");

  await page.goto(url);
  console.log("Loaded url 🚀");

  // Will typically look like class-spec
  const classSpec = await page.evaluate(() => {
    const specEl = document.querySelector("[data-class-spec]") as HTMLElement | null;

    return specEl?.dataset.classSpec;
  });

  if (!classSpec) {
    throw new Error("Could not find class and spec");
  }

  const [targetClass, spec] = classSpec.split("-");

  console.log(`Got class of ${targetClass} and specialization of ${spec} 🤓`);

  const classTreeSpells = await page.evaluate(importTreeSpells, "class");

  console.log(`Got ${classTreeSpells.length} spells in the class tree 🤓`);

  const specTreeSpells = await page.evaluate(importTreeSpells, "spec");

  console.log(`Got ${specTreeSpells.length} spells in the spec tree 🤓`);

  try {
    const rootWrite = `${process.cwd()}/src/data/${targetClass}/${spec}`;
    await fs.mkdir(rootWrite, { recursive: true });
    await writePrettyJsonFile(`${rootWrite}/general.json`, classTreeSpells);
    await writePrettyJsonFile(`${rootWrite}/tree.json`, specTreeSpells);
  } catch (e) {
    console.log("Encountered an error while writing files 😢");
    console.error(e);
  }

  await browser.close();
}

yargs(hideBin(process.argv))
  .command(
    "import <url>",
    "Import a tree from a URL",
    (yargs) => {
      yargs.positional("url", {
        default: "https://www.wowhead.com/beta/talent-calc/priest/discipline",
        type: "string",
        describe: "The URL to import from",
      });
    },
    async (argv) => {
      const { url } = argv;
      if (typeof url !== "string") {
        throw new Error("Invalid URL");
      }
      await importTree(url);
    }
  )
  .parse();
