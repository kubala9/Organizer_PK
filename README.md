# Apteka

##Inicjowanie:
* wchodzimy do folderu gdzie chcemy mieć projekt (w konsoli)
* git clone git@github.com:kubala9/Apteka.git (musimy mieć wpięte klucze publiczne na github)
* npm install (potrzebny nodeJS na komputerze)
* po zainstalowaniu zależoności cała aplikacja znajduje się w /src/app
* uruchamiamy aplikację przez gulp serve
* aplikację mamy uruchomioną pod http://localhost:3000
* terminal z taskiem gulpowym musi być ciągle otwarty (automatycznie odświeża zmieniające się style, skrypty i widoki)

##Do poczytania:
* Angular material: https://material.angularjs.org/latest/
* Ikonki: https://klarsys.github.io/angular-material-icons/
* Funkcje strzałkowe: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
* storage: https://github.com/gsklee/ngStorage

##Technologia:
* http://yeoman.io/
* http://fountainjs.io/
* https://angularjs.org/


##Tip
* w edytorze polecam kliknąć prawym klawiszem myszy na folder .tmp, "Mark directory as", "Exclude" (IDE - PHP Storm)

##Dokumentacja:
App
- główna klasa 'nad' wszystkimi klasami
- firstInit()

Start:
- Korzysta z Sprzedajacy, Kupujacy, Notyfikacje
- kupujacy[]
- sprzedajacy[]
- logujJakoSprzedajacy()
- logujJakoKupujacy()
- rejestrujJakoKupujacy()

Notyfikacje:
- powiadomienie()
- potwierdzenie()
- zamknij()

ObslugaSprzedajacy:
- Korzysta z Sprzedajacy, Notyfikacje
- sprzedawcy[] - lista sprzedawców
- — wczytaj() - prywatna metoda
- — modyfikowanie() - prywatna metoda
- modyfikacja()
- usun()

Sprzedajacy:
- lista[] - lista sprzedawców
- wczytaj()
- zapisz()
- nowy()
- pobierz()
- edytuj()
- usun()
- getSprzedawca()

ObslugaKupujacy:
- Korzysta z Kupujacy, Notyfikacje
- kupujacy[] - lista kupujacych
- — wczytaj() - prywatna metoda
- — modyfikowanie() - prywatna metoda
- modyfikacja()
- usun()

Kupujacy:
- listakupujacych[] 
- wczytaj()
- zapisz()
- nowy()
- edytuj()
- usun()
- pobierz()
- getKlient()

ObsługaProdukow:
- Korzysta z Produkt, Notyfikacje
- produkty[] - lista produktów
- — wczytaj() - prywatna metoda
- — modyfikowanie() - prywatna metoda
- modyfikacja()
- usun()

Produkt:
- listaproduktow[]
- wczytaj()
- zapisz()
- nowy()
- pobierz()
- edytuj()
- usun()
- getProdukt()
- getCena()
- sprzedaj()


ObsługaSprzedazy:
- korzysta z Sprzedaz, Kupujacy, Sprzedajacy, Produkt, Notyfikacje
- sprzedaz[]
- kupujacy[]
- produkty[]
- sprzedajacy[]
- modyfikacja()
- usun()
- zrealizuj()
- getKlient()
- filtrujZrealizowane()
- - modyfikowanie() - prywatna

Sprzedaz:
- lista[]
- wczytaj()
- zapisz()
- nowy()
- pobierz()
- edytuj()
- usun()
- getPusty()
- zrealizuj()

ObslugaZamowien:
- korzysta z Notyfikacje, Produkt, Sprzedaz
- produkty[]
- koszyk[]
- dodajDoKoszyka() 
- pokazKoszyk()
- - dodawanie() - prywatna
- - sprawdzKoszyk() - prywatna


Zamowienie:
- usuwamy tą klasę!



