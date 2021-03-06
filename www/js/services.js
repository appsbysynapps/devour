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

.factory('Foods', function($firebase, $filter) {
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
    getRating: function(foodId) {
      var ref2 = ref.child(foodId+"/total_rating");
      var str = 0;
      ref2.once("value", function(data) {
          str = data.val();
      });
        
      return str;
    },
    getReviews: function(foodId) {
      var ref2 = ref.child(foodId+"/reviews");
      var x = $firebase(ref2).$asArray();
      return x;
    },
    getNumReviews: function(foodId) {
      var ref2 = ref.child(foodId+"/num_reviews");
      var str = 0;
      ref2.once("value", function(data) {
          str = data.val();
      });
        
      return str;
    },
    getName: function(foodId) {
      var ref2 = ref.child(foodId+"/name");
      var str = ""
      ref2.once("value", function(data) {
          str = data.val();
      });
        
      return str;
    },
    search: function(query) {
        return $filter('filter')(sync.$asArray(),function(food) {
          return !query || !food.name || (food.name.toLowerCase()).indexOf(query.toLowerCase())>-1;
      });
    },
    
    add: function(object) {
      return sync.$push(object);
    },
    
    updateTotal: function(id,total_rating,value) {
      ref.child(id).update({total_rating:value});
    },
    updateStars: function(id,stars,value) {
        console.log("stars"+value);
      ref.child(id).update({stars:value});
    },
    pushReview: function(id,value) {
      ref.child(id).child("reviews").push(value);
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
    getDishes: function(restaurantId) {
      var ref2 = new Firebase("https://devour.firebaseio.com/restaurants/"+restaurantId+"/dishes");
      return $firebase(ref2).$asArray();
    },
    addDish: function(object, restaurantId) {
      var ref2 = new Firebase("https://devour.firebaseio.com/restaurants/"+restaurantId+"/dishes");
      $firebase(ref2).$set(object, true);
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
    getContent: function(reviewId) {
      var ref2 = ref.child(reviewId+"/content");
      var str = 0;
      ref2.once("value", function(data) {
          str = data.val();
      });
        
      return str;
    },
    getRating: function(reviewId) {
      var ref2 = ref.child(reviewId+"/rating");
      var rat = 0
      ref2.once("value", function(data) {
          rat = data.val();
      });
        
      return rat;
    },
    getText: function(reviewId) {
      var ref2 = ref.child(reviewId+"/content");
      var str = ""
      ref2.once("value", function(data) {
          str = data.val();
      });
      return str;
    },
    get: function(reviewId) {
      var ref2 = new Firebase("https://devour.firebaseio.com/reviews/"+reviewId);
      return $firebase(ref2).$asObject();
    },
    add: function(object) {
      return sync.$push(object);
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
      "retrieveYelp": function(name, callback, callbackint) {
          var method = 'GET';
          var url = 'http://api.yelp.com/v2/search';
          var params = {
                  callback: 'angular.callbacks._'+callbackint,
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
.factory("MyYelpBusiness", function($http) {
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  return {
      "retrieveYelp": function(name, callback, callbackint) {
          var method = 'GET';
          var request_url = 'http://api.yelp.com/v2/business/'+name;
          var parameters = {
                  oauth_consumer_key: 'YXGa4ru-gTal2YshH1sA8A', //Consumer Key
                  oauth_token: 'gmiTY407KpN0U4qdU2ea9BgJTXvianPF', //Token
                  oauth_signature_method: "HMAC-SHA1",
                  oauth_timestamp: new Date().getTime(),                  
                  oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
              };
          var consumerSecret = 'bBHFOWAQyzK8JDTmBGnacSioY6c'; //Consumer Secret
          var tokenSecret = 'bR6DViXqQNm7Pu9JdUWxDWUWD2s'; //Token Secret
          var signature = oauthSignature.generate(method, request_url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});
          parameters['oauth_signature'] = signature;
          var urlstring = 'http://api.yelp.com/v2/business/'+name+'?';
          for(var x in parameters){
            if (parameters.hasOwnProperty(x)) {
              urlstring+= x + '=' + parameters[x] + '&';
            }
          }
          urlstring = urlstring.substring(0, urlstring.length-1);
          $.jsonp({
            url: urlstring, // any JSON endpoint
            corsSupport: false, // if URL above supports CORS (optional)
            jsonpSupport: true, // if URL above supports JSONP (optional)
            data: parameters, 
            success: callback,
            error: function(data, boo, bah){
              console.log(data +' ' + boo+' '+bah);
              console.log(data);
            }
            // error, etc.
          });
          //$http({url: request_url, method: 'GET', params: parameters}).success(function(data, status, headers, config){return data}).error(function(data, boo){console.log(data, boo)});
      }
  }
})
.factory("IncrementTheShit", function($http) {
  var x = -1;
  return {
    addone: function() {
      x = (x+1)%10;
    },
    get: function() {
      console.log(x);
      return x;
    },
  }
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
