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
 * Scrapes the class and talent tree at the requested page
 */
async function importTree(url: string) {
  const browser = await puppeteer.launch();
  console.log("Launched browser 🚀");

  const page = await browser.newPage();
  console.log("Loaded page 🚀");

  const response = await page.goto(url);
  console.log("Loaded url 🚀");

  // Will typically look like class-spec
  const classSpec = await page.evaluate(() => {
    const specEl = document.querySelector(
      "[data-class-spec]"
    ) as HTMLElement | null;

    return specEl?.dataset.classSpec;
  });

  if (!classSpec) {
    throw new Error("Could not find class and spec");
  }

  const [targetClass, spec] = classSpec.split("-");

  console.log(`Got class of ${targetClass} and specialization of ${spec} 🤓`);

  const classTreeSpells = await page.evaluate(() => {
    const ICON_REGEX = /(:?\/)([^\/]+).jpg/;
    const spellEls = document.querySelectorAll(
      "[data-tree-type=class] .dragonflight-talent-tree-talent"
    ) as NodeListOf<HTMLElement>;

    return [...spellEls].map((spellEl) => {
      const row = spellEl.dataset.row;
      const column = spellEl.dataset.column;
      const talentType = spellEl.dataset.talentType;
      const url = spellEl.getAttribute("href");

      const iconContainer = spellEl.querySelector(
        ".dragonflight-talent-tree-talent-inner-background"
      ) as HTMLElement;
      const backgroundImageStyle = iconContainer.style.backgroundImage;

      const icon = backgroundImageStyle.match(ICON_REGEX)?.[2];

      return {
        row,
        column,
        talentType,
        url,
        icon,
      };
    });
  });

  console.log(`Got ${classTreeSpells.length} spells in the class tree 🤓`);

  const specTreeSpells = await page.evaluate(() => {
    const ICON_REGEX = /(:?\/)([^\/]+).jpg/;
    const SPELL_REGEX = /(?:spell=)(\d+)/;
    const spellEls = document.querySelectorAll(
      "[data-tree-type=spec] .dragonflight-talent-tree-talent"
    ) as NodeListOf<HTMLElement>;

    return [...spellEls].map((spellEl) => {
      const row = spellEl.dataset.row;
      const column = spellEl.dataset.column;
      const talentType = spellEl.dataset.talentType;
      const url = spellEl.getAttribute("href");

      const iconContainer = spellEl.querySelector(
        ".dragonflight-talent-tree-talent-inner-background"
      ) as HTMLElement;
      const backgroundImageStyle = iconContainer.style.backgroundImage;

      const icon = backgroundImageStyle.match(ICON_REGEX)?.[2];
      const spellId = url?.match(SPELL_REGEX)?.[1];

      return {
        row,
        column,
        talentType,
        url,
        icon,
        spellId,
      };
    });
  });

  console.log(`Got ${specTreeSpells.length} spells in the spec tree 🤓`);

  try {
    const rootWrite = `${process.cwd()}/src/data/${targetClass}`;
    await fs.mkdir(rootWrite, { recursive: true });
    await writePrettyJsonFile(`${rootWrite}/general.json`, classTreeSpells);
    await writePrettyJsonFile(`${rootWrite}/${spec}.json`, specTreeSpells);
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
