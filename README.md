## Purpose

The main purpose of this micro-service is to display the course and user data from `Strapi CMS` and `Prisma Postgresql database`.

## How to run 

### Pulling respective repos

- pull this project from git
- pull `sof-ops` repo from git stack on fire organization

### Running databases in docker environment
- cd into `sof-ops` project
- run `docker-compose up -d` to run docker containers in detached mode(not bound to current terminal window)
- run `docker ps` to verify the databases are running 
### Prisma specific 

- run `npx prisma migrate dev` to apply Postgresql migrations
- run `npx prisma studio` to start a preview environment of your database - you can also play with the data directly there
- run `npx prisma push` to experiment with schema shaping on any schema changes in development, when satisfied run `npx prisma migrate dev` to create actual migration files
### Installing dependencies & running the project

- run `yarn install`
- run `yarn run dev`

