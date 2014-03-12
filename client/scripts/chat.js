/*global $, app */
/*exported chats */
var chats = {
  $chatContainer: '',
  $roomButtonContainer: ''
};
//chat ====================================================
chats.newChat = function(chat){
  var $chat = this.makeChat(chat);
  $chat.trigger('befriend');
  $chat.trigger('changeRoom');
  return $chat;
};

chats.makeChat = function(chat){
  //escaping
  chat.username = this.escape(chat.username);
  chat.roomname = this.escape(chat.roomname);
  chat.text = this.escape(chat.text);
  chat.updatedAt = this.escape(chat.updatedAt);

  //templating
  var $chat = $(
    '<div class="chat">' +
      '<div class="roomname" id="' + chat.roomname + '">' +
        chat.roomname +
      '</div>' +
      '<div class="username" id="' + chat.username + '">' +
        chat.username +
      '</div>' +
      '<div class="content">' +
        chat.text +
      '</div>' +
      '<div class="updatedAt">' +
        chat.updatedAt +
      '</div>' +
    '</div>'
  );

  //action listeners
  $chat.on('click', '.username', function(){
    $('.chat').trigger('befriend', chat.username);
  });

  $chat.on('click', '.roomname', function(){
    $('.chat').trigger('openRoom', chat.roomname);
  });

  //response handlers
  $chat.on('befriend', function(event, friend){
    if(friend === chat.username){
      $chat.addClass('friend');
    }
  });

  return $chat;
};

chats.escape = function(text){
  return $('<i></i>').text(text).html();
};
