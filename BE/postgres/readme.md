docker run --name db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=todoapp -p 5432:5432 -d postgres:15


docker compose run app npx prisma migrate dev --name init
docker compose run app npx prisma migrate dev --name init

docker compose up

docker compose down -v

docker compose up --build

docker compose down -v --remove-orphans


docker compose down -v --remove-orphans
docker compose build --no-cache
docker compose up
-----------------------------------------------
Install Docker Desktop


Generate the Prisma Client:
npx prisma generate

Build your docker images:
docker compose build

Create PostgreSQL migrations and apply them:
docker compose run app npx prisma migrate dev --name init

Also - to run/apply migrations if necessary:

docker-compose run app npx prisma migrate deploy

docker compose run app npx prisma migrate reset


Boot up 2x docker containers:
docker compose up

or

docker compose up -d

If you want to boot it up without it commandeering your terminal (you'll have to stop if via Docker Desktop though).

To login to docker PostgreSQL database (from a new terminal instance while docker containers are running) where you can run SQL commands and modify database!:
docker exec -it postgres-db psql -U postgres -d todoapp

To stop Docker containers:
docker compose down

To delete all docker containers:
docker system prune

Access the App:
Open http://localhost:5003 (or localhost:3000 if changed) in your browser to see the frontend. You can register, log in, and manage your todo list from there.








To Open POStgresqql playground
docker exec -it postgres-db psql -U postgres -d todoapp