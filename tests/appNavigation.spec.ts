import { test, expect } from './fixtures';

test.describe('navigating the portal', () => {
  test('the portfolio renders as the app home', async ({ gotoPage, page }) => {
    await gotoPage('');
    await expect(page.getByTestId('portfolio-summary')).toBeVisible();
    await expect(page.getByTestId('card-store-4023')).toBeVisible();
  });

  test('a restaurant page renders and links back to the portfolio', async ({ gotoPage, page }) => {
    await gotoPage('/restaurant/4023');
    await expect(page.getByText('Store network layout')).toBeVisible();

    await page.getByRole('link', { name: 'Portfolio' }).first().click();
    await expect(page.getByTestId('portfolio-summary')).toBeVisible();
  });

  test('search filters the table and keeps the view', async ({ gotoPage, page }) => {
    await gotoPage('');
    await page.getByRole('tab', { name: 'Table' }).click();
    await page.getByRole('combobox', { name: 'Search restaurants' }).fill('aurora');
    const table = page.getByRole('table');
    await expect(table.getByRole('link', { name: 'Store #4044' })).toBeVisible();
    await expect(table.getByRole('link', { name: 'Store #4023' })).toHaveCount(0);
  });
});
