var base64 = require('./mocks/base64');

describe('Mapify Feature', function() {
  browser.ignoreSynchronization = true;

  var mapCanvas = element(by.className('mapCanvas'));
  var testButton = element(by.className('testButton'));
  var searchTerm = element(by.className('searchTerm'));
  var searchSubmit = element(by.className('searchSubmit'));
  var mapSearchTerm = element(by.className('mapSearchTerm'));



  beforeEach(function() {
    browser.get('http://localhost:3000');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Mapify');
  });

  it('has a map canvas', function() {
    expect(mapCanvas.isPresent()).toBeTruthy();
  });

  // it('draw map background on canvas is accurate', function() {
  //   browser.executeScript("return document.getElementsByTagName('canvas')[0].toDataURL()").then(function (result) {
  //       expect(result).toEqual(base64.mapBackground);
  //   });
  // });

  // it('plots tweets correctly', function() {
  //   testButton.click();
  //   browser.executeScript("return document.getElementsByTagName('canvas')[0].toDataURL()").then(function (result) {
  //       expect(result).toEqual(base64.plotBackground);
  //   });
  // });

  it('has a search bar', function() {
    expect(searchTerm.isDisplayed()).toBeTruthy();
  });

  it('displays #searchTerm in the map', function() {
    searchTerm.sendKeys('love');

    searchSubmit.click();

    var el = element(by.id('nextPage'));
    browser.driver.wait(protractor.until.elementIsVisible(el), 1000).then(function(){
        expect(mapSearchTerm.getText()).toEqual('#love');
    });

  });

});
