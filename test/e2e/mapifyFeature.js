describe('Mapify Feature', function() {

  browser.ignoreSynchronization = true;

  var mapCanvas = element(by.className('mapCanvas'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Mapify');
  });

  it('has a map canvas', function() {
    expect(mapCanvas.isPresent()).toBeTruthy();
  });

});