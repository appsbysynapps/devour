angular.module('starter.controllers', [])

.controller('FoodCtrl', function($scope, Foods) {
  $scope.foods = Foods.search;
    console.log('not anywhere');
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
  MyYelpBusiness.retrieveYelp($scope.restaurantId, function(data){
    $scope.restaurant = data;
  }, IncrementTheShit.get());
  $scope.restaurantDishes = Restaurants.getDishes($scope.restaurantId); //firebase restauran
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
  $scope.dish = {'name': '', 'reviews': [], 'avg_rating': 0, 'num_reviews':0, 'restaurantId': $stateParams.restaurantId}; 
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

.controller('DishNewReviewCtrl', function($scope, $stateParams, Foods, Restaurants) {
    console.log("new");
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


.controller('RestaurantsDetailWriteReviewCtrl', function($scope, $stateParams, Foods, Restaurants) {
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
.controller('FoodDetailCtrl', function($scope, $stateParams, Foods, Restaurants, Reviews) {
  $scope.Math = window.Math;
  $scope.foodTitle = Foods.getName($stateParams.foodId);
  $scope.total_rating = Foods.getRating($stateParams.foodId);
  $scope.num_reviews = Foods.getNumReviews($stateParams.foodId);

  $scope.foodId = $stateParams.foodId;
  $scope.reviewIds = [];
  var x = Foods.getReviews($stateParams.foodId);
  x.$loaded().then(function(){
    $scope.reviewIds = x;
  });

  $scope.getText = function(reviewId){
    return Reviews.getText(reviewId);
  }

  $scope.avgScore = function(){
    return $scope.Math.round($scope.total_rating / $scope.reviewIds.length);
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
