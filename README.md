# Beispiel- und Übungscode für das Buch "React - Grundlagen, fortgeschrittene Techniken und Praxistipps – mit TypeScript und Redux" (dpunkt-Verlag)

Website zum Buch: https://reactbuch.de

## Voraussetzungen

Die Beispiele sind mit Node 10.16 bzw npm 6.9.0 getestet. Falls etwas bei dir nicht funktioniert, möchten wir dich bitten, zunächst sicherzustellen,
dass Du diese Versionen verwendest. Dann kannst Du uns gerne einen Issue im GitHub Repository einstellen oder uns eine E-Mail zukommen lassen (reactbuch@nilshartmann.net).

## Ordner

- `app`: Die fertige Anwendung. Dieser Stand entspricht dem Redux-Stand in `schritte` (Redux), nur dass hier die Datei- und Verzeichnisstruktur exemplarisch für eine große React-Anwendung umgestellt wurde
`app-es6-class-api`: Derselbe fertige Stand der Api, allerdings ohne Hooks API, stattdassen mit der "alten" Klassen API von React entwickelt (siehe Anhang B).
- `hands-on`: In diesem Verzeichnis kannst Du die Anwendung mit dem Buch Schritt-für-Schritt entwickeln
- `schritte`: Hier stehen die fertigen Teile nach jedem Kapitel im Buch.
- `voteapp-server`: Das Backend für die Vote-Anwendung (REST API auf Basis eines Express-Servers)
- `voteapp-graphql-server`: Das GraphQL-Backend für die Anwendung im Schritt 12. 

### GraphQL Server auf Spring Boot-Basis

Wenn Du im Backend Spring Boot mit GraphQL verwendet, kannst Du dir diese Java-basierte Implementierung ansehen, die Alexander Pohl gebaut hat: [https://github.com/apo1967/voteapp-server-graphql](https://github.com/apo1967/voteapp-server-graphql)

