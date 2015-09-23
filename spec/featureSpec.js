describe('Mapify App', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './public';
    loadFixtures('index.html');
  });

  it('has a title', function() {
    expect($('title')).toContainText('Mapify')
  });



});