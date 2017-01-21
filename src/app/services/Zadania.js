import angular from 'angular';

class Zadania {
    constructor($localStorage) {
        "ngInject";

        this.lista = [];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.zadanie)) {
                this.lista = $localStorage.zadanie;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.lista)) {
                $localStorage.zadanie = this.lista;
            }
        };

        this.wczytaj();

        //@TODO defaultowe dane do firstRun
    }

    nowy(zadanie) {
        if (this.lista.length === 0) {
            zadanie.id = 1;
        } else {
            zadanie.id = this.lista[this.lista.length - 1].id + 1;
        }

        zadanie.data = new Date().getTime();
        this.lista.push(zadanie);
        this.zapisz();

        return true;
    }

    pobierz() {
        this.wczytaj();

        return this.lista;
    }

    edytuj(zadanie) {
        var i = this.lista.findIndex((element, index, array) => element.id === zadanie.id);

        if (i === -1) {
            return false;
        }

        zadanie.data = new Date().getTime();
        this.lista[i] = zadanie;
        this.zapisz();

        return true;
    }

    usun(zadanie) {
        var i = this.lista.indexOf(zadanie);
        if (i === -1) {
            return false;
        }

        this.lista.splice(i, 1);
        this.zapisz();

        return true;
    }

    zrealizuj(id) {
        var i = this.lista.findIndex((element, index, array) => element.id === id);
        console.log(i);
        if (i === -1) {
            return false;
        }

        this.lista[i].zrealizowane = 1;
        this.zapisz();

        return true;
    }
}

export default Zadania;
