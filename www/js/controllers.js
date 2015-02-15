angular.module('starter.controllers', [])

.controller('FoodCtrl', function($scope, Foods) {
  $scope.foods = Foods.all();
})

.controller('RestaurantsCtrl', function($scope, MyYelpAPI) {
  $scope.businesses = [];
  MyYelpAPI.retrieveYelp('', function(data) {
    $scope.businesses = data.businesses;
  });

})

.controller('RestaurantsDetailCtrl', function($scope, $stateParams, MyYelpAPI) {
  $scope.restaurantId = $stateParams.restaurantId;
  $scope.restaurant = {};
  MyYelpAPI.retrieveYelp('', function(data) {
    $scope.restaurant = data.businesses[$scope.restaurantId];
  });

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

  $scope.food = {'reviews': [], 'avg_rating': 0}; 

  $scope.submitForm = function(){
    $scope.food.date = Firebase.ServerValue.TIMESTAMP;
    Foods.add($scope.food);
    $scope.food = {
      'name': '',
      'restaurant': ''
    };

  };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
