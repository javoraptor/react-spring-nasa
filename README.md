
#Code Analysis
PMD 
gradle check

Jacoco
gradle test jacocoTestReport

#Sonar
./gradlew sonarqube \
  -Dsonar.organization=javoraptor-github \
  -Dsonar.host.url=https://sonarcloud.io \
  -Dsonar.login=<private>