// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'firebase', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.food', {
    url: '/food',
    views: {
      'tab-food': {
        templateUrl: 'templates/tab-food.html',
        controller: 'FoodCtrl'
      }
    }
  })
  .state('tab.food-detail', {
    url: '/food/:restaurantId/:foodId',
    views: {
      'tab-food': {
        templateUrl: 'templates/food_detail.html',
        controller: 'FoodDetailCtrl'
      }
    }
  })
  .state('tab.food-add', {
    url: '/food/add',
    views: {
      'tab-food': {
        templateUrl: 'templates/tab-food-add.html',
        controller: 'FoodAddCtrl'
      }
    }
  })

  .state('tab.restaurants', {
    url: '/restaurants',
    views: {
      'tab-restaurants': {
        templateUrl: 'templates/tab-restaurants.html',
        controller: 'RestaurantsCtrl'
      }
    }
  })
  .state('tab.restaurants-detail', {
    url: '/restaurants/:restaurantId',
    views: {
      'tab-restaurants': {
        templateUrl: 'templates/restaurants-detail.html',
        controller: 'RestaurantsDetailCtrl'
      }
    }
  })
  .state('tab.restaurants-detail-newdish', {
    url: '/restaurants/:restaurantId/newDish',
    views: {
      'tab-restaurants': {
        templateUrl: 'templates/restaurants-newDish.html',
        controller: 'RestaurantsDetailNewDishCtrl'
      }
    }
  })
  .state('tab.restaurants-detail-writereview', {
    url: '/restaurants/:restaurantId/writeReview',
    views: {
      'tab-restaurants': {
        templateUrl: 'templates/restaurants-writeReview.html',
        controller: 'RestaurantsDetailWriteReviewCtrl'
      }
    }
  })
  .state('tab.food-newReview', {
    url: '/restaurants/:restaurantId/:dishId/newReview',
    views: {
      'tab-restaurants': {
        templateUrl: 'templates/dish-newReview.html',
        controller: 'DishNewReviewCtrl'
      }
    }
  })
  .state('tab.restaurants-foodDetail', {
    url: '/restaurants/:restaurantId/:foodId',
    views: {
      'tab-restaurants': {
        templateUrl: 'templates/food_detail.html',
        controller: 'FoodDetailCtrl'
      }
    }
  })
  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.add', {
    url: '/add',
    views: {
      'tab-add': {
        templateUrl: 'templates/tab-food-add.html',
        controller: 'FoodAddCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/food');

});
