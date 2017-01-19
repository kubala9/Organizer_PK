import angular from 'angular';
import tpl from '../views/ObslugaNotatek.html';

class ObslugaNotatek {

    constructor($rootScope, $scope, $mdDialog, Notatki, Klient, Uzytkownik, Projekt, Notyfikacje) {
        var ctrl = this;
        this.notatka = [];

        var timeout = null;
        let wczytaj = () => {
            this.notatka = Notatki.pobierz();
            $scope.$applyAsync();
            timeout = setTimeout(wczytaj, 5000);
        };
        wczytaj();

        this.klient = Klient.pobierz();
        this.uzytkownik = Uzytkownik.pobierz();
        this.projekty = Projekt.pobierz(true);

        //dodawanie/edytowanie pracowników
        let modyfikowanie = ($rootScope, $scope, notatka, klient, uzytkownik, projekty) => {
            if (angular.isDefined(notatka) && notatka.id) {
                var copy = angular.copy(notatka);

                copy.projekty = copy.projekty.map(projekt => {
                    return {
                        ilosc: projekt.ilosc,
                        object: Projekt.getProjekt(projekt.id)
                    };
                });

                if (!copy.uzytkownik) {
                    copy.uzytkownik = $rootScope.zalogowany.id;
                }
                $scope.notatka = copy;
            } else {
                $scope.notatka = Notatki.getPusty();
                $scope.notatka.uzytkownik = $rootScope.zalogowany.id;
            }

            $scope.dodajProjekt = () => {
                $scope.notatka.projekty.push({});
            };
            $scope.usunProjekt = projekt => {
                var i = $scope.notatka.projekty.indexOf(projekt);
                if (i === -1) {
                    return false;
                }
                $scope.notatka.projekty.splice(i, 1);
            };

            $scope.uzytkownik = uzytkownik;
            $scope.projekty = projekty;
            $scope.klient = klient;

            $scope.closeDialog = () => {
                Notyfikacje.zamknij();
            };

            $scope.getCena = (id, refundacja) => Projekt.getCena(id, refundacja);

            $scope.$watch('notatka.projekty', function() {
                var sumaSzt = 0;
                var sumaZl = 0;

                $scope.notatka.projekty.forEach(projekt => {
                    if (projekt.ilosc && projekt.object) {
                        sumaZl += parseFloat(projekt.ilosc * $scope.getCena(projekt.object.id, true), 10);
                    }
                    if (projekt.ilosc) {
                         sumaSzt += parseInt(projekt.ilosc, 10);
                    }
                });

                $scope.sumaSzt = sumaSzt;
                $scope.sumaZl = sumaZl;
            }, true);

            $scope.save = () => {
                notatka = $scope.notatka;

                notatka.projekty = notatka.projekty.map(item => {
                    return {
                        id: item.object.id,
                        ilosc: item.ilosc
                    };
                });

                if (notatka.id) {
                    if (Notatki.edytuj(notatka)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Sprzedaż została zapisana!');
                    } else {
                        Notyfikacje.powiadomienie('Sprzedaż nie została zapisana!');
                    }
                } else {
                    if (Notatki.nowy(notatka)) {
                        notatka.projekty.forEach(projekt => {
                            Projekt.sprzedaj(projekt.id, projekt.ilosc);
                        });

                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Sprzedaż została dodana!');
                    } else {
                        Notyfikacje.powiadomienie('Sprzedaż nie została zapisana!');
                    }
                }
            };
        };
        this.modyfikacja = function modyfikacja(notatka) {
            $mdDialog.show({
                locals: {$rootScope, notatka, klient: ctrl.klient, projekty: ctrl.projekty, uzytkownik: ctrl.uzytkownik},
                controller: modyfikowanie
            });
        };

        //usuwanie pracowników
        this.usun = function usun(notatka) {
            Notyfikacje.potwierdzenie('Czy chcesz usunąć sprzedaż?', 'Tak', 'Nie')
                .then(function() {
                    if (Notatki.usun(notatka)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Sprzedaż została usunięta!');
                    } else {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Sprzedaż nie została usunięta!');
                    }
                }, function() {
                    Notyfikacje.zamknij();
                    Notyfikacje.powiadomienie('Sprzedaż nie została usunięta!');
                });
        };

        this.zrealizuj = id => {
            Notyfikacje.potwierdzenie('Czy zamówienie zostało zrealizowane?', 'Tak', 'Nie')
                .then(function() {
                    if (Notatki.zrealizuj(id)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Zamówienie zostało zrealizowane!');
                    } else {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Zamówienie nie zostało zrealizowane!');
                    }
                }, function() {
                    Notyfikacje.zamknij();
                    Notyfikacje.powiadomienie('Zamówienie nie zostało zrealizowane!');
                });
        };

        this.getKlient = id => {
            let klient = Klient.getKlient(id);
            return klient.imie + ' ' + klient.nazwisko;
        };

        $scope.filtrujZrealizowane = item => {
            if ($scope.niezrealizowane) {
                return item.zrealizowane !== 1;
            }
            return item;
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