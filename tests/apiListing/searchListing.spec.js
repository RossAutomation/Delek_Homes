const { test, expect } = require('@playwright/test');
const UserApi = require('../../api/userApi');
const userCredentials = require('../../testsData/userCredentials.json');
const ListingApi = require('../../api/listingApi');

test.describe('Listing', () => {
  var userApi;
  var listingApi;

  test.beforeEach('Login and Create new listing', async ({ request }) => {
    userApi = new UserApi(request);
    const apiResponse = await userApi.login(
      userCredentials.admin.email,
      userCredentials.admin.password,
    );
    const accessToken = apiResponse.accessToken;
    listingApi = new ListingApi(request, accessToken);
  });
  test('Search for listing', async () => {
    const response = await listingApi.createListing();
    const retrievedListing = await listingApi.getListingById(response.id);
    expect(retrievedListing.estateObject.title).toEqual(response.title);
  });
});
