class FeaturedListingsPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.MuiTypography-h5').first();
    this.priceLabel = page.locator('//div[starts-with(text(), "$")]').first();

    this.cityLabel = page.getByText('City:').first();
    this.sqftLabel = page.getByText('Sqft:').first();
    this.bedroomsLabel = page.getByText('Bedrooms:').first();
    this.garageLabel = page.getByText('Garage:').first();
    this.bathroomsLabel = page.getByText('Bathrooms:').first();
    this.moreInfoButton = page.getByRole('link', { name: 'More Info' }).first();
  }
  async getTitle() {
    return await this.title.textContent();
  }
  async openDetailsOfFirstListing() {
    return await this.moreInfoButton.click();
  }
  async openDetailsOfFirstListing() {
    return await this.moreInfoButton.click();
  }
  async getCity() {
    let city = await this.cityLabel.textContent();
    city = city.replace('City: ', '').trim();
    return city;
  }
  async getPrice() {
    let price = await this.priceLabel.textContent();
    price = price.split('$').at(1).trim().replaceAll(',', '');
    return parseInt(price);
  }
  async getGarageCount() {
    let garage = await this.garageLabel.textContent();
    garage = garage.split(':').at(1).trim();
    return parseInt(garage);
  }

  async getBathroomCount() {
    let bathrooms = await this.bathroomsLabel.textContent();
    bathrooms = bathrooms.split(':').at(1).trim();
    return parseInt(bathrooms);
  }

  async getBedroomsCount() {
    let bedrooms = await this.bedroomsLabel.textContent();
    console.log(bedrooms);
    bedrooms = bedrooms.split(':').at(1).trim();
    console.log(bedrooms);
    return bedrooms;
  }

  async getSqft() {
    let sqft = await this.sqftLabel.textContent();
    sqft = sqft.split(':').at(1).trim();
    return parseInt(sqft);
  }
}

module.exports = FeaturedListingsPage;
