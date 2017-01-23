import angular from 'angular';
import tpl from '../views/ObslugaMoichZadan.html';

class ObslugaMoichZadan {

    constructor($rootScope, $scope, $mdDialog, Notyfikacje, Zadania, Projekt) {
        "ngInject";
        var self = this;
        this.zadania = [];
        this.projekty = Projekt.pobierzWszystkie();
        var timeout = null;

        let wczytaj = () => {
            self.zadania = Zadania.pobierzPerPracownik($rootScope.zalogowany.id);
            $scope.$applyAsync();
            timeout = setTimeout(wczytaj, 1000);

        };
        wczytaj();

        this.getProjekt = id => {
            var projekt = this.projekty.filter(i => i.id === id)[0];
            return projekt.nazwa;
        };

        this.zakonczZadanie = zadanie => {
            if (Zadania.zrealizuj(zadanie.id)) {
                zadanie.zrealizowane = 1;
                Notyfikacje.zamknij();
                Notyfikacje.powiadomienie('Zadanie zostało zapisane jako zrealizowane!');
            } else {
                Notyfikacje.zamknij();
                Notyfikacje.powiadomienie('Akcja nie została zapisana!');
            }
        };

        this.$onDestroy = function() {
            clearTimeout(timeout);
            timeout = null;
        };
    }
}

export const obslugamoichzadan = {
    template: tpl,
    controller: ObslugaMoichZadan
};