import tpl from '../views/ObslugaUzytkownika.html';
import form from '../views/_formularzUzytkownika.html';
import pokazZadania from '../views/_zadaniaUzytkownika.html';

class ObslugaUzytkownika {

  constructor($rootScope, $scope, $mdDialog, Projekt, Uzytkownik, Notyfikacje, Zadania) {

    this.uzytkownicy = [];
    var timeout = null;
    let wczytaj = () => {
        this.uzytkownicy = Uzytkownik.pobierz();
        $scope.$applyAsync();
        timeout = setTimeout(wczytaj, 1000);
    };
    wczytaj();

    //dodawanie/edytowanie pracowników
    let modyfikowanie = ($scope, $mdDialog, uzytkownik) => {
      if (typeof uzytkownik !== "undefined") {
        $scope.uzytkownik = Object.assign({}, uzytkownik);
        $scope.uzytkownik.haslo = '';
      } else {
        $scope.uzytkownik = {
            login: '',
            haslo: '',
            name: '',
            email: '',
            telefon: '',
            dane: ''
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
            Notyfikacje.powiadomienie('Pracwonik ' + uzytkownik.name + ' został zapisany!');
          } else {
            Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.name + ' nie został zapisany!');
          }
        } else {
          if (Uzytkownik.nowy(uzytkownik)) {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.name + ' został dodany!');
          } else {
            Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.name + ' nie został dodany!');
          }
        }
      };
    };
    this.modyfikacja = uzytkownik => {
      $mdDialog.show({
        template: form,
        locals: {uzytkownik}, 
        controller: modyfikowanie
      });
    };

    this.lista = uzytkownik => {
        let listazadan = Zadania.pobierzPerPracownik(uzytkownik.id);

        listazadan.map(i => {
            i.projekt = Projekt.getProjekt(i.id_projekt);
            return i;
        });

        $mdDialog.show({
            template: pokazZadania,
            locals: {zadania: listazadan, uzytkownik},
            controller: ($scope, zadania) => {
                $scope.uzytkownik = uzytkownik;
                $scope.zadania = zadania;

                $scope.closeDialog = () => {
                    Notyfikacje.zamknij();
                };


            }
        });
    };

    //usuwanie pracowników
    this.usun = uzytkownik => {
      Notyfikacje.potwierdzenie('Czy chcesz usunąć pracownika ' + uzytkownik.name + '?', 'Tak', 'Nie')
          .then(function() {
            if (Uzytkownik.usun(uzytkownik)) {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.name + ' został usunięty!');
            } else {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.name + ' nie został usunięty!');
            }
          }, function() {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Pracownik ' + uzytkownik.name + ' nie został usunięty!');
          });
    };

    this.$onDestroy = () => {
      clearTimeout(timeout);
      timeout = null;
    };
  }
}

export const obslugauzytkownika = {
  template: tpl,
  controller: ObslugaUzytkownika
};
