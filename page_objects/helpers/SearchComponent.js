class SearchComponent {
  constructor(page) {
    this.page = page;
    this.searchField = page.getByRole('textbox', { name: 'Search' });
    this.cityField = page.getByRole('textbox', { name: 'City' });
    this.bedroomDropdownButton = page.getByRole('button', { name: 'Bedrooms' });
    this.darkModeCheckbox = page.locator('input.PrivateSwitchBase-input');
    this.searchButton = page.getByRole('button', { name: 'Start Search' });

    this.minPriceThumb = page.locator('input[type="range"][data-index="0"]');
    this.maxPriceThumb = page.locator('input[type="range"][data-index="1"]');
  }

  async toggleDarkMode() {
    await this.darkModeCheckbox.click();
  }

  async searchByKeyword(keyword = '') {
    await this.searchField.fill(keyword);
    await this.searchButton.click();
  }

  async searchByBedrooms(bedroomsAmount) {
    await this.bedroomDropdownButton.click();
    await this.page.getByRole('option', { name: bedroomsAmount }).click();
    await this.searchButton.click();
  }

  async searchByCity(city = 'Los Angeles') {
    await this.cityField.fill(city);
    await this.searchButton.click();
  }

  async searchByPrice(lowPrice = 100000, highPrice = 10000000) {
    await this.minPriceThumb.fill('' + lowPrice);
    await this.maxPriceThumb.fill('' + highPrice);
    await this.searchButton.click();
  }
}

module.exports = SearchComponent;
