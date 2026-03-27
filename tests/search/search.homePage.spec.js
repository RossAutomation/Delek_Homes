import { expect, test } from '@playwright/test';

const HomePage = require('../../page_objects/HomePage');
const SearchComponent = require('../../page_objects/helpers/SearchComponent');
const listingData = require('../../testsData/listing.json');

test.describe('Search Home Page', () => {
  let homePage, searchComponent;

  test.beforeEach(
    'Before each to create pages and open dark mode.',
    async ({ page }) => {
      homePage = new HomePage(page);
      searchComponent = new SearchComponent(page);
      await page.goto('https://dev.delekhomes.com/');
      await searchComponent.toggleDarkMode();
    },
  );
  test('Search by title', async ({ page }) => {
    await searchComponent.searchByKeyword(listingData.title);
    const actualTitle = await homePage.getTitle();
    expect(listingData.title).toStrictEqual(actualTitle);
  });

  test('Search by Bedrooms', async ({ page }) => {
    await searchComponent.searchByBedrooms(listingData.bedroomsLabel);
    let actualBedrooms = await homePage.getBedroomsCount();
    expect(parseInt(actualBedrooms)).toBeGreaterThanOrEqual(
      parseInt(listingData.bedrooms),
    );
  });

  test('Search by Price', async ({}) => {
    await searchComponent.searchByPrice(
      listingData.lowRange,
      listingData.highRange,
    );
    const actualPrice = await homePage.getPrice();
    expect(actualPrice).toBeGreaterThanOrEqual(listingData.lowRange);
    expect(actualPrice).toBeLessThanOrEqual(listingData.highRange);
  });

  test('Search by city', async ({ page }) => {
    await searchComponent.searchByKeyword(listingData.title);
    await searchComponent.searchByCity(listingData.city);
    const actualCityFeaturedListing = await homePage.getCity();
    const actualTitleFeaturedListing = await homePage.getTitle();
    expect(listingData.city).toEqual(actualCityFeaturedListing);
    expect(listingData.title).toEqual(actualTitleFeaturedListing);

    const actualTitle = await homePage.getTitle();
    const actualPrice = await homePage.getPrice();
    const actualSqft = await homePage.getSqft();
    const actualBedrooms = await homePage.getBedroomsCount();
    const actualGarages = await homePage.getGarageCount();
    const actualBathrooms = await homePage.getBathroomCount();

    expect(actualTitle).toEqual(listingData.title);
    expect(actualPrice).toBeGreaterThanOrEqual(listingData.lowRange);
    expect(actualPrice).toBeLessThanOrEqual(listingData.highRange);
    expect(listingData.sqft).toEqual(actualSqft);
    expect(actualBedrooms).toEqual(listingData.bedrooms);
    expect(listingData.garages).toEqual(actualGarages);
    expect(listingData.bathrooms).toEqual(actualBathrooms);
  });
});
