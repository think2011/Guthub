define(function(require, exports, module) {
    require('./directives');        // 指令
    require('angular-route/angular-route.min');     // 路由模块

    var app = angular.module('guthub', ['ngRoute', 'guthub.directives']);

    // 配置路由
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'listCtrl',
                templateUrl: 'views/list.html'
            })
            .when('/recipe/add', {
                controller: 'addCtrl',
                templateUrl: 'views/edit.html'
            })
            .when('/recipe/edit/:id', {
                controller: 'editCtrl',
                templateUrl: 'views/edit.html'
            })
            .when('/recipe/del/:id', {
                controller: 'delCtrl',
                templateUrl: 'views/list.html'
            })
            .when('/recipe/:id', {
                controller: 'viewCtrl',
                templateUrl: 'views/detail.html'
            })
            .otherwise({redirectTo: '/'});
    });

    /**
     * 列表控制器
     */
    app.controller('listCtrl', function ($scope, $http) {
        $http.get('recipes').success(function (data) {
            $scope.recipes = data;
        });

    });

    /**
     * 视图控制器
     */
    app.controller('viewCtrl', function ($scope, $http, $routeParams) {
        $http.get('recipe/'+ $routeParams.id).success(function (data) {
            $scope.recipe = data;
        });
    });

    /**
     * 新增控制器
     */
    app.controller('addCtrl', function ($scope, $http, $location) {
        // 材料model
        $scope.ingredients = [{
            amount: null,
            amountUnits: null,
            ingredientName: null
        }];

        // 菜谱model
        $scope.recipe = {
            title: null,
            desc: null,
            ingredients: $scope.ingredients,
            practice: null
        }

        // 新增材料
        $scope.ingredient_add = function () {
            var ingredient = {
                amount: null,
                amountUnits: null,
                ingredientName: null
            };
            $scope.ingredients.push(ingredient);
        };

        // 删除材料
        $scope.ingredient_del = function ($index) {
            $scope.recipe.ingredients.splice($index, 1);
        };

        // 保存菜谱
        $scope.recipe_save = function () {
            $http.post('recipe/add', $scope.recipe).success(function () {
                $location.path('/');
            });
        };
    });

    /**
     * 修改控制器
     */
    app.controller('editCtrl', function ($scope, $http, $routeParams, $location) {
        // 载入数据
        $http.get('recipe/'+ $routeParams.id).success(function (data) {
            $scope.temp = angular.copy(data);
            $scope.recipe = data;
            console.log(data)
        });

        // 删除材料
        $scope.ingredient_del = function ($index) {
            $scope.recipe.ingredients.splice($index, 1);
        };

        // 保存更改
        $scope.recipe_edit = function () {
            $http.post('recipe/edit/' + $routeParams.id, $scope.recipe).success(function () {
                $location.path('/');
            });
        };

    });

    /**
     * 删除控制器
     */
    app.controller('delCtrl', function ($scope, $http, $routeParams, $location) {
        // 发送数据
        $http.post('recipe/del/'+ $routeParams.id).success(function () {
            $location.path('/');
        });
    });

    angular.bootstrap(document, ['guthub']);
});