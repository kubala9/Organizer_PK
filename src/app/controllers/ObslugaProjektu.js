import tpl from '../views/ObslugaProjektu.html';

class ObslugaProjektow {

  constructor($scope, $mdDialog, Projekt, Notyfikacje) {
    "ngInject";

    this.projekty = [];
    var timeout = null;

    let wczytaj = () => {
      this.projekty = Projekt.pobierz();
      $scope.$applyAsync();
      timeout = setTimeout(wczytaj, 5000);
    };
    wczytaj();


    //dodawanie/edytowanie produków
    let modyfikowanie = ($scope, $mdDialog, projekt) => {
      if (typeof projekt !== "undefined") {
        $scope.projekt = Object.assign({}, projekt);
      } else {
        $scope.projekt = {
                nazwa: '',
                opis: '', 
                cena: '', 
                stan: 0,
                recepta: 0,
                refundacja: 0
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
    this.modyfikacja = function modyfikacja(projekt) {
      $mdDialog.show({
        locals: {projekt}, //strzykujemy aktualnie dodawany/edytowany projekt
        controller: modyfikowanie
      });
    };

    //usuwanie projektow
    this.usun = function usun(projekt) {
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

export const obslugaprojektow = {
  template: tpl,
  controller: ObslugaProjektow
};
