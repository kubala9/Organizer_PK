import angular from 'angular';

class Sprzedaz {
    constructor($localStorage) {
        "ngInject";

        this.lista = [];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.sprzedaz)) {
                this.lista = $localStorage.sprzedaz;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.lista)) {
                $localStorage.sprzedaz = this.lista;
            }
        };

        this.wczytaj();

        //@TODO defaultowe dane do firstRun
    }

    getPusty() {
        return {
            id: null,
            data: null,
            sprzedajacy: null,
            kupujacy: null,
            produkty: [
                {
                    id: null,
                    ilosc: 1
                }
            ],
            zrealizowane: null
        };
    }

    nowy(sprzedaz) {
        if (this.lista.length === 0) {
            sprzedaz.id = 1;
        } else {
            sprzedaz.id = this.lista[this.lista.length - 1].id + 1;
        }

        sprzedaz.data = new Date().getTime();
        this.lista.push(sprzedaz);
        this.zapisz();

        return true;
    }

    pobierz() {
        this.wczytaj();

        return this.lista;
    }

    edytuj(sprzedaz) {
        var i = this.lista.findIndex((element, index, array) => element.id === sprzedaz.id);

        if (i === -1) {
            return false;
        }

        sprzedaz.data = new Date().getTime();
        this.lista[i] = sprzedaz;
        this.zapisz();

        return true;
    }

    usun(sprzedaz) {
        var i = this.lista.indexOf(sprzedaz);
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

export default Sprzedaz;
