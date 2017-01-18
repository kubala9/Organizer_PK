export const menu = {
  template: require('./menu.html'),
  controller: ($rootScope, $scope, $state) => {
    "ngInject";

    $rootScope.$watch('currentNavItem', () => {
      $scope.currentNavItem = $rootScope.currentNavItem;
    }, true);

    $rootScope.$watch('zalogowany', () => {
      $scope.user = $rootScope.zalogowany;
    }, true);
  }
};
