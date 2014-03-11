/*global $, handlers, app */
/*exported chatMethods */
var chatMethods = {};

chatMethods.newChat = function(chat){
  var $chat = this.makeChat(chat);
  if (app.rooms.indexOf(chat.roomname) === -1){
    app.rooms.push(roomname);
    this.createRoomButton(chat.roomname);
  }

app.updateUser = function(username){
  // if username does not exist in current users array
  // push it to users array
  if (app.users.indexOf(username) === -1){
    app.users.push(username);
  }
};
  //apply room filter
  if (app.room !== app.defaults.roomname ){
    app.enterRoom($chat);
  }
  //apply friend filter
  $.each(app.friends, function(name){
    if (chat.username === name){
      app.befriend($chat);
    }
  });
  return $chat;
};

chatMethods.makeChat = function(chat){
  chat.username = this.escape(chat.username);
  chat.roomname = this.escape(chat.roomname);
  chat.text = this.escape(chat.text);
  chat.updatedAt = this.escape(chat.updatedAt);

  var $chat = $(
    '<div class="content">' +
    chat.text +
    '</div>' +
    '<div class="updatedAt">' +
    chat.updatedAt +
    '</div>'
  );

  var $username = $(
    '<div class="username" id="' + chat.username + '">' +
    chat.username +
    '</div>');
  var $roomname = $(
    '<div class="roomname" id="' + chat.roomname + '">' +
    chat.roomname +
    '</div>');

  //listeners
  $username.on('click', function(){
    handlers.addFriends(chat.username);
  });

  //assemble
  $chat.prepend($username);
  $chat.prepend($roomname);
  return $chat;
};

chatMethods.createRoomButton = function(roomname){
  $roomButton = $('<div class="roomButton">' + app.escape(roomname) + '</div>');
  $roomButton.on('click', function(){
    app.setRoom($(this).html());
  });
  return $roomButton;
};

chatMethods.

app.escape = function(text){
  return $('<i></i>').text(text).html();
};
