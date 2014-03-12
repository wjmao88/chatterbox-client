/* global $, tabs, roomButtons */
var app = {};
//config ==================================================
app.server = 'https://api.parse.com/1/classes/chatterbox';
//defaults ================================================
app.defaults = {};
app.defaults.roomname = 'Lobby';
app.defaults.roomChatLimit = 10;
//data ====================================================
app.username = 'Anonymous';
app.friends = {};
app.latestDate = new Date(0);
app.roomnames = {};

app.getQuery = function(){
  return {
    order: '-createdAt',
    where: {
    }
  };
};

//init ====================================================
app.init = function(){
  app.$tabContainer = $('#tabs');
  app.$roomButtonContainer = $('#roomSelect');
  app.$myChatContainer = $('.send');
  app.fetch();
  app.addRoom(app.defaults.roomname);
};

//app state================================================
app.addRoom =  function(roomname){
  if(!app.roomnames[roomname]){
    roomButtons.newRoomButton(roomname, app.$roomButtonContainer);
    tabs.newTab(roomname, app.$tabContainer);
    app.roomnames[roomname] = true;
  }
};
//server ==================================================
app.send = function(text, roomname){
  var data = {
    username: $.parseParams(window.location.search).username,
    text: text,
    roomname: roomname
  };
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function(){
      console.log('success');
    },
    error: function(){
      console.error('chatterbox: failed to send Chat');
    }
  });
};

app.fetch = function(){
  $.ajax({
    url: app.server,
    type: 'GET',
    data: app.getQuery(),
    success: function(data){
      data.results.sort(function(a, b){
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      });
      var index = 0;
      while(index < data.results.length && data.results[index].updatedAt <= app.latestDate){
        index++;
      }
      data.results = data.results.slice(index);
      if (data.results.length > 0){
        $.each(data.results, function(i, chat){
          app.addRoom(chat.roomname);
        });
        $('.tab').trigger('newChats', [data.results]);
        app.latestDate = data.results[data.results.length-1].updatedAt;
      }
      //cycle fetch
      app.fetchTimeout = setTimeout(function(){
        app.fetch();
      }, 0);
    },
    error: function(data){
      console.error(data);
    }
  });
};

