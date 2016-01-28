var adminurl = "http://localhost/mytest/index.php/json/";
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
  var navigation = [{
    name: "Home",
    classis: "active",
    link: "#/home",
    subnav: [{
      name: "Subnav1",
      classis: "active",
      link: "#/home"
    }]
  }];

  return {
        getAllArticle: function (currentpg,callback) {
        $http.get(adminurl + 'getallarticle?pageno='+currentpg.pageno).success(callback);
      },

      getalltags: function (callback) {
      $http.get(adminurl + 'getalltags').success(callback);
    },

      getArticleDetail: function (id,callback) {
      $http.get(adminurl + 'getsinglearticle?id='+id).success(callback);
    },
    getSearchArticles: function (tag,callback) {
    $http.get(adminurl + 'getarticlebytagname?tag='+tag).success(callback);
  },
  getAllTags: function (tag,callback) {
  $http.get(adminurl + 'getarticlebytagname?tag='+tag).success(callback);
},

    getnav: function() {
      return navigation;
    },
    makeactive: function(menuname) {
      for (var i = 0; i < navigation.length; i++) {
        if (navigation[i].name == menuname) {
          navigation[i].classis = "active";
        } else {
          navigation[i].classis = "";
        }
      }
      return menuname;
    },

  };

});
