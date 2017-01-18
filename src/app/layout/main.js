import angular from 'angular';

class App {
  constructor($rootScope, Sprzedajacy, Kupujacy, Produkt, $localStorage) {
    "ngInject";

    this.Sprzedajacy = Sprzedajacy;
    if (!angular.isArray($localStorage.sprzedajacy)) {
      this.firstInitSprzedajacy();

      $rootScope.zalogowany = this.sprzedajacy[0];
      $rootScope.zalogowany.sprzedajacy = 1;
    }

    if (!angular.isArray($localStorage.kupujacy)) {
      this.Kupujacy = Kupujacy;
      this.firstInitKupujacy();
    }

    if (!angular.isArray($localStorage.produkt)) {
      this.Produkt = Produkt;
      this.firstInitProdukt();
    }
  }


  firstInitSprzedajacy() {
    let sprzedawca = {
      'imie': 'Damian',
      'nazwisko': 'Lewita',
      'pesel': '95081604559',
      'haslo': 'password'
    };
    let sprzedawca2 = {
      'imie': 'Jakub',
      'nazwisko': 'Michniewski',
      'pesel': '95081604550',
      'haslo': 'password2'
    };

    this.Sprzedajacy.nowy(sprzedawca);
    this.Sprzedajacy.nowy(sprzedawca2);
  }

  firstInitKupujacy() {
    let kupujacy = {
      imie: 'Jan',
      nazwisko: 'Kowalski',
      pesel: '12345678901',
      haslo: 'pass2',
      email: 'boss@sggw.pl',
      telefon: '791999468',
      adres: 'Jagodowa 3, Warszawa'
    };

    let kupujacy2 = {
      imie: 'Agnieszka',
      nazwisko: 'Kowalska',
      pesel: '98765432101',
      haslo: 'pass',
      email: 'aga@onet.pl',
      telefon: '856476312',
      adres: 'Malinowa 8, Warszawa'
    };

    this.Kupujacy.nowy(kupujacy);
    this.Kupujacy.nowy(kupujacy2);
  }

  firstInitProdukt() {
    var listaproduktow = [{nazwa:"ALERIC", opis:"tabl.0,01 g (7 tabl.)", cena:33.59, dostepnosc:"Dostępny", recepta:1, refundacja:"0", stan: 10},{nazwa:"BUDERHIN", opis:"aerozol do nosa; 50 µg/dawkę; 200 dawek", cena:13.99, dostepnosc:"Dostępny", recepta:1, refundacja:"0", stan:10},{nazwa:"CLARINASE", opis:"tabl. o przedł. uwalnianiu (10 tabl.)", cena:"22.99", dostepnosc:"Chwilowy brak produktu", recepta:1, refundacja:"100", stan:10},{nazwa:"DORETA", opis:"tabletki powlekane; 37,5 mg tramadolu i 325 mg paracetamolu;", cena:45.99, dostepnosc:"Dostępny", recepta:1, refundacja:"0", stan:10},{nazwa:"EPIDUO", opis:"żel; 15 g", cena:19.99, dostepnosc:"Dostępny", recepta:1, refundacja:"0", stan:10},{nazwa:"IBUFEN", opis:"tabl. powl. 0,2 g (10 tabl., 30 tabl.)", cena:22.99, dostepnosc:"Chwilowy brak produktu", recepta:1, refundacja:"50", stan:10},{nazwa:"KOFEPAR", opis:"tabl. (10 tabl.)", cena:15.49, dostepnosc:"Chwilowy brak produktu", recepta:1, refundacja:"0", stan:10},{nazwa:"METAFEN", opis:"tabl. (10 tabl.)", cena:11.29, dostepnosc:"Dostępny", recepta: 0, refundacja:"0", stan:10},{nazwa:"PANADOL", opis:"tabl. powl. 0,5 g (12 tabl., 24 tabl., 48 tabl.)", cena:9.99, dostepnosc:"Chwilowy brak produktu", recepta: 0, refundacja:"0", stan:10},{nazwa:"RUBITAL", opis:"syrop 0,012 g/ml (0,06 g/5 ml)", cena:21.49, dostepnosc:"Dostępny", recepta: 0, refundacja:"0", stan:10},{nazwa:"SOLPADEINE", opis:"kaps. 1 kaps. zawiera: 0,5 g paracetamolu, 0,008 g kodeiny, 0,03 g kofeiny (12 kaps.)", cena:19.30, dostepnosc:"Dostępny", recepta: 0, refundacja:"100", stan:10},{nazwa:"TRAMAL", opis:"kapsułki; 50 mg; (20 kaps.)", cena:13.99, dostepnosc:"Dostępny", recepta:1, refundacja:"0", stan:10},{nazwa:"VIPROSAL B", opis:"maść na skórę; 100 gzawiera: 5 j. mysich jadu żmii zygzakowatej, 3 gkamfory, 1 gkwasu salicylowego, 3 golejku z sosny syberyjskiej;50 g", cena:36.69, dostepnosc:"Dostępny", recepta: 0, refundacja:"0", stan:10},{nazwa:"ZALDIAR", opis:"tabletki musujące; 37,5 mg tramadolu i 325 mg paracetamolu; 20 sztuk, 30sztuk", cena:25.59, dostepnosc:"Chwilowy brak produktu", recepta:1, refundacja:"100", stan:10}];
    listaproduktow = listaproduktow.reverse();

    angular.forEach(listaproduktow, produkt => {
      this.Produkt.nowy(produkt);
    });
  }
}

export const main = {
  template: require('./main.html'),
  controller: App
};
