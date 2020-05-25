# Trust Flight Technical Challenge

## Notes

- Commited .env to repo, to make it each to run. Normally I would not do this.
- Used docker compose as an easy way to share system config.
- Went for an invesion of control pattern on the api, mostly because its such a small service, dependency inject would not be a massive step up from the way the system is setup though.
- Added swager editor and generation from comments, not the cleanest way but can be improved with dependency injection as this would allow the controller end points to be better organised in files.
- While the original technical challenge asked for data models, I've gone for typescript interfaces in the api but something like knex as a query build with bookshelf as an orm would be easy to implement to use actual data models. For the scope of this challenge I believe that typescript interfaces are suitable.

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

## Viewing the database

I used pgAdmin locally on my Mac. I know some companies like to include database viewers within the project however I think its better to keep support tools, like database viewers or ide's to a local development environment so I've not added this to docker-compose.
