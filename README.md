# Co to jest WebPack
Webpack to narzędzie, które pomaga programistom w zarządzaniu kodem ich aplikacji webowych. Wyobraź sobie, że masz wiele plików JavaScript, CSS i innych, które należy połączyć w jeden, zoptymalizowany plik, aby strona internetowa działała szybko i sprawnie. Webpack robi właśnie to - zbiera wszystkie te pliki i tworzy z nich jeden, zoptymalizowany zestaw, gotowy do użycia przez przeglądarkę internetową. Dzięki Webpackowi możesz także łatwo zarządzać zależnościami między plikami, co ułatwia rozwijanie i utrzymanie dużych projektów webowych. Innymi słowy, Webpack pomaga zorganizować i zoptymalizować kod, co przekłada się na lepszą wydajność i łatwiejsze zarządzanie projektem.


[Dokumentacja Webpacka](https://webpack.js.org/concepts/)


## Jak Zacząć

Aby zacząć korzystać z Webpacka, wykonaj następujące kroki:

1. Zainicjuj nowy projekt NPM, jeśli jeszcze tego nie zrobiłeś, wykonując polecenie:
   ```bash
   npm init -y

2. Zainstaluj Webpack jako zależność deweloperską, używając polecenia:

```bash 
npm install webpack --save-dev
```

3. Teraz jak wpiszesz w konsoli webpack to zostaniesz poproszony o doistalowanie 
webpack-cli.
   Webpack-CLI to interfejs wiersza poleceń dla narzędzia Webpack. Jest to osobny pakiet, który zawiera polecenia CLI (Command Line Interface) do zarządzania konfiguracją Webpacka i uruchamiania procesu budowania. Dzięki webpack-cli możesz łatwo uruchamiać Webpack z poziomu wiersza poleceń, korzystając z różnych opcji i flag, takich jak uruchamianie określonych konfiguracji, trybów środowiskowych i wiele innych. W skrócie, webpack-cli ułatwia korzystanie z Webpacka poprzez interakcję z nim za pomocą wiersza poleceń.

4. Instalujemy webpack-cli

```
npm install -D webpack-cli
```

5. Po tym jak wpiszemy w konsoli webpack - to będziemy mieli komunitak typy
```
Module not found: Error: Can't resolve './src' ....
```
Dzieje się to przez to że nie mamy pliku konfiguracyjnego i webpack używa swoich domyślnych ustawień. Próbuje znaleźć plik index.js w folderze src. 
Utworzmy taką strukture

```
mkdir src && touch ./src/index.js
```

6. Następnie odpalamy znowy komendę webpack, w wyniku powstanie folder ./dist z plikiem main.js.
Ten plik zawiera skompilowaną wersje naszego kodu z ./src/index.js. Czyli suma sumarum skorzystaliśmy z webpack nawet bez żadnej konfiguracji


