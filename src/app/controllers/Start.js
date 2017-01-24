import angular from 'angular';
import tpl from '../views/Start.html';

class Start {
  constructor($rootScope, $scope, $state, Notyfikacje, Uzytkownik) {
    "ngInject";

    this.uzytkownik = Uzytkownik.pobierzWszystkich();

    $scope.logujUzytkownik = {
      login: '',
      haslo: ''
    };
    this.logujJakoUzytkownik = () => {
      var login = $scope.logujUzytkownik.login;
      var haslo = $scope.logujUzytkownik.haslo;

      var user = this.uzytkownik.filter(item => item.login === login && item.haslo === haslo);
      console.log(user[0]);

      if (user.length === 1) {
        Notyfikacje.powiadomienie('Zalogowałeś się.');

        console.log(user);
        $rootScope.zalogowany = user[0];
        $rootScope.zalogowany.uzytkownik = 1;

        if (user[0].id_manager === null) {
          $rootScope.zalogowany.manager = 1;
          $state.go('organizer.projekt');
        } else {
          $rootScope.zalogowany.manager = 0;
          $state.go('organizer.moje-zadania');
        }

      } else {
        Notyfikacje.powiadomienie('Błąd logowania.');
      }
    };

      
    var rejestrujUzytkownik = {
      name: '',
      email: '',
      login: '',
      haslo: '',
      id_manager: null
    };
    $scope.rejestrujUzytkownik = angular.copy(rejestrujUzytkownik);
    this.rejestrujJakoUzytkownik = () => {
      var login = $scope.rejestrujUzytkownik.login;
      var user = this.uzytkownik.filter(item => item.login === login);

      if (user.length !== 0) {
        Notyfikacje.powiadomienie('Użytkownik o takim loginie już istnieje');
      } else {

        if (Uzytkownik.nowy($scope.rejestrujUzytkownik, 1)) {
          $scope.logujUzytkownik.login = $scope.rejestrujUzytkownik.login;
          $scope.rejestrujUzytkownik = rejestrujUzytkownik;
          $scope.signupUzytkownik.$setPristine();
          $scope.signupUzytkownik.$setUntouched();

          Notyfikacje.powiadomienie('Zostałeś zarejestrowany, możesz się zalogować');
        }
      }
    };
  }
  }

export const start = {
  template: tpl,
  controller: Start
};
