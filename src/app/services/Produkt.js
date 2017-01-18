import angular from 'angular';

class Produkt {
    constructor($localStorage) {
        "ngInject";

        this.listaproduktow = [];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.produkt)) {
                this.listaproduktow = $localStorage.produkt;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.listaproduktow)) {
                $localStorage.produkt = this.listaproduktow;
            }
        };

        this.wczytaj();
    }

    nowy(produkt) {
        if (this.listaproduktow.length === 0) {
            produkt.id = 1;
        } else {
            produkt.id = this.listaproduktow[this.listaproduktow.length - 1].id + 1;
        }

        this.listaproduktow.push(produkt);
        this.zapisz();

        return true;
    }

    pobierz(dostepne) {
        this.wczytaj();

        if (angular.isDefined(dostepne)) {
            return this.listaproduktow.filter(produkt => produkt.stan !== 0);
        }
        return this.listaproduktow;
    }

    edytuj(produkt) {
        var i = this.listaproduktow.findIndex((element, index, array) => element.id === produkt.id);

        if (i === -1) {
            return false;
        }

        this.listaproduktow[i] = produkt;
        this.zapisz();

        return true;
    }

    usun(produkt) {
        var i = this.listaproduktow.indexOf(produkt);
        if (i === -1) {
            return false;
        }

        this.listaproduktow.splice(i, 1);
        this.zapisz();

        return true;
    }

    getProdukt(id) {
        var i = this.listaproduktow.findIndex((element, index, array) => element.id === id);
        if (i === -1) {
            return false;
        }

        return this.listaproduktow[i];
    }

    getCena(id, refundacja) {
        var i = this.listaproduktow.findIndex((element, index, array) => element.id === id);
        if (i === -1) {
            return 0;
        }

        var produkt = this.listaproduktow[i];
        var cena = produkt.cena;

        if (angular.isDefined(refundacja) && refundacja) {
            cena -= produkt.cena * (produkt.refundacja/100);
        }

        return cena;
    }

    sprzedaj(id, szt) {
        var i = this.listaproduktow.findIndex((element, index, array) => element.id === id);
        if (i === -1) {
            return false;
        }

        var produkt = this.listaproduktow[i];

        produkt.stan -= szt;

        return true;
    }
}

export default Produkt;
