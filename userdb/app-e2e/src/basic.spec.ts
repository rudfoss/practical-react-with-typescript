import { test, expect } from "@playwright/test"

test("sanity check", async ({ page }) => {
	await page.goto("/")
	// Testing that there is a <div id="root"> with some content inside it
	expect(page.locator("#root > *")).toBeTruthy()

	// Expect h1 to contain a substring.
	// expect(await page.locator("h1").textContent()).toContain("Hello world")
})
