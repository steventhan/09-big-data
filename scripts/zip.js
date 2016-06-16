(function(module) {
  function Zip (opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  };

  

  Zip.fetchAll = function() {
    $.getJSON('/data/manhattan.json', function(data) {

    });
  };

  module.Zip = Zip;
})(window);
