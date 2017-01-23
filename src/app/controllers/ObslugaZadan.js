import tpl from '../views/ObslugaZadan.html';
import form from '../views/_formularzZadanie.html';

class ObslugaZadan {

    constructor($rootScope, $scope, $mdDialog, Notyfikacje, Zadania, Uzytkownik) {
        "ngInject";
        var self = this;
        this.zadania = [];
        this.uzytkownicy = Uzytkownik.pobierz();

        var timeout = null;  

        let wczytaj = () => {
            self.zadania = Zadania.pobierz($rootScope.aktywnyProjekt);
            $scope.$applyAsync();
            timeout = setTimeout(wczytaj, 5000);
        };
        wczytaj();

        $rootScope.$watch('aktywnyProjekt', () => {
            clearTimeout(timeout);
            timeout = null;
            wczytaj();
        }, true);

        this.getPracownik = id => {
            var pracownik = this.uzytkownicy.filter(i => i.id === id)[0];
            return pracownik.imie + pracownik.nazwisko;
        };

        this.zakonczZadanie = zadanie => {
            zadanie.zrealizowane = 1;
            //  @TODO...
        };


        //dodawanie/edytowanie produków
        let modyfikowanie = ($scope, $mdDialog, zadanie, uzytkownicy) => {
            $scope.uzytkownicy = uzytkownicy;

            if (typeof zadanie !== "undefined") {
                $scope.zadanie = Object.assign({}, zadanie);
                $scope.zadanie.termin = new Date($scope.zadanie.termin);
            } else {
                $scope.today = new Date();

                $scope.zadanie = {
                    nazwa: '',
                    opis: null,
                    uzytkownik: null,
                    termin: null,
                    zrealizowane: 0,
                    id_projekt: 0
                };
            }

            $scope.closeDialog = () => {
                Notyfikacje.zamknij();
            };

            $scope.save = () => {
                zadanie = $scope.zadanie;

                zadanie.id_projekt = $rootScope.aktywnyProjekt;

                if (zadanie.id) {
                    if (Zadania.edytuj(zadanie)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(zadanie.nazwa + ' zostało zapisane!');
                    } else {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(zadanie.nazwa + ' nie zostało zapisane');
                    }
                } else {
                    if (Zadania.nowy(zadanie)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(zadanie.nazwa + ' zostało dodane!');
                    } else {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie(zadanie.nazwa + ' nie zostało dodane!');
                    }
                }
            };
        };

        this.modyfikacja = zadanie => {
            $mdDialog.show({
                template: form,
                locals: {zadanie, uzytkownicy: self.uzytkownicy},
                controller: modyfikowanie
            });
        };

        //usuwanie zadanieow
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
