import { test, expect } from "@playwright/test"

test("sanity check", async ({ page }) => {
	await page.goto("/")

	expect(await page.locator("#root > h1").textContent()).toContain("Hello world")
})
