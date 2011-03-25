describe('Orbitz', function() {
  describe('.insertAttribution', function() {
    beforeEach(function() {
      loadFixtures('orbitz_dtw_sfo.html');
      Orbitz.insertAttribution();
    });
    it('inserts a badge in the top area', function() {
      expect($('div#trogdor')).toContain('script[src$="badge.js"]');
    });
  });
  describe('.scoreFlights', function() {
    it('asks the OrbitzScoreKeeper to officiate each result', function() {
      loadFixtures('orbitz_dtw_sfo.html');
      Careplane.fetch = function(url, callback) {
        callback(JSON.stringify({ emission: 512.0 }));
      }
      Orbitz.scoreFlights(window.document);

      $('div.result').each(function(i, result) {
        expect($(result)).toContain('p.total-footprint');
        expect($(result).children('p.total-footprint').get(0).innerText).
          toMatch(/Total emissions: [\d,]+kg CO2e/);
      });
    });
  });
});

describe('OrbitzScoreKeeper', function() {
  var result, keeper;

  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo_result.html');
    result = $('.result').get(0);
    keeper = new OrbitzScoreKeeper(result);
  });

  describe('#officiate', function() {
    it('parses each flight and totals emissions', function() {
      Careplane.fetch = function(url, callback) {
        callback(JSON.stringify({ emission: 123.0 }));
      }
      keeper.officiate();
      expect($('.resultLeg .careplane-footprint').first()).toHaveText('123kg CO2e');
      expect($('.resultLeg .careplane-footprint').last()).toHaveText('123kg CO2e');
      expect($('.result .total-footprint')).toHaveText('Total emissions: 246kg CO2e');
    });
  });
  describe('#onEmissionsSuccess', function() {
    it('updates the specified resultLeg node with emissions', function() {
      var leg = $('.resultLeg').get(0);
      var func = keeper.onEmissionsSuccess(leg, keeper);
      func(123.0);
      expect($('.resultLeg p.careplane-footprint')).toHaveText('123kg CO2e');
    });
    it('updates the total emissions result when all emissions are finished', function() {
      var func = keeper.onEmissionsSuccess($('.resultLeg').get(0), keeper);
      func(123.0);
      func = keeper.onEmissionsSuccess($('.resultLeg').get(1), keeper);
      func(123.0);
      expect($('.result .total-footprint')).toHaveText('Total emissions: 246kg CO2e');
    });
  });
});

describe('OrbitzFlight', function() {
  describe('.parse', function() {
    it('parses an Orbitz leg', function() {
      loadFixtures('orbitz_dtw_sfo_result.html');
      var node = $('.resultLeg').get(0);

      var flight = OrbitzFlight.parse(node);
      expect(flight.origin).toBe('DTW');
      expect(flight.destination).toBe('SFO');
      expect(flight.airline).toBe('Delta Air Lines');
      expect(flight.aircraft).toBe('Boeing 737');
    });
  });
});