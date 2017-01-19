export const header = {
  template: require('./header.html'),
  controller: ($rootScope, $scope, $state, Notyfikacje) => {
    "ngInject";

    $rootScope.$watch('zalogowany', () => {
      $scope.user = $rootScope.zalogowany;
    }, true);

    $scope.wyloguj = () => {
      $rootScope.zalogowany = {};
      $state.go('organizer.start');
      Notyfikacje.powiadomienie('Zostałeś wylogowany.');
    };
  }
};
