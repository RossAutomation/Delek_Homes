const { test, expect } = require('@playwright/test');
const userCredentials = require('../../testsData/userCredentials.json');
const UserApi = require('../../api/userApi');

test.describe('login', () => {
  var userApi;
  test.beforeEach('create items', async ({ request }) => {
    userApi = new UserApi(request);
  });

  test('Api Login!', async () => {
    const response = await userApi.login(
      userCredentials.admin.email,
      userCredentials.admin.password,
    );
    expect(response).toHaveProperty('accessToken');
    expect(response.accessToken).not.toBeNull();
  });
});
