

#Caching
caching is at a fixed rate of 6 hours, can be changed in config file


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