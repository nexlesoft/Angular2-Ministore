import { Angular2StorePage } from './app.po';

describe('Angular2-Store App', function() {
  let page: Angular2StorePage;

  beforeEach(() => {
    page = new Angular2StorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
