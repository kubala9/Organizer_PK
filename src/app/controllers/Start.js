import angular from 'angular';
import tpl from '../views/Start.html';

class Start {
  constructor($rootScope, $scope, $state, Notyfikacje, Sprzedajacy, Kupujacy) {
    "ngInject";

    this.sprzedajacy = Sprzedajacy.pobierz();
    this.kupujacy = Kupujacy.pobierz();

    $scope.logujSprzedajacy = {
      pesel: '',
      haslo: ''
    };
    this.logujJakoSprzedajacy = () => {
      var pesel = $scope.logujSprzedajacy.pesel;
      var haslo = $scope.logujSprzedajacy.haslo;

      var user = this.sprzedajacy.filter(item => item.pesel === pesel && item.haslo === haslo);
      $rootScope.zalogowany = user[0];
      $rootScope.zalogowany.sprzedajacy = 1;

      Notyfikacje.powiadomienie('Zalogowałeś się jako sprzedający.');

      $state.go('apteka.sprzedajacy');
    };

    $scope.logujKupujacy = {
      email: '',
      haslo: ''
    };
    this.logujJakoKupujacy = () => {
      var email = $scope.logujKupujacy.email;
      var haslo = $scope.logujKupujacy.haslo;

      var user = this.kupujacy.filter(item => item.email === email && item.haslo === haslo);

      $rootScope.zalogowany = user[0];
      $rootScope.zalogowany.kupujacy = 1;

      Notyfikacje.powiadomienie('Zalogowałeś się jako kupujący.');

      $state.go('apteka.zamowienie');
    };


    var rejestrujKupujacy = {
      imie: '',
      nazwisko: '',
      pesel: '',
      email: '',
      telefon: '',
      adres: '',
      haslo: ''
    };
    $scope.rejestrujKupujacy = angular.copy(rejestrujKupujacy);
    this.rejestrujJakoKupujacy = () => {
      var email = $scope.rejestrujKupujacy.email;
      var user = this.kupujacy.filter(item => item.email === email);

      if (user.length !== 0) {
        Notyfikacje.powiadomienie('Ten adres e-mail, jest już zarejestrowany');
      } else {

        if (Kupujacy.nowy($scope.rejestrujKupujacy)) {
          $scope.logujKupujacy.email = $scope.rejestrujKupujacy.email;
          $scope.rejestrujKupujacy = rejestrujKupujacy;
          $scope.signupKupujacy.$setPristine();
          $scope.signupKupujacy.setUntouched();

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
