import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function builtHtml() {
  return readFile(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
}

test("builds the finished Ziki's brand site", async () => {
  const html = await builtHtml();

  assert.match(html, /<title>Ziki’s \| Greek Street Eats in San Diego<\/title>/i);
  assert.match(html, /Greek food,/);
  assert.match(html, /with sunshine\./);
  assert.match(html, /organic ingredients/i);
  assert.match(html, /no seed oils/i);
  assert.match(html, /https:\/\/www\.instagram\.com\/eatzikis\//);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Starter Project/);
});

test("includes Alyssa's story, the menu, and the event inquiry journey", async () => {
  const html = await builtHtml();

  assert.match(html, /Alyssa Gosselin/);
  assert.match(html, /Chicken Gyro/);
  assert.match(html, /Lamb Gyro/);
  assert.match(html, /Trio of Dips/);
  assert.match(html, /Follow @eatzikis/);
  assert.match(html, /Inquire about your event/);
  assert.match(html, /Guest count/);
});
