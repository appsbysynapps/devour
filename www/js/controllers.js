angular.module('starter.controllers', [])

.controller('FoodCtrl', function($scope, Foods) {
  $scope.foods = Foods.all();
})

.controller('RestaurantsCtrl', function($scope, MyYelpAPI, IncrementTheShit) {
  $scope.businesses = [];
  console.log('hello');
  IncrementTheShit.addone();
  MyYelpAPI.retrieveYelp('', function(data) {
    $scope.businesses = data.businesses;
    console.log(data.businesses);
  }, IncrementTheShit.get());

})

.controller('RestaurantsDetailCtrl', function($scope, $stateParams, MyYelpBusiness, IncrementTheShit) {
  console.log('goodbye');
  $scope.restaurantId = $stateParams.restaurantId;
  $scope.restaurant = {};
  console.log('goodbye');
  IncrementTheShit.addone();
  MyYelpBusiness.retrieveYelp($scope.restaurantId, function(data) {
    console.log('eat me ddd');
    $scope.restaurant = data;
    console.log('eat me');
  }, IncrementTheShit.get());
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
