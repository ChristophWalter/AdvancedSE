# AdvancedSE

[![Join the chat at https://gitter.im/Advanced_SE/Lobby](https://badges.gitter.im/Advanced_SE/Lobby.svg)](https://gitter.im/Advanced_SE/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**System bzw. Anwendung:**

Task Manager auf Basis von Electron, z.B. auslesen von Temperaturen, CPU usage usw.
Außerdem historische Daten in Form von Diagrammen und eine Taskliste.


**Server:**

Node.js v6.7.0


**Datenbank:**

NeDB


**Frontend-Framework:**

- Angular.js Version von Flat Admin V.3 (https://github.com/tui2tone/flat-admin-bootstrap-templates)
- Angular.js


**Installation mit Webstorm:**

1. Projekt klonen
2. Rechtsklick auf package.json -> Run 'npm update'
3. Run/Debug Configurations -> + -> node.js
    - node-interpreter -> Add... -> '...\node_modules\.bin\electron.cmd'
    - JavaScript file -> main.js
4. Herunterladen und ausführen von Open Hardware Monitor (http://openhardwaremonitor.org)
5. Herunterladen und starten des FakeSMTP Servers (http://nilhcem.github.io/FakeSMTP/)
6. Run

