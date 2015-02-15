angular.module('starter.controllers', [])

.controller('FoodCtrl', function($scope, Foods, MyYelpBusiness, IncrementTheShit) {
  $scope.Math = window.Math;
  $scope.foods = Foods.search;


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
    
.controller('DishNewReviewCtrl', function($scope, $stateParams, Foods, Reviews) {
    $scope.Math = window.math;
  $scope.review = {'content': "", 'rating': 0, 'foodId': $stateParams.dishId ,'restauratId': $stateParams.restaurantId}; 
    console.log("created");
  //console.log('peorpot' + $scope.dish);
  $scope.submitForm = function(){
      console.log("submitting");
      Reviews.add($scope.review).then(function(ref) {
        console.log(ref.key());
        $scope.key = ref.key();   // key for the new ly created record
          Foods.pushReview($stateParams.dishId,ref.key());
          var x = Foods.getReviews($stateParams.dishId);
          var totalRatings = Foods.getRating($stateParams.dishId);
          console.log("total"+totalRatings);
          Foods.updateTotal($stateParams.dishId,"total_rating",totalRatings+$scope.review.rating);  
          var newScore = totalRatings+$scope.review.rating;
          var x = Foods.getReviews($stateParams.dishId);
            x.$loaded().then(function(){
                length = x.length;
                console.log('Number of ratings: ' + length )
                var stars = Math.round(newScore/length);
                Foods.updateStars($stateParams.dishId, "stars", stars);
            });
          
        //Dish.addReview($scope.key, $stateParams.restaurantId);
        $scope.review = {
          'content': '',
        };
      }, function(error) {
        console.log("Error:", error);
    });
    
  };
})

/*
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
*/
.controller('FoodDetailCtrl', function(IncrementTheShit, $scope, $stateParams, MyYelpBusiness, Foods, Restaurants, Reviews) {
  $scope.Math = window.Math;
  $scope.foodTitle = Foods.getName($stateParams.foodId);
  $scope.total_rating = Foods.getRating($stateParams.foodId);
  $scope.num_reviews = Foods.getNumReviews($stateParams.foodId);
  MyYelpBusiness.retrieveYelp($stateParams.restaurantId, function(data){
    $scope.restaurant = data;
  }, IncrementTheShit.get());
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

  $scope.getRating = function(reviewId){
    return Reviews.getRating(reviewId.$value);
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
