# I numeri naturali

Applicazione didattica autocontenuta (un solo file `index.html`) sull'insieme **ℕ** dei numeri naturali, pensata per la scuola secondaria di primo grado e il biennio.

Stesso stile grafico e stessa struttura dell'app [frazioni-numeriche](https://github.com/ventilii-gif/frazioni-numeriche): teoria, simulazioni animate, esercizi graduati e quiz, in italiano, con tema giorno/notte e tipografia matematica (KaTeX con fallback testuale, quindi funziona anche offline).

## Contenuti

- **Introduzione** — il percorso storico dei numeri naturali e una linea del tempo.
- **Sei schede tematiche**, ciascuna con sottoschede *Teoria · Simulazione · Esercizi · Quiz*:
  1. **Numerazione e ordine** — l'insieme ℕ, il sistema decimale posizionale, precedente/successivo, confronto.
  2. **Addizione e sottrazione** — proprietà (commutativa, associativa, elemento neutro, invariantiva) e chiusura in ℕ.
  3. **Moltiplicazione e divisione** — proprietà (distributiva compresa) e divisione con resto (euclidea).
  4. **Potenze ed espressioni** — definizione, proprietà delle potenze, ordine delle operazioni.
  5. **Divisibilità e numeri primi** — criteri di divisibilità, numeri primi, **crivello di Eratostene** animato passo per passo, scomposizione in fattori primi.
  6. **MCD e mcm** — metodi con la scomposizione e con l'algoritmo di Euclide, relazione MCD·mcm = a·b.
- **Risolutore** — inserendo due numeri (e un esponente) calcola tutte le operazioni presentate: le quattro operazioni con la divisione col resto, la potenza, la scomposizione, i divisori, la primalità, MCD e mcm, con i passaggi.
- **Quiz riepilogativo** — 20 quesiti a risposta finale che spaziano su tutti gli argomenti.

## Simulazioni

Ogni scheda ha un'animazione su `<canvas>` ricalcolata in tempo reale: valore posizionale e retta dei numeri, salti sulla retta (con la chiusura di ℕ per la sottrazione), schieramento rettangolare e divisione con resto, crescita delle potenze, **crivello di Eratostene** (con controlli manuali passo-avanti/indietro), rettangolo di Euclide per il MCD e multipli comuni per il mcm.

## Quiz e report per l'insegnante

I quiz di sezione danno un feedback immediato e incoraggiante; il quiz riepilogativo mostra le correzioni solo alla fine. Al termine di ogni quiz lo studente può **inviare il report all'insegnante**: nome, tempo di permanenza in ogni sottoscheda e dettaglio delle risposte vengono registrati automaticamente in un **Foglio Google** (con «Scarica report» come alternativa locale).

La raccolta usa una Web App di Google Apps Script dedicata a questa app, il cui URL `/exec` è impostato nella costante `REPORT_ENDPOINT` in `index.html`. Il codice dello script è in [`google-apps-script.gs`](google-apps-script.gs); per cambiare foglio basta creare una nuova Web App e sostituire l'URL. I dati restano separati da quelli dell'app delle frazioni (il campo `app` del payload identifica l'applicazione).

## Pubblicazione

Il workflow `.github/workflows/pages.yml` pubblica automaticamente il sito su **GitHub Pages** a ogni push sul branch `main`.
