angular.module('starter.controllers', [])

.controller('FoodCtrl', function($scope, Foods) {
  $scope.foods = Foods.all();
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('FoodAddCtrl', function($scope, Foods) {

  $scope.food = {}; 
  
  $scope.submitForm = function(){
    $scope.food.date = Firebase.ServerValue.TIMESTAMP;
    Foods.add($scope.food);
    $scope.food = {
      'name': '',
      'restaurant': '',
      'rating': 0,
      'review': '',
    };

  };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
