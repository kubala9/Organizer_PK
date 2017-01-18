import angular from 'angular';

class Sprzedajacy {
    constructor($localStorage) {
        "ngInject";

        this.lista = [];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.sprzedajacy)) {
                this.lista = $localStorage.sprzedajacy;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.lista)) {
                $localStorage.sprzedajacy = this.lista;
            }
        };

        this.wczytaj();
    }



    nowy(sprzedawca) {
        if (this.lista.length === 0) {
            sprzedawca.id = 1;
        } else {
            sprzedawca.id = this.lista[this.lista.length - 1].id + 1;
        }

        this.lista.push(sprzedawca);
        this.zapisz();

        return true;
    }

    pobierz() {
        this.wczytaj();
        return this.lista;
    }

    edytuj(sprzedawca) {
        var i = this.lista.findIndex((element, index, array) => element.id === sprzedawca.id);

        if (i === -1) {
            return false;
        }

        this.lista[i] = sprzedawca;
        this.zapisz();

        return true;
    }

    usun(sprzedawca) {
        var i = this.lista.indexOf(sprzedawca);
        if (i === -1) {
            return false;
        }

        this.lista.splice(i, 1);
        this.zapisz();

        return true;
    }

    getSprzedawca(id) {
        var i = this.lista.filter(element => element.id === id)[0];

        return this.lista[i];
    }
}

export default Sprzedajacy;
