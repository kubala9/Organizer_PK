import tpl from '../views/ObslugaKupujacy.html';
import formularz from '../views/_formularzKupujacy.html';

class ObslugaKupujacy {
  
  constructor($scope, $mdDialog, Kupujacy, Notyfikacje) {
    "ngInject";
    this.kupujacy = [];
    var timeout = null;

    let wczytaj = () => {
      this.kupujacy = Kupujacy.pobierz();
      $scope.$applyAsync();
      timeout = setTimeout(wczytaj, 5000);
    };
    wczytaj();

    let modyfikowanie = ($scope, Notyfikacje, kupujacy) => {
      if (typeof kupujacy !== "undefined") {
        $scope.kupujacy = Object.assign({}, kupujacy);
        $scope.kupujacy.haslo = '';
        $scope.isNew = false;
      } else {
        $scope.kupujacy = {
          imie: '',
          nazwisko: '',
          pesel: '',
          haslo: '',
          email: '',
          telefon: '',
          adres: ''
        };
        $scope.isNew = true;
      }

      $scope.closeDialog = () => {
        Notyfikacje.zamknij();
      };

      $scope.save = () => {
        if ($scope.kupujacy.id) {
          Kupujacy.edytuj($scope.kupujacy);

          Notyfikacje.zamknij();
          Notyfikacje.powiadomienie('Klient została zapisany!');
        } else {
          Kupujacy.nowy($scope.kupujacy);

          Notyfikacje.zamknij();
          Notyfikacje.powiadomienie('Klient został dodany!');
        }
      };
    };

    this.modyfikacja = function modyfikacja(kupujacy) {
      $mdDialog.show({
        template: formularz,
        locals: {kupujacy}, //strzykujemy aktualnie dodawanego/edytowanego sprzedawce
        controller: modyfikowanie
      });
    };

    this.usun = function usun(kupujacy) {
      Notyfikacje.potwierdzenie('Czy chcesz usunąć klienta?', 'Tak', 'Nie')
          .then(function() {
            Kupujacy.usun(kupujacy);
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Klient został usunięty!');
          }, function() {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Klient nie został usunięty!');
          });
    };

    this.$onDestroy = function() {
      clearTimeout(timeout);
    };
  }
}

export const obslugakupujacy = {
  template: tpl,
  controller: ObslugaKupujacy
};
