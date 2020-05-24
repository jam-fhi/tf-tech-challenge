# Trust Flight Technical Challenge

## Notes

- Commited .env to repo, to make it each to run. Normally I would not do this.
- Used docker compose as an easy way to share system config.

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

## Viewing the database

I used pgAdmin locally on my Mac. I know some companies like to include database viewers within the project however I think its better to keep support tools, like database viewers or ide's to a local development environment so I've not added this to docker-compose.
