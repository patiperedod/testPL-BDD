import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world";

Given("I open Souce Demo", async function (this: CustomWorld) {
  await this.page.goto("https://www.saucedemo.com/");
});

When(
  'I type user name {string} and password {string}',
  async function (this: CustomWorld, user: string, pass: string) {
    await this.page.locator('[data-test="username"]').fill(user);
    await this.page.locator('[data-test="password"]').fill(pass);
    await this.page.locator('[data-test="login-button"]').click();
    console.log("Hola hice clic en el boto login");
  }
);

When(
  'I type user name {string} and password {string} and enter',
  async function (this: CustomWorld, user: string, pass: string) {
    await this.page.locator('[data-test="username"]').fill(user);
    await this.page.locator('[data-test="password"]').fill(pass);
    await this.page.keyboard.press("Enter");
    console.log("Hola hice clic con ENTER");
  }
);

When(
  'I type user name {string} and password {string} invalid credentials',
  async function (this: CustomWorld, user: string, pass: string) {
    await this.page.locator('[data-test="username"]').fill(user);
    await this.page.locator('[data-test="password"]').fill(pass);
    await this.page.locator('[data-test="login-button"]').click();
    console.log("envie credenciales invalidas");
  }
);

Then(
  'I should see {string} title is displayed',
  async function (this: CustomWorld, title: string) {
    await expect(this.page.locator(".title")).toHaveText(title);
  }
);

/** ✅ NUEVO: para tu scenario de credenciales inválidas */
Then(
  'I should see {string} message is displayed',
  async function (this: CustomWorld, message: string) {
    await expect(this.page.locator('[data-test="error"]')).toContainText(message);
  }
);

/** ✅ Select item */
When(
  'I select the item {string}',
  async function (this: CustomWorld, itemName: string) {
    await this.page
      .locator('[data-test="inventory-item-name"]', { hasText: itemName })
      .click();
  }
);

Then(
  'I should see the item detail page for {string}',
  async function (this: CustomWorld, itemName: string) {
    await expect(this.page.locator('[data-test="inventory-item-name"]')).toHaveText(itemName);
  }
);

When(
  'I filter products by {string}',
  async function (this: CustomWorld, option: string) {
    const sort = this.page.locator('[data-test="product-sort-container"]');

    // 1) seleccionar opción
    await sort.selectOption({ label: option });

    // 2) esperar a que el dropdown refleje la opción elegida
    await expect(sort).toHaveValue(
      option === "Price (low to high)" ? "lohi" :
      option === "Price (high to low)" ? "hilo" :
      option === "Name (A to Z)" ? "az" :
      option === "Name (Z to A)" ? "za" : ""
    );

    // 3) esperar a que el primer precio exista (UI ya lista)
    await expect(this.page.locator('[data-test="inventory-item-price"]').first()).toBeVisible();
  }
);

/** ✅ Validate Name Z → A */
Then(
  'products should be displayed in descending alphabetical order',
  async function (this: CustomWorld) {
    const items = await this.page
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();

    const normalized = items.map((t) => t.trim());
    const sorted = [...normalized].sort((a, b) => b.localeCompare(a));

    expect(normalized).toEqual(sorted);
  }
);

/** ✅ Validate Price Low → High */
Then(
  'products should be displayed from lowest to highest price',
  async function (this: CustomWorld) {
    const pricesText = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();

    const prices = pricesText.map((p) => Number(p.replace("$", "").trim()));
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  }
);

/** ✅ Validate Price High → Low */
Then(
  'products should be displayed from highest to lowest price',
  async function (this: CustomWorld) {
    const pricesText = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();

    const prices = pricesText.map((p) => Number(p.replace("$", "").trim()));
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  }
);


