# Trust Flight Technical Challenge

## Notes

- Commited .env to repo, to make it each to run. Normally I would not do this.
- Used docker compose as an easy way to share system config.
- Went for an invesion of control pattern on the api, mostly because its such a small service, dependency inject would not be a massive step up from the way the system is setup though.
- Added swager editor and generation from comments, not the cleanest way but can be improved with dependency injection as this would allow the controller end points to be better organised in files.
- While the original technical challenge asked for data models, I've gone for typescript interfaces in the api but something like knex as a query build with bookshelf as an orm would be easy to implement to use actual data models. For the scope of this challenge I believe that typescript interfaces are suitable.
- For the purposes of this technical challenge I've limited all error handling to 500 internal server error, normally I would be more selective in what error codes are returned from an api and for what purposes.
- The api is compiled from typescript when the docker image is built, for code changes run `tsc -p src` from the task-api directory
- When building unit tests for the front end, I ran into a problem with create-react-app / typescript / jest mocks not working, which meant I was not able to test the main App component. In a production setting I would have setup webpack but felt that I had already spent a lot of time on this project that create-react-app would have been sufficient to demonstrate a front end implementation.

## Using the system

### Start

On first run, you may need to build the project.

`docker-compose up --build`

Optionally you can use -d to run in detattched mode, however I like the log output especially during development work.

`docker-compose up -d`

### Stop

If not running detached:

`ctrl-c`

Then

`docker-compose down`

### Tests

To run desks, ensure the docker-compose system is up and running then:

`cd task-api`

`yarn run test`

or

`yarn run coverage`

### Swagger Editor

You can access swagger editor at `http://localhost:3080` please note to use `http` as it does put `https` onto the api call url and the api server is not running `https`.

### Front End

The front end can be accessed from `http://localhost:3000`

React development tools are running within docker to rebuild and lint front end code changes.

## Viewing the database

I used pgAdmin locally on my Mac. I know some companies like to include database viewers within the project however I think its better to keep support tools, like database viewers or ide's to a local development environment so I've not added this to docker-compose.
