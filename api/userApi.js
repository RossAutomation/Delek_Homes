const userCredentials = require('../testsData/userCredentials.json');

class UserApi {
  constructor(request) {
    this.request = request;
  }
  async login(email, password) {
    const response = await this.request.post(
      'https://dev.delekhomes.com/api/users/login',
      {
        data: {
          email: email,
          password: password,
        },
      },
    );
    return await response.json();
  }
}

module.exports = UserApi;
