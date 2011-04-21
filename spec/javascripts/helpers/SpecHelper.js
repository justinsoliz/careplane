beforeEach(function() {
  this.addMatchers({
    toBeInstanceOf: function(klass) {
      return typeof this.actual == klass;
    }
  });
  Careplane.currentExtension = new TestExtension(window.document);
  Careplane.currentExtension.doc = window.document;
  HallOfFame.clear();
});

jasmine.exampleGroups = {};

jasmine.Env.prototype.itBehavesLikeA = function(subject) {
  var group = jasmine.exampleGroups[subject];
  if(group) {
    group.call(this);
  } else {
    jasmine.log('Missing example group "' + subject + '"');
  }
}

jasmine.Env.prototype.sharedExamplesFor = function(subject, suite) {
  jasmine.exampleGroups[subject] = suite;
}

var itBehavesLikeA = function(subject) {
  return jasmine.getEnv().itBehavesLikeA(subject);
}
var itBehavesLikeAn = itBehavesLikeA;

var sharedExamplesFor = function(subject, suite) {
  return jasmine.getEnv().sharedExamplesFor(subject, suite);
}
