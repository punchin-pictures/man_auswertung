# MAN Beisteller-Auswertung auf Netlify

Aufbau wie beim Timing-Tool: eine HTML-Seite, eine Netlify Function, Passcode-Gate.
Die Auswertungsdaten und der Kundenname liegen nur in `netlify/functions/` und
werden erst nach korrektem Code ausgeliefert. Wer die URL ohne Code öffnet, sieht
nur ein dunkles Eingabefeld.

```
public/index.html                       die Seite (ohne Daten, ohne Kundenname)
netlify/functions/data.mjs              Passcode-Gate, liefert die Daten unter /api/data
netlify/functions/auswertung-data.mjs   die Auswertungsdaten (nur serverseitig)
netlify.toml                            sagt Netlify: public/ ausliefern, Functions aus netlify/functions
```

## Deployment (ohne Terminal)

1. **GitHub:** Neues Repository anlegen, **Private**, z. B. `man-beisteller-auswertung`.
   Auf "uploading an existing file" klicken und den kompletten Inhalt des entpackten
   Ordners per Drag & Drop hochladen (die Ordner `public` und `netlify` müssen als
   Ordner ankommen, nicht nur die Dateien darin). Commit.
2. **Netlify:** Add new site → Import an existing project → GitHub → das Repo wählen.
   Build settings leer lassen, `netlify.toml` regelt alles. Deploy site.
3. **Passcode setzen:** Site configuration → Environment variables → Add a variable:
   Key `PASSCODE`, Value = der Code für MAN (z. B. `IAA-2026`). Speichern.
4. **Neu deployen:** Deploys → Trigger deploy → Deploy site. Ohne diesen Schritt kennt
   die Function den Passcode noch nicht und meldet Fehler 500.
5. **Site-Name:** Site configuration → Change site name, z. B. `man-beisteller-auswertung`
   → `https://man-beisteller-auswertung.netlify.app`.
6. **Test im privaten Fenster:** Ohne Code nur das Gate, mit falschem Code "Code nicht
   korrekt.", mit richtigem Code das Dashboard. Unten links steht `v1.2`.

## Später aktualisieren

- Neue Zahlen: `netlify/functions/auswertung-data.mjs` ersetzen (GitHub → Datei → Edit → Inhalt ersetzen → Commit). Netlify deployt automatisch.
- Code ändern: Environment variable `PASSCODE` ändern, dann Trigger deploy.
- Darstellung: `public/index.html` ersetzen. Versionsnummer im Footer hochzählen, dann sieht man sofort, ob der Upload live ist.
- Logos und Kopfzeilen-Texte liegen ebenfalls in `auswertung-data.mjs` (Feld `meta`), damit vor dem Passcode nichts vom Kunden sichtbar ist.

## Hinweise

- Netlifys eigener Passwortschutz ist kostenpflichtig; der Passcode hier läuft über die Function und funktioniert im Free-Plan.
- Der Code wird im Browser nur für den Tab gemerkt (sessionStorage). Fenster zu, Code weg.
- Das Repo muss privat bleiben, `auswertung-data.mjs` enthält den Kundennamen und alle Zahlen.
