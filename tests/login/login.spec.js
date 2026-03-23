const { test, expect } = require('@playwright/test');
const HomePage = require('../../page_objects/HomePage');
const LoginPage = require('../../page_objects/LoginPage');
const DashboardPage = require('../../page_objects/DashBoardPage');

test.describe('Listing', () => {
  var home;
  var login;
  var dashboard;
  test.beforeEach('initialize page objects', async ({ page }) => {
    home = new HomePage(page);
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    await page.goto('/');
    await home.clickLoginLink();
  });
  test('Verify login with valid credentials', async () => {
    // await page.locator([href="/auth/login"]).click();

    await login.userLogin('admin@gmail.com', 'DontTestMe');
    await login.clickLoginButton();

    await expect(dashboard.userFullName).toHaveText('Admin Adminuk');
    await expect(dashboard.userRole).toHaveText('role: admin');
  });
  test('Verify logout', async ({ page }) => {
    await login.userLogin('admin@gmail.com', 'DontTestMe');
    await login.clickLoginButton();
    await dashboard.clickLogout();

    await expect(page.locator('h4.MuiTypography-root')).toHaveText(
      'Sign in to Delek Homes',
    );
  });
});
