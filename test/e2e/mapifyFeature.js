var base64 = require('./mocks/base64');

describe('Mapify Feature', function() {
  browser.ignoreSynchronization = true;

  var mapCanvas = element(by.className('mapCanvas'));
  var testButton = element(by.className('testButton'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Mapify');
  });

  it('has a map canvas', function() {
    expect(mapCanvas.isPresent()).toBeTruthy();
  });

  it('draw map background on canvas is accurate', function() {
    browser.executeScript("return document.getElementsByTagName('canvas')[0].toDataURL()").then(function (result) {
        expect(result).toEqual(base64.mapBackground);
    });
  });

  it('plots tweets correctly', function() {
    testButton.click();
    browser.executeScript("return document.getElementsByTagName('canvas')[0].toDataURL()").then(function (result) {
        expect(result).toEqual(base64.plotBackground);
    });
  });


});