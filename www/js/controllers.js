angular.module('starter.controllers', [])

.controller('FoodCtrl', function($scope, Foods) {
  $scope.foods = Foods.all();
})

.controller('RestaurantsCtrl', function($scope, MyYelpAPI, IncrementTheShit) {
  $scope.businesses = [];
  IncrementTheShit.addone();
  MyYelpAPI.retrieveYelp('', function(data) {
    $scope.businesses = data.businesses;
    console.log(data.businesses);
  }, IncrementTheShit.get());

})

.controller('RestaurantsDetailCtrl', function($scope, $stateParams, MyYelpBusiness, IncrementTheShit, Foods, Restaurants) {
  $scope.restaurantId = $stateParams.restaurantId;
  IncrementTheShit.addone();
  MyYelpBusiness.retrieveYelp($scope.restaurantId, function(data) {
    $scope.restaurant = data;
    $scope.restaurantDishes = Restaurants.getDishes($scope.restaurantId); //firebase restaurant
  }, IncrementTheShit.get());
  $scope.foods = Foods;
  $scope.active = 'best_dishes';
  $scope.setActive = function(type) {
      $scope.active = type;
  };
  $scope.isActive = function(type) {
      return type === $scope.active;
  };

  $scope.getName = function(object){
    console.log(object.$id);
    return 'baka';
  }

  //Foods.get('-JiAgIbx077TEtDYfICn')
})

.controller('RestaurantsDetailNewDishCtrl', function($scope, $stateParams, Foods, Restaurants) {
  $scope.dish = {'name': '', 'reviews': [], 'avg_rating': 0, 'restaurantId': $stateParams.restaurantId}; 
  console.log('peorpot' + $scope.dish);
  $scope.submitForm = function(){
    Foods.add($scope.dish).then(function(ref) {
        console.log(ref.key());
        $scope.key = ref.key();   // key for the new ly created record
        Restaurants.addDish($scope.key, $stateParams.restaurantId);
        $scope.dish = {
          'name': '',
        };
      }, function(error) {
        console.log("Error:", error);
    });
    
  };
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
