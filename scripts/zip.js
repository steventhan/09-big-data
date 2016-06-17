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
      });

      Zip.allZipWithCoordinates = Zip.allZip.reduce(function (acc, cur, indx, array) {
        cur.coordinates = data.features[indx].geometry.coordinates;
        acc.push(cur);
        return acc;
      }, []);

      Zip.allZipWithRedundanciesRemoved = Zip.allZipWithCoordinates.map(function (zip) {
        return {
          "zip" : zip.zip,
          "address" : zip.address,
          "neighborhood" : zip.neighborhood,
          "coordinates" : zip.coordinates
        }
      });

      Zip.allZipWithMultipleNeighborhoodsEliminated = Zip.allZipWithRedundanciesRemoved.reduce(function (acc, cur, indx, array){
        cur.neighborhood = cur.neighborhood.split(', ')[0];
        acc.push(cur);
        return acc;
      }, []);

      Zip.allNeighborhoods = Zip.allZip.reduce(function(acc, cur, indx, array) {
        if(cur.neighborhood.split(', ').length >= 2) {
          acc = acc.concat(cur.neighborhood.split(', '));
        } else {
          acc.push(cur.neighborhood);
        }
        return acc;
      }, []).reduce(function (acc, cur, indx, array) {
        if(!acc.includes(cur)) {
          acc.push(cur);
        }
        return acc;
      }, []);

      Zip.neighborhoodDensity = Zip.allNeighborhoods.map(function (neighborhood) {
        return {
          "neighborhood" : neighborhood,
          "occurences" : Zip.allZip.filter(function (zip) {
            return zip.neighborhood.split(', ').includes(neighborhood);
          }).length
        }
      }).sort(function (a, b) {
        return b.occurences - a.occurences;
      }).splice(0, 5);
    });
  };

  Zip.fetchAll();
  module.Zip = Zip;
})(window);
