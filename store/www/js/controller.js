app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: "template/newUser.html",
            controller: "registerCtrl"
        })
        .state('login', {
            url: '/login',
            templateUrl: "template/login.html",
            controller: "loginCtrl"
        })
        .state('main', {
            url: "/main",
            templateUrl: 'template/main.html',
            controller: 'mainCtrl'
        })
        .state('products', {
            url: '/products',
            templateUrl: 'template/products.html',
            controller: 'productsCtrl'
        })
        .state('product', {
            url: '/product',
            templateUrl: 'template/product.html',
            controller: 'productCtrl'
        })
        .state('order', {
            url: '/order',
            templateUrl: 'template/order.html',
            controller: 'orderCtrl'
        })
        .state('total', {
            url: '/total',
            templateUrl: 'template/total.html',
            controller: 'totalCtrl'
        })
    $urlRouterProvider.otherwise('/login');
})



app.controller('registerCtrl', function ($scope, $location) {
    $scope.newUser = function (user) {
        localStorage.setItem('users', JSON.stringify(user));
        $location.url('/login');
    }
});



app.controller('loginCtrl', function ($scope, $location) {
    $scope.getUser = function (user) {

        var users = JSON.parse(localStorage.getItem('users'));

        if (user.name == users.name && user.password == users.password) {
            $location.url('/main')
        } else {
            alert("Please insert Correct Username and Password..")
        }
    }

    $scope.register = function () {
        $location.url('/home')
    }
});




app.controller('mainCtrl', function ($scope, $location, $rootScope, productsFactory) {
    var productArray = productsFactory.getProducts().then(function (res) {
        $scope.products = res;
        $rootScope.allProducts = res;
    });

});


app.controller('productsCtrl', function ($scope, $location, $rootScope) {
    $scope.products = $rootScope.allProducts;
    $scope.productDetails = function (product) {
        $rootScope.product = product;
        $location.url('/product')
    }
});


app.controller('productCtrl', function ($scope, $rootScope) {
    $scope.product = $rootScope.product;
    $rootScope.select = $scope.product.name;
});


var orders = [];
var oldData = JSON.parse(localStorage.getItem('orders'))
for (var i = 0; i >= oldData.length; i++) {
    orders.push(oldData[i]);
}






app.controller('orderCtrl', function ($scope, $rootScope, $location, productsFactory, $ionicPlatform) {

    $scope.select = $rootScope.select;

    $scope.products = $rootScope.allProducts;

    $scope.flage = false;
    $scope.selected = function () {
        if ($scope.selectedMethod == "visa") {
            $scope.flage = true;
        }
    }
    $scope.addOrder = function (order) {



        //        $scope.new_order = {
        //            "product": $scope.select,
        //            "paymentType": $scope.selectedMethod
        //        }
        console.log(order)
        orders.push(order);

        localStorage.setItem('orders', JSON.stringify(orders));


        document.addEventListener('deviceready', function () {
            cordova.plugins.notification.local.schedule({
                id: 10,
                title: "Order confirm",
                text: "Your Order Added Success",

            });
        }, false);

        $location.url('/total')
    }

});

app.directive("limitTo", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function (e) {
                if (this.value.length == limit) {
                    e.preventDefault();
                }
            })
        }
    }
})



app.controller('totalCtrl', function ($scope, $location, $rootScope) {



    $scope.total = JSON.parse(localStorage.getItem("orders"))
    console.log($scope.total);



});
