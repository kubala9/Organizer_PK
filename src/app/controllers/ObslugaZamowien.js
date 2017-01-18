import angular from 'angular';
import tpl from '../views/ObslugaZamowien.html';
import formularz from '../views/_formularzZamowienie.html';
import formularz2 from '../views/_formularzKoszyk.html';

class ObslugaZamowien {
 
  constructor($rootScope, $scope, $mdDialog, Notyfikacje, Produkt, Sprzedaz) {
      var self = this;

      this.produkty = Produkt.pobierz(true);
      this.koszyk = [];

      //dodawanie rzeczy do koszyka
      let dodawanie = ($scope, produkt, koszyk) => {
          $scope.produkt = produkt;
          $scope.ilosc = 1;

          $scope.save = () => {
              koszyk.push({
                  id: produkt.id,
                  ilosc: $scope.ilosc
              });

              Notyfikacje.zamknij();
              Notyfikacje.powiadomienie('Produkt dodany do koszyka.');
          };

          $scope.closeDialog = () => {
              Notyfikacje.zamknij();
          };
      };

      let sprawdzKoszyk = ($scope, koszyk) => {
          var copy = angular.copy(koszyk);
          $scope.koszyk = copy.map(item => {
              return {
                  id: item.id,
                  ilosc: item.ilosc,
                  object: Produkt.getProdukt(item.id),
                  wartosc: Produkt.getCena(item.id, true) * item.ilosc
              };
          });

          $scope.$watch('koszyk', () => {
              var sumaZl = 0;
              var sumaSzt = 0;
              $scope.koszyk.forEach(produkt => {
                  sumaZl += produkt.wartosc;
                    sumaSzt += parseInt(produkt.ilosc, 10);
                });
              $scope.sumaSzt = sumaSzt;
              $scope.sumaZl = sumaZl;
          }, true);

          $scope.usunProdukt = produkt => {
              var i = $scope.koszyk.indexOf(produkt);

              koszyk.splice(i, 1);
              $scope.koszyk.splice(i, 1);
          };

          $scope.save = () => {
              var sprzedaz = Sprzedaz.getPusty();

              sprzedaz.produkty = $scope.koszyk.map(item => {
                    return {
                        id: item.id,
                        ilosc: item.ilosc
                    };
              });

              sprzedaz.kupujacy = $rootScope.zalogowany.id;

              if (Sprzedaz.nowy(sprzedaz)) {
                  sprzedaz.produkty.forEach(produkt => {
                      Produkt.sprzedaj(produkt.id, produkt.ilosc);
                    });

                  koszyk = [];
                  $scope.koszyk = [];

                  Notyfikacje.zamknij();
                  Notyfikacje.powiadomienie('Zamówienie zostało przekazane do realizacji.');

              } else {
                  Notyfikacje.powiadomienie('Zamówienie nie zostało przekazane do realizacji!');
              }
          };

          $scope.closeDialog = () => {
              Notyfikacje.zamknij();
          };
      };

      this.dodajDoKoszyka = function dodajDoKoszyka(produkt) {
          $mdDialog.show({
              template: formularz,
              locals: {produkt, koszyk: self.koszyk},
              controller: dodawanie
          });
      };

      this.pokazKoszyk = () => {
          $mdDialog.show({
              template: formularz2,
              locals: {koszyk: self.koszyk},
              controller: sprawdzKoszyk
          });
      };
  }
}
export const obslugazamowien = {
  template: tpl,
  controller: ObslugaZamowien
};
