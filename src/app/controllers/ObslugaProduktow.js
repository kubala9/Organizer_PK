import tpl from '../views/ObslugaProduktow.html';
import formularz from '../views/_formularzProduktow.html';

class ObslugaProduktow {

  constructor($scope, $mdDialog, Produkt, Notyfikacje) {
    "ngInject";

    this.produkty = [];
    var timeout = null;

    let wczytaj = () => {
      this.produkty = Produkt.pobierz();
      $scope.$applyAsync();
      timeout = setTimeout(wczytaj, 5000);
    };
    wczytaj();


    //dodawanie/edytowanie produków
    let modyfikowanie = ($scope, $mdDialog, produkt) => {
      if (typeof produkt !== "undefined") {
        $scope.produkt = Object.assign({}, produkt);
      } else {
        $scope.produkt = {
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
        produkt = $scope.produkt;

        if (produkt.id) {
          if (Produkt.edytuj(produkt)) {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie(produkt.nazwa + ' został zapisany!');
          } else {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie(produkt.nazwa + ' nie został zapisany');
          }
        } else {
          if (Produkt.nowy(produkt)) {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie(produkt.nazwa + ' został dodany!');
          } else {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie(produkt.nazwa + ' nie został dodany!');
          }
        }
      };
    };
    this.modyfikacja = function modyfikacja(produkt) {
      $mdDialog.show({
        template: formularz,
        locals: {produkt}, //strzykujemy aktualnie dodawany/edytowany produkt
        controller: modyfikowanie
      });
    };

    //usuwanie produktow
    this.usun = function usun(produkt) {
      Notyfikacje.potwierdzenie('Czy chcesz usunąć ten produkt?', 'Tak', 'Nie')
          .then(function() {
            if (Produkt.usun(produkt)) {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Produkt został usunięty!');
            } else {
              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Produkt nie został usunięty!');
            }
          }, function() {
            Notyfikacje.zamknij();
            Notyfikacje.powiadomienie('Produkt nie został usunięty!');
          });
    };

    this.$onDestroy = function() {
      clearTimeout(timeout);
      timeout = null;
    };
  }
}

export const obslugaproduktow = {
  template: tpl,
  controller: ObslugaProduktow
};
