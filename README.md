# AI shakki peli

## Yleiskuvaus
Tämä projekti on shakkipeli, jossa on tekoälyvastustaja. Pelissä käyttäjä voi pelata shakkia tietokonetta vastaan, ja tekoäly laskee optimaaliset siirrot pelitilanteen perusteella.

## Projektin rakenne
```
chess-ai-game
├── src
│   ├── ai
│   │   └── ai.ts          # Tekoälyn logiikka
│   ├── game
│   │   └── chess.ts       # Pelitilan hallinta
│   ├── ui
│   │   └── board.ts       # Käyttöliittymä shakkilaudalle
│   └── index.ts           # Sovelluksen käynnistyspiste
├── package.json            # NPM-konfiguraatio
├── tsconfig.json           # TypeScript-konfiguraatio
└── README.md               # Projektin dokumentaatio
```

## Asennusohjeet
1. Kloonaa repositorio:
   ```
   git clone <repository-url>
   ```
2. Siirry projektihakemistoon:
   ```
   cd chess-ai-game
   ```
3. Asenna riippuvuudet:
   ```
   npm install
   ```
4. Käännä TypeScript-tiedostot:
   ```
   npm run build
   ```
5. Käynnistä peli:
   ```
   npm start
   ```

## Pelaaminen
- Käyttäjä pelaa valkoisilla, tekoäly pelaa mustilla.
- Peli noudattaa tavallisia shakkisääntöjä.
- Tekoäly laskee siirtonsa pelitilanteen perusteella ja tarjoaa haastavan pelikokemuksen.

## Osallistuminen
Kaikki kontribuutiot ovat tervetulleita! Voit tehdä pull requestin tai avata issue-ehdotuksen parannuksista tai
