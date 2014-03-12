/* exported templateEngine */
var templateEngine = {};
//=========================================================
templateEngine.parse = function(string, context){
  var html = '';
  var current = 0;
  while(true){
    var start = string.indexOf('{{', current);
    var end = string.indexOf('}}', start);
    if (start === -1){
      html += string.slice(current);
      break;
    }
    html += string.substring(current, start);
    html = templateEngine.evaluate(string.substring(start+2, end), context);
    current = end+2;
    if (current > string.length){
      break;
    }
  }
  return html;
};

templateEngine.evaluate = function(expression, context){
  eval.call(context, expression);
};

