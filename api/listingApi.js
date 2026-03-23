import { faker } from '@faker-js/faker';

class ListingApi {
  constructor(request, accessToken) {
    this.request = request;
    this.accessToken = accessToken;
  }

  async createListing() {
    const randomNumber = faker.number.int({ min: 1000, max: 10000 });
    let data = {
      images: '/static/media/4.7b41bdc0126a7e58e56e.jpeg',
      lotSize: 3000,
      sqft: 2000,
      garage: 2,
      bathrooms: 1,
      bedrooms: 1,
      price: faker.number.int({ min: 50000, max: 1000000 }),
      zipCode: 90963,
      state: 'CA',
      city: 'Chicago',
      address: '4528 w 142nd st',
      description: 'The QA House',
      title: `Some Random House Alex ${randomNumber}`,
      isPublished: true,
    };
    const response = await this.request.post(
      'https://dev.delekhomes.com/api/estate-objects',
      { multipart: data, authorization: `Bearer ${this.accessToken}` },
    );
    if (response.ok()) {
      console.log('Request was successful with status ' + response.status());
    } else {
      console.log('Request failed with status ' + response.status());
    }
    const body = await response.json();
    return body;
  }

  async getListingById(id) {
    const searchResponse = await this.request.get(
      `https://dev.delekhomes.com/api/estate-objects/${id}`,
    );
    const listing = await searchResponse.json();
    return listing;
  }
  async deleteListing(id) {
    const response = await this.request.delete(
      `https://dev.delekhomes.com/api/${id}`,
      {
        authorization: `Bearer ${this.accessToken}`,
      },
    );
  }
}
module.exports = ListingApi;
