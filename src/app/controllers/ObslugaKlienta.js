import tpl from '../views/ObslugaKlienta.html';
import form from '../views/_formularzKlient.html';

class ObslugaKlienta {
  
  constructor($scope, $mdDialog, Klient, Notyfikacje) {
    "ngInject";
    this.klienci = [];
    var timeout = null;

    let wczytaj = () => {
      this.klienci = Klient.pobierz();
      $scope.$applyAsync();
      timeout = setTimeout(wczytaj, 3000);
    };
    wczytaj();

    let modyfikowanie = ($scope, Notyfikacje, klient) => {
      if (typeof klient !== "undefined") {
        $scope.klient = Object.assign({}, klient);
      } else {
        $scope.klient = {
          nazwa: '',
          email: '',
          telefon: '',
          adres: '',
          notatka: ''
        };
      }

      $scope.closeDialog = () => {
        Notyfikacje.zamknij();
      };

      $scope.save = () => {
        if ($scope.klient.id) {
          Klient.edytuj($scope.klient);

          Notyfikacje.zamknij();
          Notyfikacje.powiadomienie('Klient został zapisany!');
        } else {
          Klient.nowy($scope.klient);

          Notyfikacje.zamknij();
          Notyfikacje.powiadomienie('Klient został dodany!');
        }
      };
    };

    this.modyfikacja = function modyfikacja(klient) {
      $mdDialog.show({
        template: form,
        locals: {klient}, 
        controller: modyfikowanie
      });
    };

    this.usun = function usun(klient) {
      Notyfikacje.potwierdzenie('Czy chcesz usunąć klienta?', 'Tak', 'Nie')
          .then(function() {
            Klient.usun(klient);
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

export const obslugaklienta = {
  template: tpl,
  controller: ObslugaKlienta
};
