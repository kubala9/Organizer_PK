import angular from 'angular';

class Projekt {
    constructor($localStorage) {
        "ngInject";

        this.listaprojektow = [];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.projekt)) {
                this.listaprojektow = $localStorage.projekt;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.listaprojektow)) {
                $localStorage.projekt = this.listaprojektow;
            }
        };

        this.wczytaj();
    }

    nowy(projekt) {
        if (this.listaprojektow.length === 0) {
            projekt.id = 1;
        } else {
            projekt.id = this.listaprojektow[this.listaprojektow.length - 1].id + 1;
        }

        this.listaprojektow.push(projekt);
        this.zapisz();

        return true;
    }

    pobierz(dostepne) {
        this.wczytaj();

        if (angular.isDefined(dostepne)) {
            return this.listaprojektow.filter(projekt => projekt.stan !== 0);
        }
        return this.listaprojektow;
    }

    edytuj(projekt) {
        var i = this.listaprojektow.findIndex((element, index, array) => element.id === projekt.id);

        if (i === -1) {
            return false;
        }

        this.listaprojektow[i] = projekt;
        this.zapisz();

        return true;
    }

    usun(projekt) {
        var i = this.listaprojektow.indexOf(projekt);
        if (i === -1) {
            return false;
        }

        this.listaprojektow.splice(i, 1);
        this.zapisz();

        return true;
    }

    getProjekt(id) {
        var i = this.listaprojektow.findIndex((element, index, array) => element.id === id);
        if (i === -1) {
            return false;
        }

        return this.listaprojektow[i];
    }

    getCena(id, refundacja) {
        var i = this.listaprojektow.findIndex((element, index, array) => element.id === id);
        if (i === -1) {
            return 0;
        }

        var projekt = this.listaprojektow[i];
        var cena = projekt.cena;

        if (angular.isDefined(refundacja) && refundacja) {
            cena -= projekt.cena * (projekt.refundacja/100);
        }

        return cena;
    }

    sprzedaj(id, szt) {
        var i = this.listaprojektow.findIndex((element, index, array) => element.id === id);
        if (i === -1) {
            return false;
        }

        var projekt = this.listaprojektow[i];

        projekt.stan -= szt;

        return true;
    }
}

export default Projekt;
