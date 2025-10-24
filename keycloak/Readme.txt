Prüfe, ob Java installiert ist:
Führe im Terminal aus:
textjava -version
Erwartete Ausgabe sollte so aussehen:
textopenjdk version "17.0.12" 2023-07-18
OpenJDK Runtime Environment (build 17.0.12+7)
...

Falls Java nicht installiert ist oder eine andere Version angezeigt wird:
Lade OpenJDK 17 herunter und installiere es:

Mit Homebrew (empfohlen für macOS):
textbrew install openjdk@17

Oder lade es von Adoptium herunter und folge den Installationsanweisungen.
Nach der Installation verknüpfe es (falls nötig):
textsudo ln -sfn /opt/homebrew/Cellar/openjdk@17/17.0.12/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk





Prüfe den Java-Pfad:
Finde heraus, wo Java installiert ist:
text/usr/libexec/java_home -v 17
Das gibt den Pfad zum JDK 17 zurück, z. B. /Library/Java/JavaVirtualMachines/openjdk-17.jdk/Contents/Home.
Vergleiche diesen Pfad mit dem erwarteten Pfad /Users/thomasarends/Next_Local/OTSMDEV/jdk-17.0.12_7/Contents/Home. Wenn sie unterschiedlich sind, ist das der Grund für den Fehler.

2. Setze die Umgebungsvariable JAVA_HOME
Keycloak verwendet die Umgebungsvariable JAVA_HOME, um Java zu finden. Setze sie korrekt:

Finde den Java-Pfad (wie oben mit /usr/libexec/java_home -v 17).
Setze JAVA_HOME temporär:
textexport JAVA_HOME=$(/usr/libexec/java_home -v 17)

Überprüfe, ob es gesetzt ist:
textecho $JAVA_HOME

Starte Keycloak erneut:
textcd /Users/thomasarends/Next_Local/OTSMDEV/keycloak
./bin/kc.sh start-dev --http-port=8080

Dauerhafte Lösung:
Füge JAVA_HOME zu deiner Shell-Konfiguration hinzu (z. B. ~/.zshrc für zsh):
textecho 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
source ~/.zshrc


Lösungsschritte
1. Setze JAVA_HOME korrekt
Der korrekte Befehl, um JAVA_HOME auf Java 25 zu setzen, lautet:
textexport JAVA_HOME=$(/usr/libexec/java_home -v 25)

Überprüfe, ob JAVA_HOME gesetzt ist:
textecho $JAVA_HOME
Erwartete Ausgabe: /Library/Java/JavaVirtualMachines/temurin-25.jdk/Contents/Home
Dauerhafte Konfiguration:
Um JAVA_HOME dauerhaft zu setzen, füge es zu deiner ~/.zshrc hinzu:
textecho 'export JAVA_HOME=$(/usr/libexec/java_home -v 25)' >> ~/.zshrc
source ~/.zshrc


2. Überprüfe die Java-Version
Stelle sicher, dass die richtige Java-Version verwendet wird:
text$JAVA_HOME/bin/java -version
Das sollte zeigen:
textopenjdk version "25" 2025-09-16 LTS
OpenJDK Runtime Environment Temurin-25+36 (build 25+36-LTS)
OpenJDK 64-Bit Server VM Temurin-25+36 (build 25+36-LTS, mixed mode, sharing)
3. Starte Keycloak
Gehe in das Keycloak-Verzeichnis und starte das Skript:
textcd /Users/thomasarends/Next_Local/OTSMDEV/keycloak
./bin/kc.sh start-dev --http-port=8080




Um portkonflikte zu vermeiden

kill -9 $(lsof -t -i :8080)
./bin/kc.sh start-dev --http-port=8080