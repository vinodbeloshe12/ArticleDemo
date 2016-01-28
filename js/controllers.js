angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.mySlides = [
    'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
    'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
    'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
    'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
  ];
})

.controller('headerctrl', function($scope, TemplateService) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $(window).scrollTop(0);
    });
  })
  .controller('AboutCtrl', function($scope, TemplateService, NavigationService, $http) {
    //Used to name the .html file
    function isSuccess(data) {
      console.log(data.data.queryresult);
      var data2 = _.chunk(data.data.queryresult, 12);
      console.log(data2);
      $scope.products = data2;
    }

    $http.get("http://accessworld.in/admin/index.php/json/getproductbycategory?category=37&pageno=1&color=&type=&material=&finish=&compatibledevice=&compatiblewith=&brand=&pricemin=&pricemax=&microphone=&size=&lenght=&voltage=&capacity=&maxrow=18").success(isSuccess);



    $scope.template = TemplateService.changecontent("about");
    $scope.menutitle = NavigationService.makeactive("About");
  })


.controller('AboutCtrl10', function($scope, TemplateService, NavigationService, $http) {
    function isSuccess(data) {
      console.log(data.data.queryresult);
      var data2 = _.chunk(data.data.queryresult, 6);
      console.log(data2);

      $scope.product = data2;

    }
    $http.get("http://accessworld.in/admin/index.php/json/getproductbycategory?category=37&pageno=1&color=&type=&material=&finish=&compatibledevice=&compatiblewith=&brand=&pricemin=&pricemax=&microphone=&size=&lenght=&voltage=&capacity=&maxrow=18").success(isSuccess);

    $scope.template = TemplateService.changecontent("about10");
    $scope.menutitle = NavigationService.makeactive("about10");
  })
  .controller('ArticleCtrl', function($scope, TemplateService, NavigationService, $http, $stateParams) {
    $scope.template = TemplateService.changecontent("getid");
    $scope.menutitle = NavigationService.makeactive("getid");
    $scope.taggss = [];
    NavigationService.getArticleDetail($stateParams.id, function(data) {

      console.log(data);
      $scope.articleDetail = data;
      //  $scope.taggss = $scope.articleDetail.tags.split(",");
      $scope.taggss = $scope.articleDetail.tags.split(",");
      console.log($scope.taggss);

    });
  })




.controller('TagCtrl', function($scope, TemplateService, NavigationService, $http) {
  $scope.template = TemplateService.changecontent("getalltags");
  $scope.menutitle = NavigationService.makeactive("getalltags");
  $scope.tags = [];


  // $scope.getalltags = function() {
    NavigationService.getalltags(function(data) {
      // $scope.pages =
      $scope.tags = data.queryresult;
      console.log($scope.tags);

    });
  // };
  // $scope.getalltags();

  $scope.getTagBySome = function(val) {
    NavigationService.getAllTags(val, function(data) {
      console.log(data);
      $scope.tagdetail = data.queryresult;
    });
  }

  $scope.getTagBySome('ANIMALS');

})


.controller('AllTagsCtrl', function($scope, TemplateService, NavigationService, $http, $stateParams) {
  $scope.template = TemplateService.changecontent("alltags");
  $scope.menutitle = NavigationService.makeactive("alltags");

  $scope.alltags = $stateParams.tag;
  NavigationService.getAllTags($scope.alltags, function(data) {
    console.log(data);
    $scope.tagdetail = data.queryresult;
  });

})



.controller('ArticlegetallCtrl', function($scope, TemplateService, NavigationService, $http) {
  $scope.template = TemplateService.changecontent("getallarticles");
  $scope.menutitle = NavigationService.makeactive("getallarticles");
  $scope.articles = [];
  $scope.currentpg = {};
  $scope.currentpg.pageno = 1;

  $scope.pagess = function(pg) {
    $scope.currentpg.pageno = pg;
    $scope.getAllArticles();

  };

  $scope.getAllArticles = function() {
    NavigationService.getAllArticle($scope.currentpg, function(data) {
      $scope.pages = [];
      console.log(data);
      $scope.articles = data.queryresult;
      console.log($scope.articles);
      for (var i = 0; i < data.lastpage; i++) {
        if ((i + 1) == data.pageno) {
          $scope.pages.push({
            "pageno": (i + 1),
            "class": "pg pgcol"
          });
        } else {
          $scope.pages.push({
            "pageno": (i + 1),
            "class": "pg"
          });
        }
      }

    });
  };
  $scope.getAllArticles();
})







