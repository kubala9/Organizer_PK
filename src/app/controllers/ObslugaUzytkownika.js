import tpl from '../views/ObslugaUzytkownika.html';
import form from '../views/_formularzUzytkownika.html';
class ObslugaUzytkownika {

  constructor($scope, $mdDialog, Uzytkownik, Notyfikacje) {

    this.uzytkownicy = [];
    var timeout = null;

    let wczytaj = () => {
      this.uzytkownicy = Uzytkownik.pobierz();
        console.log(Uzytkownik.pobierz());
      $scope.$applyAsync();
      timeout = setTimeout(wczytaj, 5000);
    };
    wczytaj();

    //dodawanie/edytowanie pracowników
    let modyfikowanie = ($scope, $mdDialog, $rootScope, uzytkownik) => {
      if (typeof uzytkownik !== "undefined") {
        $scope.uzytkownik = Object.assign({}, uzytkownik);
        $scope.uzytkownik.haslo = '';
      } else {
        $scope.uzytkownik = {
            login: '',
            haslo: '',
            imie: '',
            nazwisko: '',
            email: '',
            telefon: '',
            dane: '',
            id_manager:  $rootScope.zalogowany.id
        };
      }

      $scope.closeDialog = () => {
        Notyfikacje.zamknij();
      };

      $scope.save = () => {
        uzytkownik = $scope.uzytkownik;

        if (uzytkownik.id) {
          if (Uzytkownik.edytuj(uzytkownik)) {
              uzytkownik.id_manager=$rootScope.zalogowany.id;
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Pracwonik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' został dodany!');
          } else {
            Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' nie został dodany!');
          }
        } else {
          if (Uzytkownik.nowy(uzytkownik)) {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' został dodany!');
          } else {
            Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' nie został dodany!');
          }
        }
      };
    };
    this.modyfikacja = function modyfikacja(uzytkownik) {
      $mdDialog.show({
          template: form,
        locals: {uzytkownik}, //strzykujemy aktualnie dodawanego/edytowanego sprzedawce
        controller: modyfikowanie
      });
    };

    //usuwanie pracowników
    this.usun = function usun(uzytkownik) {
      Notyfikacje.potwierdzenie('Czy chcesz usunąć pracownika ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + '?', 'Tak', 'Nie')
          .then(function() {
            if (Uzytkownik.usun(uzytkownik)) {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' został usunięty!');
            } else {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' nie został usunięty!');
            }
          }, function() {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.imie + ' ' + uzytkownik.nazwisko + ' nie został usunięty!');
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
