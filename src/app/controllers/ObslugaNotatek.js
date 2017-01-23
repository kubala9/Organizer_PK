import tpl from '../views/ObslugaNotatek.html';
import podglad from '../views/_podgladNotatki.html';

class ObslugaNotatek {

    constructor($rootScope, $scope, $mdDialog, Notyfikacje, Notatki) {
        "ngInject";
        var self = this;
        this.lista = [];

        var timeout = null;  

        let wczytaj = () => {
            self.lista = Notatki.pobierz();
          //  console.log(Notatki.pobierz());
            $scope.$applyAsync();
            timeout = setTimeout(wczytaj, 5000);
        };
        wczytaj();
      
        
        let modyfikowanie = ($scope, $mdDialog, notatki) => {

            if (typeof notatki !== "undefined") {
                $scope.notatki = Object.assign({}, notatki);
                $scope.notatki.data = new Date($scope.notatki.data);
            } else {
                $scope.today = new Date();

                $scope.notatki = {
                     id: null,
                    tytul:'',
                    tresc: '',
                    data: $scope.today
                };
            }

            $scope.closeDialog = () => {
                Notyfikacje.zamknij();
            };

            $scope.save = () => {
                notatki = $scope.notatki;

                if (notatki.id) {
                    if (Notatki.edytuj(notatki)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(notatki.tytul + ' został zapisana!');
                    } else {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(notatki.tytul + ' nie został zapisana');
                    }
                } else {
                    if (Notatki.nowy(notatki)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(notatki.tytul + ' został dodana!');
                    } else {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(notatki.tytul + ' nie został dodana!');
                    }
                }
            };
        };

        this.modyfikacja = notatki => {
            $mdDialog.show({
                template: podglad,
                locals: {notatki},
                controller: modyfikowanie
            });
        };

        //usuwanie notatkiow
        this.usun = notatki => {
            Notyfikacje.potwierdzenie('Czy chcesz usunąć te notatki?', 'Tak', 'Nie')
                .then(function() {
                    if (Notatki.usun(notatki)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Notatka zostało usunięta!');
                    } else {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Notatka nie zostało usunięta!');
                    }
                }, function() {
                    Notyfikacje.zamknij();
                    Notyfikacje.powiadomienie('Notatka nie zostało usunięta!');
                });
        };

        this.$onDestroy = function() {
            clearTimeout(timeout);
            timeout = null;
        };
    }
}

export const obsluganotatek = {
    template: tpl,
    controller: ObslugaNotatek
};