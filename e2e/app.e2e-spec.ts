import { SusidFrontendPage } from './app.po';

describe('susid-frontend App', function() {
  let page: SusidFrontendPage;

  beforeEach(() => {
    page = new SusidFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Спілкуйтеся з вашими сусідами');
  });
});
