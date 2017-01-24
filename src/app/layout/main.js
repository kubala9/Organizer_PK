import angular from 'angular';

class App {
  constructor($rootScope, $state) {
      "ngInject";

      if (!$rootScope.zalogowany || !$rootScope.zalogowany.id) {
          $state.go('organizer.start');
      }
  }
}

export const main = {
  template: require('./main.html'),
  controller: App
};
