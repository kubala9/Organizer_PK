import angular from 'angular';
import tpl from '../views/ObslugaSprzedaz.html';
import formularz from '../views/_formularzSprzedaz.html';

class ObslugaSprzedazy {

    constructor($rootScope, $scope, $mdDialog, Sprzedaz, Kupujacy, Sprzedajacy, Produkt, Notyfikacje) {
        var ctrl = this;
        this.sprzedaz = [];

        var timeout = null;
        let wczytaj = () => {
            this.sprzedaz = Sprzedaz.pobierz();
            $scope.$applyAsync();
            timeout = setTimeout(wczytaj, 5000);
        };
        wczytaj();

        this.kupujacy = Kupujacy.pobierz();
        this.sprzedajacy = Sprzedajacy.pobierz();
        this.produkty = Produkt.pobierz(true);

        //dodawanie/edytowanie pracowników
        let modyfikowanie = ($rootScope, $scope, sprzedaz, kupujacy, sprzedajacy, produkty) => {
            if (angular.isDefined(sprzedaz) && sprzedaz.id) {
                var copy = angular.copy(sprzedaz);

                copy.produkty = copy.produkty.map(produkt => {
                    return {
                        ilosc: produkt.ilosc,
                        object: Produkt.getProdukt(produkt.id)
                    };
                });

                if (!copy.sprzedajacy) {
                    copy.sprzedajacy = $rootScope.zalogowany.id;
                }
                $scope.sprzedaz = copy;
            } else {
                $scope.sprzedaz = Sprzedaz.getPusty();
                $scope.sprzedaz.sprzedajacy = $rootScope.zalogowany.id;
            }

            $scope.dodajProdukt = () => {
                $scope.sprzedaz.produkty.push({});
            };
            $scope.usunProdukt = produkt => {
                var i = $scope.sprzedaz.produkty.indexOf(produkt);
                if (i === -1) {
                    return false;
                }
                $scope.sprzedaz.produkty.splice(i, 1);
            };

            $scope.sprzedajacy = sprzedajacy;
            $scope.produkty = produkty;
            $scope.kupujacy = kupujacy;

            $scope.closeDialog = () => {
                Notyfikacje.zamknij();
            };

            $scope.getCena = (id, refundacja) => Produkt.getCena(id, refundacja);

            $scope.$watch('sprzedaz.produkty', function() {
                var sumaSzt = 0;
                var sumaZl = 0;

                $scope.sprzedaz.produkty.forEach(produkt => {
                    if (produkt.ilosc && produkt.object) {
                        sumaZl += parseFloat(produkt.ilosc * $scope.getCena(produkt.object.id, true), 10);
                    }
                    if (produkt.ilosc) {
                         sumaSzt += parseInt(produkt.ilosc, 10);
                    }
                });

                $scope.sumaSzt = sumaSzt;
                $scope.sumaZl = sumaZl;
            }, true);

            $scope.save = () => {
                sprzedaz = $scope.sprzedaz;

                sprzedaz.produkty = sprzedaz.produkty.map(item => {
                    return {
                        id: item.object.id,
                        ilosc: item.ilosc
                    };
                });

                if (sprzedaz.id) {
                    if (Sprzedaz.edytuj(sprzedaz)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Sprzedaż została zapisana!');
                    } else {
                        Notyfikacje.powiadomienie('Sprzedaż nie została zapisana!');
                    }
                } else {
                    if (Sprzedaz.nowy(sprzedaz)) {
                        sprzedaz.produkty.forEach(produkt => {
                            Produkt.sprzedaj(produkt.id, produkt.ilosc);
                        });

                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Sprzedaż została dodana!');
                    } else {
                        Notyfikacje.powiadomienie('Sprzedaż nie została zapisana!');
                    }
                }
            };
        };
        this.modyfikacja = function modyfikacja(sprzedaz) {
            $mdDialog.show({
                template: formularz,
                locals: {$rootScope, sprzedaz, kupujacy: ctrl.kupujacy, produkty: ctrl.produkty, sprzedajacy: ctrl.sprzedajacy},
                controller: modyfikowanie
            });
        };

        //usuwanie pracowników
        this.usun = function usun(sprzedaz) {
            Notyfikacje.potwierdzenie('Czy chcesz usunąć sprzedaż?', 'Tak', 'Nie')
                .then(function() {
                    if (Sprzedaz.usun(sprzedaz)) {
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
                    if (Sprzedaz.zrealizuj(id)) {
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
            let klient = Kupujacy.getKlient(id);
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

export const obslugasprzedazy = {
    template: tpl,
    controller: ObslugaSprzedazy
};