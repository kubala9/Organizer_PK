import tpl from '../views/ObslugaProjektu.html';
import form from '../views/_formularzProjekt.html';

class ObslugaProjektu {

  constructor($rootScope, $scope, $mdDialog, Projekt, Notyfikacje, Klient) {
    "ngInject";
    var self = this;
    this.projekty = [];
    this.klienci = Klient.pobierz();
    this.archiwum = 0;

    var timeout = null;

    let wczytaj = () => {
      self.projekty = Projekt.pobierz(this.archiwum);
      $scope.$applyAsync();
      timeout = setTimeout(wczytaj, 5000);
    };
    wczytaj();

    //dodawanie/edytowanie projektu
    let modyfikowanie = ($scope, $mdDialog, projekt, klienci) => {
      $scope.klienci = klienci;

      if (typeof projekt !== "undefined") {
        $scope.projekt = Object.assign({}, projekt);
        $scope.projekt.termin = new Date($scope.projekt.termin);
      } else {
        $scope.today = new Date();

        $scope.projekt = {
          nazwa: '',
          opis: null,
          klient: null,
          archiwum: 0,
          termin: null
        };
      }

      $scope.closeDialog = () => {
        Notyfikacje.zamknij();
      };

      $scope.save = () => {
        projekt = $scope.projekt;

        if (projekt.id) {
          if (Projekt.edytuj(projekt)) {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie(projekt.nazwa + ' został zapisany!');
          } else {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie(projekt.nazwa + ' nie został zapisany');
          }
        } else {
          if (Projekt.nowy(projekt)) {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie(projekt.nazwa + ' został dodany!');
          } else {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie(projekt.nazwa + ' nie został dodany!');
          }
        }
      };
    };

    this.aktywnyProjekt = $rootScope.aktywnyProjekt || self.projekty[0].id;

    this.ustawProjekt = projekt => {
      self.aktywnyProjekt = projekt.id;
      $rootScope.aktywnyProjekt = projekt.id;
    };

    this.pokazArchiwum = () => {
      self.archiwum = 1;
      wczytaj();
    };

    this.schowajArchiwum = () => {
      self.archiwum = 0;
      wczytaj();
    };

    this.modyfikacja = projekt => {
      $mdDialog.show({
        template: form,
        locals: {projekt, klienci: self.klienci},
        controller: modyfikowanie
      });
    };

    //usuwanie projektow
    this.usun = projekt => {
      Notyfikacje.potwierdzenie('Czy chcesz usunąć ten projekt?', 'Tak', 'Nie')
          .then(function() {
            if (Projekt.usun(projekt)) {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Projekt został usunięty!');
            } else {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Projekt nie został usunięty!');
            }
          }, function() {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Projekt nie został usunięty!');
          });
    };

    this.$onDestroy = function() {
      clearTimeout(timeout);
      timeout = null;
    };
  }
}

export const obslugaprojektu = {
  template: tpl,
  controller: ObslugaProjektu
};
