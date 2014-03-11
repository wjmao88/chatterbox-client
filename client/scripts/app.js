/* global $, _ */
var app = {};
//config ==================================================
app.server = 'https://api.parse.com/1/classes/chatterbox';
app.sel = {};
app.sel.chats = '#chats';
app.sel.roomButtons = '#roomSelect';
app.sel.draft = '#draft';
app.sel.submit = '.submit';
//defaults ================================================
app.defaults = {};
app.defaults.roomname = 'Display All Rooms'
//data ====================================================
app.username = 'Anonymous';
app.friends = [];
app.room = app.defaults.roomname;
app.users = [];
app.rooms = [];
app.chats = [];
app.latestTime = 0;
app.latestDate = new Date(0);

app.roomButton = $(app.defaults.roomname);

app.query = {
  order: '-createdAt',
  where: {
    updatedAt: {
      $gt: app.latestDate
    }
  }
};

//controller interface ====================================
app.init = function(){
  app.fetch(false);
  $(app.sel.submit).on('submit',function(){
    app.handleSubmit();
  });
  app.addRoom(app.defaults.roomname);
};

app.fetchCallback = function(data){
  //sort based on time
  data.results.sort(function(a, b){
    return a.updatedAt.getTime() - b.updatedAt.getTime();
  });

  //add chats
  $.each(data.results, function(item){
    app.addChat(item);
    app.latestDate = item.updatedAt;
  });

  //filter new chats by triggering the events
  //that was triggered previously
  app.chatFilter();

  //cycle fetch
  app.fetchTimeout = setTimeout(function(){
    app.fetch(false);
  }, 0);
};

app.clearChats = function(){
  app.chats.length = 0;
  $(app.sel.chats).empty();
};

app.addChat = function(msg){
  app.chats.push(msg);
  app.updateUser(msg.username);
  app.updateRoom(msg.roomname);
  app.updateChat(msg);
};

app.chatFilter = function($chat, msg){
  //room
  if (app.room !== app.defaults.roomname ){
    app.enterRoom($chat);
  }
  //friend
  $.each(app.friends,function(name){
    if (msg.username === name){
      app.befriend($chat);
    }
  });


};
//event handlers ==========================================
app.enterRoom = function($chat){

};

//=========================================================
app.setRoom = function(roomname){
  app.room = roomname;
  if (roomname === app.defaults.roomname){
    delete app.query.where.roomname;
  } else {
    app.query.where.roomname = roomname;
  }
  app.fetch(true);
};
//=========================================================
app.updateUser = function(username){
  // if username does not exist in current users array
  // push it to users array
  if (app.users.indexOf(username) === -1){
    app.users.push(username);
  }
};

app.updateRoom = function(roomname){
  if (app.rooms.indexOf(roomname) === -1){
    app.rooms.push(roomname);
    app.addRoom(roomname);
  }
};

app.addFriend = function(username){
  if (app.friends.indexOf(username) === -1){
    app.friends.push(username);
  }
};

//=========================================================
app.handleSubmit = function(){
  var draft = $(app.sel.draft);
  app.send({
    username: app.username,
    content: draft.text(),
    roomname: app.roomname
  });
  draft.text('');
};
//view ====================================================
app.addRoom = function(room){
  $(app.sel.roomButtons).append(app.createRoomButton(room));
};

app.updateChat = function(msg){
  $(app.sel.chats).prepend(app.createChat(msg));
};


//model ===================================================

//server ==================================================
app.send = function(msg){
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(msg),
    contentType: 'application/json',
    success: function(){
      console.log('success');
    },
    error: function(){
      console.error('chatterbox: failed to send Chat');
    }
  });
};

app.fetch = function(total){
  $.ajax({
    url: app.server,
    type: 'GET',
    data: app.query,
    success: function(data){
      app.fetchCallback(data, total);
    },
    error: function(data){
      console.log(data);
    }
  });
};

//helpers =================================================
app.escape = function(text){
  return $('<i></i>').text(text).html();
};
