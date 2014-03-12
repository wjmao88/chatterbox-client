/*global $, app, chats, myChat */
/*exported tabs */
var tabs = {};
//=========================================================
tabs.newTab = function(roomname, $tabContainer){
  var $tab = tabs.createTab(roomname);
  myChat.newPanel(app.$myChatContainer);
  $tabContainer.append($tab);
  $tab.hide();
};

tabs.createTab = function(roomname){
  var $tab = $(
    '<div class="tab">' +
      '<header>' +
        roomname +
        '<button class="closeTabButton">Close</button>' +
        '<textarea class="draft"></textarea>' +
        '<button class="submit">Submit</button>' +
      '</header>' +
    '</div>');
  var $header = $tab.find('header');

  $tab.on('click', '.closeTabButton', function(){
    $tab.hide();
  });

  $tab.on('newChats', function(event, newChats){
    $.each(newChats, function(index, newChat){
      if (  roomname === app.defaults.roomname ||
            roomname === newChat.roomname){
        $header.after(chats.newChat(newChat));
        if ($tab.children().length > app.defaults.roomChatLimit){
          $tab.find('.chat:last-child').remove();
        }
      }
    });//end each
  });

  $tab.on('openRoom', function(event, activeRoomname){
    if(activeRoomname === roomname){
      window.temp = $tab;
      $tab.show();
    }
  });

  $tab.on('closeRoom', function(event, activeRoomname){
    if(activeRoomname === roomname){
      $tab.hide();
    }
  });

  $tab.on('click', '.submit', function(){
    var $draft = $tab.find('.draft');
    app.send($draft.val(), roomname);
    $draft.val('');
  });

  return $tab;
};
