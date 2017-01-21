import tpl from '../views/ObslugaZadan.html';
import form from '../views/_formularzZadanie.html';

class ObslugaZadan {

    constructor($rootScope, $scope, $mdDialog, Notyfikacje, Zadania) {
        "ngInject";
        var self = this;
        this.zadania = [];

        var timeout = null;  

        let wczytaj = () => {
            self.zadania = Zadania.pobierz($rootScope.aktywnyProjekt);
            $scope.$applyAsync();
            timeout = setTimeout(wczytaj, 5000);
        };
        wczytaj();

        $rootScope.$watch('aktywnyProjekt', () => {
            wczytaj();
        }, true);

        //dodawanie/edytowanie produków
        let modyfikowanie = ($scope, $mdDialog, zadanie) => {

            if (typeof zadanie !== "undefined") {
                $scope.zadanie = Object.assign({}, zadanie);
                $scope.zadanie.termin = new Date($scope.zadanie.termin);
            } else {
                $scope.today = new Date();

                $scope.zadanie = {
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
                zadanie = $scope.zadanie;

                if (zadanie.id) {
                    if (Zadania.edytuj(zadanie)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(zadanie.nazwa + ' został zapisany!');
                    } else {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(zadanie.nazwa + ' nie został zapisany');
                    }
                } else {
                    if (Zadania.nowy(zadanie)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(zadanie.nazwa + ' został dodany!');
                    } else {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(zadanie.nazwa + ' nie został dodany!');
                    }
                }
            };
        };

        this.modyfikacja = zadanie => {
            $mdDialog.show({
                template: form,
                locals: {zadanie},
                controller: modyfikowanie
            });
        };

        //usuwanie zadan
        this.usun = zadanie => {
            Notyfikacje.potwierdzenie('Czy chcesz usunąć te zadanie?', 'Tak', 'Nie')
                .then(function() {
                    if (Zadania.usun(zadanie)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Zadanie zostało usunięte!');
                    } else {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Zadanie nie zostało usunięte!');
                    }
                }, function() {
                    Notyfikacje.zamknij();
                    Notyfikacje.powiadomienie('Zadanie nie zostało usunięte!');
                });
        };

        this.$onDestroy = function() {
            clearTimeout(timeout);
            timeout = null;
        };
    }
}

export const obslugazadan = {
    template: tpl,
    controller: ObslugaZadan
};
