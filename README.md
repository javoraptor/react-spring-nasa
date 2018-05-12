# NASA Rover Image App

React/Springboot application to fetch rover images based on search criteria or file provided. Performance has been taken into consideration and led to the use of **caching**, **async REST calls** and **websockets** in order to minimize wait time by users.   
[App website](https://nasa-ui.herokuapp.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need and IDE of choice (STS was used for this project) and node for front end development.

The NASA API used requires a private API key for continuous use. This project used the default public API key that the API provides but is limited to n number of calls per day. You may provide a private key through a server param such as -Dprivatekey=<privateKey>


### Installing

A step by step series of examples that aids in getting a development env running

Install react dependencies, navigate to react-client-code dir:

```
yarn install
```

Install boot dependencies (this will vary on IDE, STS downloads automatically when project is added)

```
STS -> right click project and select -> gradle refresh 
```

Verify installation of dependencies by making code changes as outlined in the next section. 


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

Spring testing framework has been used to test controllers. Unit tests utilize Assertj.


### Unit Tests Execution

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

Gradle script has been modified as to build/bundle/place all js files related to react in src/main/resources:

Relevant tasks in gradle are:

```
bootJar.dependsOn copyReactBuild

task copyReactBuild(dependsOn: 'yarnBuild', type: Copy )

task yarnBuild(dependsOn: 'yarnInstall', type: YarnTask)

task yarnInstall(type: YarnTask)
```

Execute build/deployment via gradle wrapper:


```
./gradlew bootRun
```

Tomcat server that will be listening for request on port 9090.

## Highlights

* Asynchronous file downloads via (com.squareup.okhttp:okhttp:2.7.5)  

```
public void executeAsyncRestCall(String date, String camera, final AsyncCallback asyncCallback) {
	log.info("Executing single REST call with parameters: date ->" + date + " :camera -> " + camera);
		client.newCall(buildRequest(Utils.convertToYearMonthDay(date), camera)).enqueue(new Callback() {
```

* Web socket connection to front end for image URL transfers:  

In Java Async method via (org.springframework.boot:spring-boot-starter-websocket):  

```
	protected void sendMessageThroughSocket(String value) {
		this.template.convertAndSend("/image-topic", Collections.singleton(value));
	}
```

React via npm package (react-stomp):  

```
	<SockJsClient url={socketUri} topics={['/image-topic']} onMessage={this.onMessageReceive} ref={(client) => {
    	this.clientRef = client
    }}/>
```

* Caching: Fixed rate of 6 hours, can be changed in config file  

```
	@Bean
	public CacheManager cacheManager() {
		SimpleCacheManager cacheManager = new SimpleCacheManager();
		cacheManager
				.setCaches(Arrays.asList(new ConcurrentMapCache("ui-images"), 
						new ConcurrentMapCache("file-images")));
		return cacheManager;
	}
```

## Future Enhancements
* React JEST Test Suite
* React Logging, configure log server (track.js)
* JS Linter
* Redux 
* API documentation (swagger)


## Built With

* [React](https://reactjs.org/) - UI Framework
* [React Material UI](https://www.material-ui.com/#/) - UI Styling
* [React Semantic UI](https://react.semantic-ui.com/) - UI Styling
* [React Bootstrap](https://react-bootstrap.github.io/) - UI Styling
* [Spring](https://projects.spring.io/spring-boot/) - JAVA Application
* [Gradle](https://gradle.org/) - Build tool
* [Maven](https://maven.apache.org/) - BackEnd Dependency Management
* [NPM](https://www.npmjs.com/) - FrontEnd Dependency Management


## Authors

* **Javier Abonza** - [Resume](http://jabonza.me)


## Acknowledgments

* **Raptor**