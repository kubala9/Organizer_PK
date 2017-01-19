import angular from 'angular';
import tpl from '../views/ObslugaZadan.html';

class ObslugaZadan {
 
  constructor($rootScope, $scope, $mdDialog, Notyfikacje, Produkt, Zadania) {
      var self = this;

      this.projekty = Produkt.pobierz(true);
      this.koszyk = [];

      //dodawanie rzeczy do koszyka
      let dodawanie = ($scope, projekt, koszyk) => {
          $scope.projekt = projekt;
          $scope.ilosc = 1;

          $scope.save = () => {
              koszyk.push({
                  id: projekt.id,
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
              $scope.koszyk.forEach(projekt => {
                  sumaZl += projekt.wartosc;
                    sumaSzt += parseInt(projekt.ilosc, 10);
                });
              $scope.sumaSzt = sumaSzt;
              $scope.sumaZl = sumaZl;
          }, true);

          $scope.usunProdukt = projekt => {
              var i = $scope.koszyk.indexOf(projekt);

              koszyk.splice(i, 1);
              $scope.koszyk.splice(i, 1);
          };

          $scope.save = () => {
              var zadanie = Zadania.getPusty();

              zadanie.projekty = $scope.koszyk.map(item => {
                    return {
                        id: item.id,
                        ilosc: item.ilosc
                    };
              });

              zadanie.kupujacy = $rootScope.zalogowany.id;

              if (Zadania.nowy(zadanie)) {
                  zadanie.projekty.forEach(projekt => {
                      Produkt.sprzedaj(projekt.id, projekt.ilosc);
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

      this.dodajDoKoszyka = function dodajDoKoszyka(projekt) {
          $mdDialog.show({
              locals: {projekt, koszyk: self.koszyk},
              controller: dodawanie
          });
      };

      this.pokazKoszyk = () => {
          $mdDialog.show({
              locals: {koszyk: self.koszyk},
              controller: sprawdzKoszyk
          });
      };
  }
}
export const obslugazadan = {
  template: tpl,
  controller: ObslugaZadan
};
