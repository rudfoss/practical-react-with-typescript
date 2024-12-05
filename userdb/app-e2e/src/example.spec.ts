import { test, expect } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("/")

  expect(page.locator("table")).toBeDefined()

  // Expect h1 to contain a substring.
  // expect(await page.locator("h1").textContent()).toContain("It works 🥳")
})
