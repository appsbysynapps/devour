angular.module('starter.services', ['firebase'])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

.factory('Foods', function($firebase) {
  // Might use a resource here that returns a JSON array
  var ref = new Firebase("https://devour.firebaseio.com/foods");
  var sync = $firebase(ref);
  // download the data into a local object
  var syncObject = sync.$asObject();
  //syncObject.$bindTo($scope, "quizzes");

  return {
    all: function() {
      return sync.$asArray();
    },
    get: function(quizId) {
      var ref2 = new Firebase("https://devour.firebaseio.com/foods"+foodId);
      return $firebase(ref2).$asObject();
    },
    add: function(object) {
      sync.$push(object);
    },
  }
})

.factory('Restaurants', function($firebase) {
  // Might use a resource here that returns a JSON array
  var ref = new Firebase("https://devour.firebaseio.com/restaurants");
  var sync = $firebase(ref);
  // download the data into a local object
  var syncObject = sync.$asObject();
  //syncObject.$bindTo($scope, "quizzes");

  return {
    all: function() {
      return sync.$asArray();
    },
    get: function(quizId) {
      var ref2 = new Firebase("https://devour.firebaseio.com/foods"+foodId);
      return $firebase(ref2).$asObject();
    },
    add: function(object) {
      sync.$push(object);
    },
  }
})

.factory('Reviews', function($firebase) {
  // Might use a resource here that returns a JSON array
  var ref = new Firebase("https://devour.firebaseio.com/reviews");
  var sync = $firebase(ref);
  // download the data into a local object
  var syncObject = sync.$asObject();
  //syncObject.$bindTo($scope, "quizzes");

  return {
    all: function() {
      return sync.$asArray();
    },
    get: function(quizId) {
      var ref2 = new Firebase("https://devour.firebaseio.com/foods"+foodId);
      return $firebase(ref2).$asObject();
    },
    add: function(object) {
      sync.$push(object);
    },
  }
})

.factory("MyYelpAPI", function($http) {
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  return {
      "retrieveYelp": function(name, callback) {
          var method = 'GET';
          var url = 'http://api.yelp.com/v2/search';
          var params = {
                  callback: 'angular.callbacks._0',
                  location: '20009',
                  oauth_consumer_key: 'YXGa4ru-gTal2YshH1sA8A', //Consumer Key
                  oauth_token: 'gmiTY407KpN0U4qdU2ea9BgJTXvianPF', //Token
                  oauth_signature_method: "HMAC-SHA1",
                  oauth_timestamp: new Date().getTime(),
                  oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                  term: 'food'
              };
          var consumerSecret = 'bBHFOWAQyzK8JDTmBGnacSioY6c'; //Consumer Secret
          var tokenSecret = 'bR6DViXqQNm7Pu9JdUWxDWUWD2s'; //Token Secret
          var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
          params['oauth_signature'] = signature;
          $http.jsonp(url, {params: params}).success(callback);
      }
  }
})
.factory('restaurant', function() {
  return {}
})
/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
