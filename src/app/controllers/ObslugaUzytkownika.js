import tpl from '../views/ObslugaUzytkownika.html';

class ObslugaUzytkownika {

  constructor($scope, $mdDialog, Uzytkownik, Notyfikacje) {

    this.uzytkownicy = [];
    var timeout = null;

    let wczytaj = () => {
      this.uzytkownicy = Uzytkownik.pobierz();
      $scope.$applyAsync();
      timeout = setTimeout(wczytaj, 5000);
    };
    wczytaj();

    //dodawanie/edytowanie pracowników
    let modyfikowanie = ($scope, $mdDialog, uzytkownik) => {
      if (typeof uzytkownik !== "undefined") {
        $scope.uzytkownik = Object.assign({}, uzytkownik);
        $scope.uzytkownik.haslo = '';
      } else {
        $scope.uzytkownik = {
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
        uzytkownik = $scope.uzytkownik;

        if (uzytkownik.id) {
          if (Uzytkownik.edytuj(uzytkownik)) {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Uzytkownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' został zapisany!');
          } else {
            Notyfikacje.powiadomienie('Uzytkownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' nie został zapisany!');
          }
        } else {
          if (Uzytkownik.nowy(uzytkownik)) {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Uzytkownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' został dodany!');
          } else {
            Notyfikacje.powiadomienie('Uzytkownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' nie został zapisany!');
          }
        }
      };
    };
    this.modyfikacja = function modyfikacja(uzytkownik) {
      $mdDialog.show({
        locals: {uzytkownik}, //strzykujemy aktualnie dodawanego/edytowanego sprzedawce
        controller: modyfikowanie
      });
    };

    //usuwanie pracowników
    this.usun = function usun(uzytkownik) {
      Notyfikacje.potwierdzenie('Czy chcesz usunąć sprzedawcę ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + '?', 'Tak', 'Nie')
          .then(function() {
            if (Uzytkownik.usun(uzytkownik)) {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Uzytkownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' został usunięty!');
            } else {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Uzytkownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' nie został usunięty!');
            }
          }, function() {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Uzytkownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' nie został usunięty!');
          });
    };

    this.$onDestroy = function() {
      clearTimeout(timeout);
      timeout = null;
    };
  }
}

export const obslugauzytkownika = {
  template: tpl,
  controller: ObslugaUzytkownika
};
