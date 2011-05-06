HipmunkAirTrafficController = function(doc) {
  this.doc = doc;
  this.url = this.doc.location.href;
  this.tripClass = HipmunkTrip;
  this.driver = Hipmunk;
};
HipmunkAirTrafficController.prototype = new AirTrafficController();

HipmunkAirTrafficController.prototype.origin = function() {
  var match = this.url.match(/from=([^&]+)/);
  return match ? match[1].toUpperCase() : '';
};
HipmunkAirTrafficController.prototype.destination = function() {
  var match = this.url.match(/to=([^&]+)/);
  return match ? match[1].toUpperCase() : '';
};

HipmunkAirTrafficController.prototype.tripElements = function() {
  var resultTable = this.doc.getElementsByClassName('results-table')[0];
  return resultTable.getElementsByClassName('routing');
};

HipmunkAirTrafficController.prototype.clear = function() {
  this.discoverTrips();
  this.scoreTrips();
  this.rateTrips();
};

HipmunkAirTrafficController.prototype.updateViews = function(trip, rating) {
  trip.footprintView().updateRating(rating);
  trip.infoView().updateSearchAverage(HallOfFame.average(), trip);
  if(trip.embeddedInfoView())
    trip.embeddedInfoView().updateSearchAverage(HallOfFame.average(), trip);
  //trip.infoView().updateTripAverage(trip);  this is too difficult right now
};

HipmunkAirTrafficController.prototype.sniffPurchases = function() {
  var controller = this;
  this.eachTrip(function(trip) {
    $('', trip.tripElement).click(controller.events.purchase(this, trip));
  });
};