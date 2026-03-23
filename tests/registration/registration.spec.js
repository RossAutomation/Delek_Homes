import { expect, test } from '@playwright/test';

const HomePage = require('../../page_objects/HomePage');
const RegisterPage = require('../../page_objects/RegisterPage');

test.describe('register', () => {
  var home;
  var register;
  test.beforeEach('Initialize Page Objects', async ({ page }) => {
    home = new HomePage(page);
    register = new RegisterPage(page);
    await page.goto('https://dev.delekhomes.com/');
    await page.waitForURL('https://dev.delekhomes.com/');
    await home.clickRegisterLink();
  });
  test('Verify user cannot register with invalid email', async ({ page }) => {
    await register.submitRegisterForm('Admin', 'Test', 'hippo', 'DontTestMe');

    await expect(
      page.getByText('Email must be a valid email address'),
    ).toBeVisible();
  });

  test('Verify user can register a new account', async ({ page }) => {
    const date = Date.now();
    await register.submitRegisterForm(
      'Admin',
      'Test',
      date + '123email@gmail.com',
      'DontTestMe',
    );

    await expect(page.getByText('Profile')).toBeVisible();
  });
  test('Verify user has to put in required fields', async ({ page }) => {
    await register.submitRegisterForm('Admin', 'Test', '', 'DontTestMe');

    await expect(page.getByText('Email is required')).toBeVisible();
  });
});
