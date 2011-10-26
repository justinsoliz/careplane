require('../driver-examples');

describe('KayakUk', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var KayakUK = require('drivers/kayak-uk');

  var extension;

  beforeEach(function() {
    this.driverClass = KayakUK;
    extension = new JasmineExtension(document);
  });

  it('has a .driverName', function() {
    expect(KayakUK.driverName).toBe('KayakUK');
  });

  describe('.insertAttribution', function() {
    var kayak;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo.html');
      kayak = new KayakUK(extension);
      kayak.insertAttribution();
    });
    it('inserts a badge in the top area', function() {
      expect($('div#rightads .punchline')).toHaveText('Brighter Planet');
    });
    it('inserts a text attribution in the footer', function() {
      expect($('span.careplane-attribution-footer')).toHaveText(' · Emission estimates powered by Brighter Planet');
    });
  });

  itBehavesLikeA('polling Driver');
});
