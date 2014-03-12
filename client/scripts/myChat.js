/* global $*/
/* exported myChat */
var myChat = {};
myChat.newPanel = function($myChatContainer){
  $myChatContainer.append(myChat.createDraft());
  $myChatContainer.append(myChat.createSubmitButton());
};

myChat.createDraft = function(){
  var $draft = $('<textarea class="draft"></textarea>');
  return $draft;
};

myChat.createSubmitButton = function(){
  var $submitButton = $('<button class="submit">Submit</button>');
  return $submitButton;
};
