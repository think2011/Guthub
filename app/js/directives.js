define(function (require) {
    var directives = angular.module('guthub.directives', []);

    directives.directive('butterbar', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.addClass('hide');
                $rootScope.$on('routeChangeStart', function () {
                   element.remove('hide');
                });
                $rootScope.$on('routeChangeSuccess', function () {
                    element.addClass('hide');
                })
            }
        }
    });

    directives.directive('focus', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element[0].focus();
            }
        }
    });


});