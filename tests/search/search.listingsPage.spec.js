import { expect, test } from '@playwright/test';

const HomePage = require('../../page_objects/HomePage');
const FeaturedListingsPage = require('../../page_objects/featuredListingsPage');
const SearchComponent = require('../../page_objects/helpers/SearchComponent');
const listingData = require('../../testsData/listing.json');

test.describe('Search Listings Page', () => {
  let featuredListingsPage, searchComponent;

  test.beforeEach(
    'Before each to create pages and open dark mode.',
    async ({ page }) => {
      featuredListingsPage = new FeaturedListingsPage(page);
      searchComponent = new SearchComponent(page);
      await page.goto('https://dev.delekhomes.com/featured-listings');
      await searchComponent.toggleDarkMode();
    },
  );
  test('Search by title', async ({ page }) => {
    await searchComponent.searchByKeyword(listingData.title);
    const actualTitle = await featuredListingsPage.getTitle();
    expect(listingData.title).toStrictEqual(actualTitle);
  });

  test('Search by Bedrooms', async ({ page }) => {
    await searchComponent.searchByBedrooms(listingData.bedroomsLabel);
    const actualBedrooms = await featuredListingsPage.getBedroomsCount();
    expect(parseInt(actualBedrooms)).toBeGreaterThanOrEqual(
      parseInt(listingData.bedrooms),
    );
  });

  test('Search by Price', async ({}) => {
    await searchComponent.searchByPrice(
      listingData.lowRange,
      listingData.highRange,
    );
    const actualPrice = await featuredListingsPage.getPrice();
    expect(actualPrice).toBeGreaterThanOrEqual(listingData.lowRange);
    expect(actualPrice).toBeLessThanOrEqual(listingData.highRange);
  });

  test('Search by city', async ({ page }) => {
    await searchComponent.searchByKeyword(listingData.title);
    await searchComponent.searchByCity(listingData.city);
    const actualCityFeaturedListing = await featuredListingsPage.getCity();
    const actualTitleFeaturedListing = await featuredListingsPage.getTitle();
    expect(listingData.city).toEqual(actualCityFeaturedListing);
    expect(listingData.title).toEqual(actualTitleFeaturedListing);

    const actualTitle = await featuredListingsPage.getTitle();
    const actualPrice = await featuredListingsPage.getPrice();
    const actualSqft = await featuredListingsPage.getSqft();
    const actualBedrooms = await featuredListingsPage.getBedroomsCount();
    const actualGarages = await featuredListingsPage.getGarageCount();
    const actualBathrooms = await featuredListingsPage.getBathroomCount();

    expect(actualTitle).toEqual(listingData.title);
    expect(actualPrice).toBeGreaterThanOrEqual(listingData.lowRange);
    expect(actualPrice).toBeLessThanOrEqual(listingData.highRange);
    expect(listingData.sqft).toEqual(actualSqft);
    expect(actualBedrooms).toEqual(listingData.bedrooms);
    expect(listingData.garages).toEqual(actualGarages);
    expect(listingData.bathrooms).toEqual(actualBathrooms);
  });
});
