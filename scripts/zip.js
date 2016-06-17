(function(module) {
  function Zip (opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  };

  Zip.allZip = [];

  Zip.fetchAll = function() {
    $.getJSON('/data/manhattan.json', function(data) {
      Zip.allZip = data.features.map(function (zip) {
        return zip.properties;
      }).reduce(function (acc, cur, indx, array) {
        cur.coordinates = data.features[indx].geometry.coordinates;
        acc.push(cur);
        return acc;
      }, []).map(function (zip) {
        return {
          "zip" : zip.zip,
          "address" : zip.address,
          "neighborhood" : zip.neighborhood,
          "coordinates" : zip.coordinates
        }
      }).reduce(function (acc, cur, indx, array){
        cur.neighborhood = cur.neighborhood.split(', ')[0];
        acc.push(cur);
        return acc;
      }, []);

    Zip.allNeighborhoods = Zip.allZip.map(function(zip) {
      return {
        "zip": zip.zip,
        "neighborhood": zip.neighborhood
      };
    })
    });
  };


  module.Zip = Zip;
})(window);
