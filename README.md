# Botiga Copilot

Mini-botiga en línia per practicar la programació assistida amb GitHub Copilot.

## Requisits

- Node.js 22.13 o superior (recomanat: Node.js 24 LTS)

## Instal·lació i execució

```bash
npm install
npm start
```

Obre <http://localhost:3000> al navegador.

## Tests

Executa tots els tests amb el runner integrat de Node.js:

```bash
npm test
```

Per executar un sol fitxer de tests:

```bash
node --test test/carret.test.js
```

## API

| Mètode | Ruta | Descripció |
|---|---|---|
| GET | `/api/productes` | Llista els productes amb la mitjana i el nombre de ressenyes. Admet `?categoria=roba`. |
| GET | `/api/productes/:id` | Retorna un producte, o 404 si no existeix. |
| GET | `/api/ressenyes?producteId=1` | Llista les ressenyes d'un producte. |
| POST | `/api/ressenyes` | Publica una ressenya: `{ producteId, autor, text, puntuacio }`. |
| GET | `/api/categories` | Retorna les categories amb el nombre de productes de cadascuna. |
| POST | `/api/carret/total` | Calcula el subtotal, l'enviament i el total: `{ items, descompte }`. |

Exemple de resposta de `POST /api/carret/total`:

```json
{ "subtotal": 20, "enviament": 3.9, "total": 23.9 }
```

El `descompte` és un percentatge entre 0 i 100. Els errors es retornen en JSON amb el codi HTTP adequat.

## Estructura

```
src/
  index.js            Punt d'entrada: inicia el servidor
  app.js              Configuració d'Express i rutes
  config.js           Configuració de l'aplicació
  db.js               Base de dades SQLite en memòria amb dades de prova
  routes/             Rutes de l'API (productes, ressenyes, categories, carret)
  utils/carret.js     Càlcul del subtotal i del descompte
  utils/enviament.js  Càlcul del cost d'enviament segons les tarifes
public/               Frontend (HTML, CSS i JavaScript)
test/                 Tests amb el runner integrat de Node.js
docs/                 Documentació de proveïdors externs
.github/prompts/      Prompts de Copilot (p. ex. endpoint.prompt.md)
```
