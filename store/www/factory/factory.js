app.factory('productsFactory', function ($http, $q) {
    return {
        getProducts: function () {
            var deferred = $q.defer();
            $http({
                method: "GET",
                url: "store-products.json"
            }).success(function (response) {
                deferred.resolve(response);
            })
            return deferred.promise;
        }
    }
});
