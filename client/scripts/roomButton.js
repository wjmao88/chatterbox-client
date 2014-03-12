/*global $ */
/*exported roomButtons */
var roomButtons = {};
roomButtons.newRoomButton = function(roomname, $roomButtonContainer){
  var $roomButton = this.createRoomButton(roomname);
  $roomButtonContainer.append($roomButton);
};

roomButtons.createRoomButton = function(roomname){
  roomname = this.escape(roomname);
  var $roomButton = $(
    '<div class="roomButton">' +
      roomname +
    '</div>');
  $roomButton.on('click', function(){
    console.log('clicked on ' + roomname);
    $('.tab').trigger('openRoom', roomname);
  });
  return $roomButton;
};

roomButtons.escape = function(text){
  return $('<i></i>').text(text).html();
};
