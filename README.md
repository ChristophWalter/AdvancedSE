# AdvancedSE

[![Join the chat at https://gitter.im/Advanced_SE/Lobby](https://badges.gitter.im/Advanced_SE/Lobby.svg)](https://gitter.im/Advanced_SE/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**System bzw. Anwendung:**

Erweiterter Task Manager auf Basis von Electron. Dafür werden aktuelle Temperaturdaten ausgelesen und angezeigt.
Außerdem sind historische Temperatur Daten in einem Diagramm und die laufenden Prozesse in einer Liste zu sehen.


**Server:**

Node.js v6.7.0 (https://nodejs.org/en)


**Datenbank:**

NeDB (https://github.com/louischatriot/nedb)


**Frontend-Frameworks:**

- Bootstrap (http://getbootstrap.com)
- Chart.js (http://www.chartjs.org)
- jQuery (https://jquery.com)


**Installation mit Webstorm:**

1. Projekt klonen
2. Rechtsklick auf package.json -> Run 'npm update'
3. Run/Debug Configurations -> + -> node.js
    - node-interpreter -> Add... -> '...\node_modules\.bin\electron.cmd'
    - JavaScript file -> main.js
4. Herunterladen und ausführen von Open Hardware Monitor (http://openhardwaremonitor.org)
5. Herunterladen und starten des FakeSMTP Servers (http://nilhcem.github.io/FakeSMTP)
6. Run

**Testing:**

1. in das Root-Verzeichnis wechseln
2. Befehl `node ./node_modules/electron-mocha/bin/electron-mocha ./Test_modules` ausführen

**TravisCI**
Push auf Master nur per Pull Request!

**Team:**

- Sedi Oben-Torks
- Sascha Traub
- Christoph Walter
- Michael Wehrstein
- Marcel Jakob