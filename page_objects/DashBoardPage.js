class DashBoardPage {
  constructor(page){
    this.page = page;
    this.userFullName = page.locator('h6.MuiTypography-subtitle2');
    this.userRole = page.locator('a p.MuiTypography-body2');
    this.moonButton = page.getByRole('button').locator('.MuiAvatar-root');
    this.logoutButton = page.locator('li.MuiButtonBase-root');
  }
  async clickLogout(){
  await this.moonButton.click();
  await this.logoutButton.click();
  }
}
module.exports = DashBoardPage;