# Wasteland Survival

2D-Top-Down-Survival im Browser (HTML, CSS, Vanilla JavaScript, ohne Backend).

## Starten

Lokal: `index.html` im Browser öffnen oder im Ordner `python -m http.server` ausführen.

## GitHub Pages

1. Alle Dateien in ein Repository hochladen (`index.html` im Hauptverzeichnis).
2. Settings, Pages, Branch `main` und Ordner `/ (root)` wählen.
3. Nach kurzer Zeit ist das Spiel unter `https://NAME.github.io/REPO/` erreichbar.

## Struktur

- `js/core`: Konfiguration, Zustand, Spielstart, Game Loop
- `js/data`: Gegenstände, Rezepte
- `js/world`: Weltgenerierung, Kollision
- `js/systems`: Inventar, Audio, Speichern, Aktionen, Update, Funkturm und Absturz- und Bunker-Story (Spielziel), Kapitel 2 (Moor, Basis Süd), Extras (Truhen, Schlafen, Haltbarkeit, Drops, Partikel), Überleben (Kälte, Schwierigkeit)
- `js/ui`: Inventar-Oberfläche, Menü, HUD, Einstellungen und Tutorial, Menühintergrund
- `js/input`: Tastatur, Maus, Touch
- `js/render`: Zeichnen, Karte

Die Skripte werden in der Reihenfolge aus `index.html` geladen und teilen sich den globalen Zustand.