.controller('ArticlesearchCtrl', function($scope, TemplateService, NavigationService, $http) {
  $scope.template = TemplateService.changecontent("searcharticle");
  $scope.menutitle = NavigationService.makeactive("searcharticle");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.enterarray = [];
  $scope.enter = function() {
    $scope.enterarray.push({
      text: $scope.abc
    });
    $scope.abc = '';
  };
  $scope.getSearchArticles = function(data) {
    NavigationService.getSearchArticles(data, function(data) {
      console.log(data);
      $scope.tags = data.queryresult;
    });
  };

})



.controller('ProductCtrlInside', function($scope, TemplateService, NavigationService, $http, $stateParams) {
    //Used to name the .html file
    var id = $stateParams.id;

    function isSuccess(data) {
      console.log(data);
      $scope.product = data;
    }

    $http.get("http://accessworld.in/admin/index.php/json/getproductdetails?id=" + id).success(isSuccess);



    $scope.template = TemplateService.changecontent("product");
    $scope.menutitle = NavigationService.makeactive("product");
  })
  .controller('democtrl', function($scope, TemplateService, NavigationService) {
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.template = TemplateService.changecontent("demo");
    $scope.menutitle = NavigationService.makeactive("demo");

  })
  .controller('productdata', function($scope, TemplateService, NavigationService, $http, $stateParams) {
    var id = $stateParams.id;

    function isSuccess(data) {
      console.log(data);
      $scope.pro = data;
    }

    $http.get("http://accessworld.in/admin/index.php/json/getproductdetails?id=" + id).success(isSuccess);

    $scope.template = TemplateService.changecontent("product10");
    $scope.menutitle = NavigationService.makeactive("product10");


  })
  .controller('toolCtrl', function($scope, TemplateService, NavigationService) {
    $scope.todoList = [{
      todoText: 'cleaning',
      done: false
    }];
    $scope.todoAdd = function() {
      $scope.todoList.push({
        todoText: $scope.inputdata,
        done: false
      });
      $scope.inputdata = "";
    };
    $scope.remove = function() {
      var oldList = $scope.todoList;
      $scope.todoList = [];
      angular.forEach(oldList, function(x) {
        if (!x.done) $scope.todoList.push(x);
      });
    };
    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todoList, function(x) {
        count += x.done ? 0 : 1;
      });
      return count;
    };




    $scope.template = TemplateService.changecontent("mytlist");
    $scope.menutitle = NavigationService.makeactive("mytlist");


  })
  .controller('FrndCtrl', function($scope, TemplateService, NavigationService) {
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.template = TemplateService.changecontent("friend");
    $scope.menutitle = NavigationService.makeactive("friend");
    $scope.rows = ['ram', 'abc', 'xyz'];
    //     $scope.addname="";
    // $scope.addrow=function(addname){
    //   var x=Document.getElementById(txt);
    //   $scope.x.rows.push(addname);
    // };


    $scope.addname = {};
    $scope.addname.name = "";
    $scope.addrow = function(name) {
      console.log(name);
      if (name) {
        $scope.rows.push(name);
      }
      // console.log($scope.rows);
      $scope.addname.name = "";
    };

    $scope.deleterow = function(index) {
      console.log(index);

      $scope.rows.splice(index, 1);

    };
    // $scope.deleteRow=function(tableID){
    // try {
    //            var rows = document.getElementById(tableID);
    //            var rowCount = rows.length;
    //
    //                 $scope.rows.splice(rowCount,1);
    //
    //
    //      }catch(e) {
    //          alert(e);
    //      }
    //  };
    $scope.gets = function(tab) {
      return tab.length > 1 ? 's' : '';
    };
  })


.controller("myNoteCtrl", function($scope, TemplateService, NavigationService, $timeout) {
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();


  $scope.text = "";
  $scope.remain = function() {
    return 100 - $scope.text.length;
  };
  $scope.clear = function() {
    $scope.text = "";
  };
  $scope.save = function() {
    alert("Note Saved");
  };
  $scope.template = TemplateService.changecontent("mynote");
  $scope.menutitle = NavigationService.makeactive("mynote");


});
