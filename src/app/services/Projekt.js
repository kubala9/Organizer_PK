import angular from 'angular';

class Projekt {
    constructor($localStorage, $rootScope) {
        "ngInject";

        this.listaprojektow = [];
        this.id = $rootScope.zalogowany.id;
        this.wczytaj = () => {
            if (angular.isDefined($localStorage.projekt)) {
                this.listaprojektow = $localStorage.projekt;
            }
        };

        this.zapisz = () => {
            if (angular.isArray(this.listaprojektow)) {
                $localStorage.projekt = this.listaprojektow;
            }
        };

        this.wczytaj();
    }

    pobierz(archiwum) {
        this.wczytaj();

        let lista = this.listaprojektow.filter(projekt => projekt.id_user === this.id);
        if (archiwum === 1) {
            lista = lista.filter(projekt => projekt.archiwum === 1);
        } else {
            lista = lista.filter(projekt => projekt.archiwum !== 1);
        }

        return lista.map(i => {
            i.termin = new Date(i.termin);
            return i;
        });
    }

    nowy(projekt) {
        if (this.listaprojektow.length === 0) {
            projekt.id = 1;
        } else {
            projekt.id = this.listaprojektow[this.listaprojektow.length - 1].id + 1;
        }

        projekt.id_user = this.id;

        this.listaprojektow.push(projekt);
        this.zapisz();

        return true;
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
}

export default Projekt;
