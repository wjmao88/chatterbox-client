//YOU DO NOT NEED TO EDIT this code.
if (!/(&|\?)username=/.test(window.location.search)) {
  var newSearch = window.location.search;
  if (newSearch !== '' & newSearch !== '?') {
    newSearch += '&';
  }
  window.chatterboxUsername = prompt('What is your name?') || 'anonymous'
  newSearch += 'username=' + window.chatterboxUsername;
  window.location.search = newSearch;
}
// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});

(function($) {
  var re = /([^&=]+)=?([^&]*)/g;
  var decode = function(str) {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  };
  $.parseParams = function(query) {
    var params = {}, e;
    if (query) {
      if (query.substr(0, 1) === '?') {
        query = query.substr(1);
      }

      while (e = re.exec(query)) {
        var k = decode(e[1]);
        var v = decode(e[2]);
        if (params[k] !== undefined) {
          if (!$.isArray(params[k])) {
            params[k] = [params[k]];
          }
          params[k].push(v);
        } else {
          params[k] = v;
        }
      }
    }
    return params;
  };
}($));
