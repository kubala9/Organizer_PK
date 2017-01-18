import tpl from '../views/ObslugaSprzedajacy.html';
import formularz from '../views/_formularzSprzedajacy.html';

class ObslugaSprzedajacy {

  constructor($scope, $mdDialog, Sprzedajacy, Notyfikacje) {

    this.sprzedawcy = [];
    var timeout = null;

    let wczytaj = () => {
      this.sprzedawcy = Sprzedajacy.pobierz();
      $scope.$applyAsync();
      timeout = setTimeout(wczytaj, 5000);
    };
    wczytaj();

    //dodawanie/edytowanie pracowników
    let modyfikowanie = ($scope, $mdDialog, sprzedawca) => {
      if (typeof sprzedawca !== "undefined") {
        $scope.sprzedawca = Object.assign({}, sprzedawca);
        $scope.sprzedawca.haslo = '';
      } else {
        $scope.sprzedawca = {
          'imie': '',
          'nazwisko': '',
          'pesel': '',
          'haslo': ''
        };
      }

      $scope.closeDialog = () => {
        Notyfikacje.zamknij();
      };

      $scope.save = () => {
        sprzedawca = $scope.sprzedawca;

        if (sprzedawca.id) {
          if (Sprzedajacy.edytuj(sprzedawca)) {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' został zapisany!');
          } else {
            Notyfikacje.powiadomienie('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' nie został zapisany!');
          }
        } else {
          if (Sprzedajacy.nowy(sprzedawca)) {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' został dodany!');
          } else {
            Notyfikacje.powiadomienie('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' nie został zapisany!');
          }
        }
      };
    };
    this.modyfikacja = function modyfikacja(sprzedawca) {
      $mdDialog.show({
        template: formularz,
        locals: {sprzedawca}, //strzykujemy aktualnie dodawanego/edytowanego sprzedawce
        controller: modyfikowanie
      });
    };

    //usuwanie pracowników
    this.usun = function usun(sprzedawca) {
      Notyfikacje.potwierdzenie('Czy chcesz usunąć sprzedawcę ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + '?', 'Tak', 'Nie')
          .then(function() {
            if (Sprzedajacy.usun(sprzedawca)) {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' został usunięty!');
            } else {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' nie został usunięty!');
            }
          }, function() {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' nie został usunięty!');
          });
    };

    this.$onDestroy = function() {
      clearTimeout(timeout);
      timeout = null;
    };
  }
}

export const obslugasprzedajacy = {
  template: tpl,
  controller: ObslugaSprzedajacy
};
