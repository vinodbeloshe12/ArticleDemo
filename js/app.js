// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

    // for http request with session
    $httpProvider.defaults.withCredentials = true;

    $stateProvider

    .state('home', {
        url: "/home",
        templateUrl: "views/template.html",
        controller: 'HomeCtrl'
    })

    .state('about', {
        url: "/about",
        templateUrl: "views/template.html",
        controller: 'AboutCtrl'
    })
    .state('product', {
        url: "/product/:id",
        templateUrl: "views/template.html",
        controller: 'ProductCtrlInside'
    })
    .state('demo',{
      url: "/demo",
      templateUrl: "views/template.html",
      controller: 'democtrl'
    })
    .state('about10',{
      url: "/about10",
      templateUrl: "views/template.html",
      controller: 'AboutCtrl10'
    })
    .state('myNoteCtrl',{
      url: "/mynote",
      templateUrl: "views/template.html",
      controller: 'myNoteCtrl'
    })
    .state('ArticleCtrl',{
      url: "/getid/:id",
      templateUrl: "views/template.html",
      controller: 'ArticleCtrl'
    })
    .state('ArticlesearchCtrl',{
      url: "/searcharticle",
      templateUrl: "views/template.html",
      controller: 'ArticlesearchCtrl'
    })
    .state('AllTagsCtrl',{
      url: "/alltags/:tag",
      templateUrl: "views/template.html",
      controller: 'AllTagsCtrl'
    })

    .state('AllTagsCtrlsamepage',{
      url: "/getalltags/:tag",
      templateUrl: "views/template.html",
      controller: 'AllTagsCtrlsamepage'
    })


    .state('FrndCtrl',{
      url: "/friend",
      templateUrl: "views/template.html",
      controller: 'FrndCtrl'
    })
    .state('toolCtrl',{
      url: "/mytlist",
      templateUrl: "views/template.html",
      controller: 'toolCtrl'
    })
    .state('TagCtrl',{
      url: "/getalltags",
      templateUrl: "views/template.html",
      controller: 'TagCtrl'
    })


    .state('ArticlegetallCtrl',{
      url: "/getallarticles",
      templateUrl: "views/template.html",
      controller: 'ArticlegetallCtrl'
});
    $urlRouterProvider.otherwise("/getallarticles");



});


firstapp.filter('serverimage', function() {
  return function(input) {
    if (input) {
      return "http://localhost/mytest/uploads/" + input;
      // return  "http://wohlig.co.in/newfynx/uploads/" + input;
    } else {
      return "img/logo.png";
    }
  };
});

firstapp.directive('img', function($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            if(!attrs.noloading)
            {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function() {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            }
            else
            {
                $($element).addClass("doneLoading");
            }
        }
    };
});
