import angular from 'angular';

class Uzytkownik {
    constructor($localStorage) {
        "ngInject";

        this.lista = [];
        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.uzytkownik)) {
                this.lista = $localStorage.uzytkownik;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.lista)) {
                $localStorage.uzytkownik = this.lista;
            }
        };

        this.wczytaj();
    }



    nowy(uzytkownik) {
        if (this.lista.length === 0) {
            uzytkownik.id = 1;
        } else {
            uzytkownik.id = this.lista[this.lista.length - 1].id + 1;
        }

        this.lista.push(uzytkownik);
        this.zapisz();

        return true;
    }

    pobierz() {
        this.wczytaj();
        return this.lista;
    }

    edytuj(uzytkownik) {
        var i = this.lista.findIndex((element, index, array) => element.id === uzytkownik.id);

        if (i === -1) {
            return false;
        }

        this.lista[i] = uzytkownik;
        this.zapisz();

        return true;
    }

    usun(uzytkownik) {
        var i = this.lista.indexOf(uzytkownik);
        if (i === -1) {
            return false;
        }

        this.lista.splice(i, 1);
        this.zapisz();

        return true;
    }

    getUzytkownik(id) {
        var i = this.lista.filter(element => element.id === id)[0];

        return this.lista[i];
    }
}

export default Uzytkownik;
