(function() {
  "use strict";

  var templateFunction = function(data) {
    return searchTemplate.replace(templatePattern, function(match, p1) {
      var result = templateMiddleware(p1, data[p1], searchTemplate);
      return (result !== undefined) ? result : data[p1] || match;
    });
  };

  var templatePattern = /\{(.*?)\}/g;
  var searchTemplate = '<div><a href="{url}"><h3>{title}</h3></a><p>{tipoInmueble}</p><p>Precio: {precio}</p></div>';
  var templateMiddleware = function() {};

  var fuzzySearch = new function() {
    this.matches = function(t, e) {
      if (typeof t !== 'string' || typeof e !== 'string') return false;
      var queryLength = e.length;
      var stringLength = t.length;
      if (queryLength < stringLength) return false;
      if (queryLength === stringLength) return t === e;
      for (var i = 0, j = 0; i < stringLength; i++) {
        var charCode = t.charCodeAt(i);
        while (j < queryLength) {
          if (e.charCodeAt(j++) === charCode) continue;
          return false;
        }
      }
      return true;
    };
  };

  var strictSearch = new function() {
    this.matches = function(t, e) {
      if (!t) return false;
      if (typeof t !== 'string' || typeof e !== 'string') return false;
      t = t.trim().toLowerCase();
      e = e.trim().toLowerCase();
      return e.split(" ").filter(function(word) {
        return t.indexOf(word) >= 0;
      }).length === e.split(" ").length;
    };
  };

  function defaultSort() {
    return 0;
  }

  var dataArray = [];
  var options = {};
  var searchInput, resultsContainer;

  function isObject(obj) {
    return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Object]';
  }

  function addToResultsArray(data) {
    dataArray.push(data);
    return dataArray;
  }

  function searchInDataArray(array, query, searchStrategy, options) {
    return array.filter(function(item) {
      if (isExcluded(item, options.exclude)) return false;
      if (searchStrategy.matches(item.title, query)) return true;
      if (!isNaN(query) && item.precio.toString().includes(query)) return true;
      return false;
    });
  }

  function isExcluded(data, exclude) {
    var isExcluded = false;
    exclude = exclude || [];
    exclude.forEach(function(excludePattern) {
      if (new RegExp(data).test(excludePattern)) {
        isExcluded = true;
      }
    });
    return isExcluded;
  }

  function handleData(json) {
    if (isObject(json)) {
      addToResultsArray(json);
    } else if (Array.isArray(json)) {
      json.forEach(function(item) {
        if (isObject(item)) {
          addToResultsArray(item);
        }
      });
    }
  }

  function initialize(json) {
    handleData(json);
    searchInput.addEventListener("keyup", function(event) {
      if (!isIgnoredKey(event.which)) {
        clearResults();
        performSearch(event.target.value);
      }
    });
  }

  function clearResults() {
    resultsContainer.innerHTML = "";
  }

  function addResult(html) {
    resultsContainer.innerHTML += html;
  }

  function performSearch(query) {
    if (!query || query.length === 0) {
      return;
    }
    clearResults();
    var results = searchInDataArray(dataArray, query, options.searchStrategy, options).sort(options.sort);
    if (results.length === 0) {
      addResult(options.noResultsText);
    } else {
      results.forEach(function(result) {
        result.query = query;
        addResult(templateFunction(result));
      });
    }
  }

  function isIgnoredKey(keyCode) {
    return [13, 16, 20, 37, 38, 39, 40, 91].indexOf(keyCode) !== -1;
  }

  function throwError(message) {
    throw new Error("SimpleJekyllSearch --- " + message);
  }

  options.fuzzy = false;
  options.limit = 10;
  options.searchStrategy = options.fuzzy ? fuzzySearch : strictSearch;
  options.sort = defaultSort;

  window.SimpleJekyllSearch = function(params) {
    if (params) {
      if (!params.searchInput || !params.resultsContainer || !params.json) {
        throwError("Required options missing");
      }

      searchInput = params.searchInput;
      resultsContainer = params.resultsContainer;
      options.noResultsText = params.noResultsText || "Sin resultados. Busca con otra palabra";
      options.limit = params.limit || 10;
      options.fuzzy = params.fuzzy || false;
      options.sort = params.sort || defaultSort;
      options.searchStrategy = options.fuzzy ? fuzzySearch : strictSearch;

      if (typeof params.json === 'string') {
        loadJSON(params.json, function(err, json) {
          if (err) {
            throwError("Failed to get JSON");
          }
          handleData(json);
          initialize(json);
        });
      } else {
        handleData(params.json);
        initialize(params.json);
      }

      return {
        search: performSearch
      };
    }
  };

  function loadJSON(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          callback(null, data);
        } catch (e) {
          callback(e, null);
        }
      }
    };
    xhr.send();
  }
})();
