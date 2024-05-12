# Spis Treści

1. [Co to jest WebPack](#co-to-jest-webpack)
2. [Jak Zacząć](#jak-zacząć)
3. [Plik konfiguracyjny webpack.config.js](#plik-konfiguracyjny-webpackconfigjs)
4. [Style CSS](#style-css)
5. [Kompilacja Sass/Scss](#kompilacja-sassscss)
6. [Wydzielenie skompilowanego CSS do oddzielnego pliku](#wydzielenie-skompilowanego-css-do-oddzielnego-pliku)
7. [Production oraz Development Mode](#production-oraz-development-mode)

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

## Jak skompilować pliki za pomocą webpack? 
Wpisz w konsoli polecenie:
```
webpack
```

## webpack --watch

Żeby za każdym razem nie wpisywać webpack, 
można go uruchomić jako 
```
webpack --watch
```

Wtedy wszystkie zmiany entry pliku będą monitorowane na bieżąco i będą kompilowane.
Uważaj że jeżeli zmieniasz konfigi w webpack.config.js, to żeby webpack ich 
załapał trzeba go ponownie uruchomić (wpisujać webpack bądź webpack --watch


)

## Plik konfiguracyjny webpack.config.js

Webpack korzysta z pliku 
konfiguracyjnego o nazwie `webpack.config.js`, w którym definiowane są różne ustawienia i opcje dla procesu budowania.
Oto jak wygląda podstawowa konfiguracja które określa
tzw. punkty entry/output:
```
const path = require("path");
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
};
```
Określamy plik entry oraz ścieżke gdzie będziemy nasz kod "pakować".

### Style css
Utwórzmy sobie 2 pliki: index.html oraz style.css

```
touch index.html && touch src/style.css
```

W index.html dodajmy skrypt z folderu dist
```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

<script src="./dist/main.js"></script>
</body>
</html>
```

w src/style.css dajmy jakiś przykładowy kod typu
```
body {
   background: blue;
}
```
i zainkludujmy to jsa src/index.js
```
require('./style.css');
```

Teraz jakbyśmy sobie odpalili komendę webpack to dostaniemy
błąd typu:
```
ERROR in ./src/style.css 1:5
Module parse failed: Unexpected token (1:5)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. 
```
Wszystko wskazuje na to że webpack nie rozumie css. I żeby
css zrozumiał potrzebuje tzw loadera.
Loader w Webpacku to moduł, który pozwala na przetwarzanie plików o różnych formatach w trakcie procesu budowania. Kiedy Webpack napotyka importowane lub wymagane pliki innych typów niż JavaScript, takie jak pliki CSS, obrazy, czcionki czy inne, nie ma naturalnej zdolności do ich zrozumienia i obsługi. W takich przypadkach loadery są używane do przekształcenia tych plików w moduły JavaScript, które mogą być zintegrowane bezpośrednio do twojego projektu.

A zatem instalujemy odpowiedni loader:
```
npm install css-loader --save-dev
```
Dodajemy obsługe tego w naszej konfiguracji w webpack.config.js
```
const path = require("path");
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["css-loader"],
            }
        ]
    }    
};
```
Po tym jak skompilujemy projekt błędów już nie będzie,
i style ładnie wyłądują w dist/main.js.
Natomiast jak odpalimy index.html zauważymy że 
nic się nie zmieniło i tło nadal jest białe.
Dzieje się to dlatego że chociał webpack poradził sobie
z parsowanie stylów, to musi jeszcze poradzić sobie z wstrzykiwaniem tych styli bezpośrednio
do strony www. I do tego mamy kolejny loader który się nazywa style-loader.
A zatem:

```
npm install style-loader --save-dev
```

config:
```
const path = require("path");
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    }
};
```
i ponownie kompilujemy projekt wpisując polecenie 
```
webpack
```

Vuala! Mamy niebieskie tło.
Zauważ że w konfigu loaderki są wpisane w kolejności
```
["style-loader", "css-loader"]
```

To jest ważne, ponieważ webpack ich uruchamia od prawej do lewej, czyli najpierw musi ogarnąć css przez css-loader, a potem to już załadować do strony.

## Kompilacja sass/scss

W tej sekcji sobie opiszmy jak użyć webpack
do kompilacji sass, czyli czegoś takiego

```
$color: blue
body
   background-color: $color
```
lub scss
```
$color: blue
body {
   p {
      color: $color;
   }
}
```

Tu jest wszystko mocno podobne do kompilacji css.
Stwórzmy sobie plik style.sass
```
touch src/style.sass
```

Dajmy tam:
```
$color: blue

body
  background-color: $color
```
oraz include tego do index.js

```
require('./style.sass');
```

Teraz potrzebujemy loadera który umożliwi że webpack zrozumie syntax sass oraz sam sass.

```
npm install sass-loader sass --save-dev
```

Dodajemy rule dla sass/scss

```
const path = require("path");
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            // rule dla kompilacji plików css
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

            // rule dla kompilacji plików sass/scss
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ]
    }
};
```

Teraz wpiszmy webpack do konsoli - po odświeżeniu strony będziemy mieli niebiskie tło.
Czyli działa!

Tujaj zauważ że mieliśmy najpierw użyć sass-loader, potem css-loader a potem już style-loader.
To dlatego że webpack z kod sass przekształca w kod css, no i żeby ten css zrozumiał potrzebuje css-loader.


## Wydzielenie skompilowanego css do oddzielnego pliku
Prawie zawsze cssy trzymamy w oddzielny pliku, więc omówmy jak to 
zrobić za pomocą webpack.
Zróbmy sobie strukture jak z sekcji dla kompilacji sass.

Żeby wydzielić skompilowany css do pliku, użyjemy
MiniCssExtractPlugin - to plugin dla Webpacka, który służy do ekstrahowania kodu CSS z bundla JavaScript i zapisywania 
go do osobnych plików CSS. 

Jest to przydatne, gdy chcesz
oddzielić kod CSS od kodu JavaScript, co może poprawić wydajność i ułatwić zarządzanie styli w Twojej aplikacji..


```
npm install --save-dev mini-css-extract-plugin
```

Teraz w konfigu musimy zdefiniować plugin w sekcji plugins
oraz zamiast style-loader użyć właśnie tego pluginu

```
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            // rule dla kompilacji plików css
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

            // rule dla kompilacji plików sass/scss
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ]
    }
};
```

Po tym kompilujemy projekt i w dist mamy main.css, który zawiera nasze style które były dodane do index.js.

### production oraz development mode

## Tryby deweloperski i produkcyjny w Webpacku

### Tryb produkcyjny (production mode):

W trybie produkcyjnym Webpack optymalizuje wydajność i rozmiar wynikowego bundla JavaScript. Może to obejmować minifikację kodu JavaScript, eliminację zbędnych lub powtarzających się fragmentów kodu, a także ekstrakcję kodu CSS do osobnych plików. Tryb produkcyjny jest przeznaczony do wykorzystania na żywym środowisku produkcyjnym, gdzie liczy się optymalna wydajność i minimalizacja rozmiaru plików.

### Tryb deweloperski (development mode):

W trybie deweloperskim Webpack skupia się na szybkości działania i ułatwia debugowanie aplikacji. Nie stosuje się do optymalizacji tak drastycznych kroków, jak w trybie produkcyjnym, co oznacza, że wynikowy bundel może być większy i mniej zoptymalizowany. Może zawierać informacje do debugowania (takie jak sourcemaps) i zachować bardziej czytelny kod.

Aby skonfigurować Webpack w trybie deweloperskim lub produkcyjnym, możesz użyć odpowiedniej flagi podczas uruchamiania Webpacka z poziomu wiersza poleceń lub ustawić odpowiednią wartość `mode` w pliku konfiguracyjnym Webpacka.

Przykład użycia flagi dla trybu produkcji:
```bash
webpack --mode=production
```

Przykład ustawienia trybu w pliku konfiguracyjnym Webpacka:

```
module.exports = {
  mode: 'production', // lub 'development'
  // reszta konfiguracji...
};

```
