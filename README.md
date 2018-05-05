# NASA Rover Image App

React/boot application to fetch rover images based on search criteria or file provide.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need and IDE of choice, STS was used for this project, and node for front end development.


### Installing

A step by step series of examples that tell you have to get a development env running

Install react dependencies:

```
yarn install
```

Install boot dependencies (this will vary on IDE, STS downloads automatically when project is added)

```
STS -> right click project and select -> gradle refresh 
```

End with an example of getting some data out of the system or using it for a little demo

### Code Changes

Start front end server:

```
yarn start
```

Start spring boot app in IDE (command will vary depending on IDE)

```
alt+shift+x, b
```

In your web browser of choice navigate to http://localhost:9090/ in order to view app. 

## Testing

Explain tests used, controller, service ect...

### Unit Tests Excution

To execute tests:

```
gradle test
```

## Code Analysis

PMD Analysis: 

```
gradle check
```

Jacoco Analysis:

```
gradle test jacocoTestReport
```


Sonar Analysis:

```
./gradlew sonarqube \
  -Dsonar.organization=javoraptor-github \
  -Dsonar.host.url=https://sonarcloud.io \
  -Dsonar.login=<private>
```

## Deployment
In order to deploy application all final react files need to be included into src/main/resources.

Build bundle:

```
yarn build
```

Build jar:

```
gradle copyReactBuild build
```

## Highlights

* Caching: Fixed rate of 6 hours, can be changed in config file
* Async Rest: WIP on asynch branch

## Built With

* [React](https://reactjs.org/) - UI Framework
* [React Materizlise](https://react-materialize.github.io) - UI Styling
* [Maven](https://maven.apache.org/) - BackEnd Dependency Management
* [NPM](https://www.npmjs.com/) - FrontEnd Dependency Management


## Authors

* **Javier Abonza** - *Initial work* - [Resume](http://jabonza.me)


## Acknowledgments

* Raptor
