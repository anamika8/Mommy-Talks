# Mommy-Talks
A place for new, upcoming and experienced mothers to share their concern, get helpful suggestions etc.

## Background

Being a mother myself, and having experienced hardships bringing up my daughter, I always used to wonder if I could seek help from fellow mothers
regarding any concerns I was having that time.
Hence, I would like to present to you all a forum for mothers to share, discuss and debate all questions faced by mothers
around the world.

## Mommy-Talks Setup
(All commands are with respect to the root directory of the project)


* Clone repository
```
    git clone git@github.com:anamika8/Mommy-Talks.git
```

* Navigate to the directory
```
    cd Mommy-Talks
```

* Build the Docker Compose file from the root directory of the project

```
    docker compose build --no-cache
```

* Start the docker containers

``` 
    docker compose up
```

* Once all the 4 containers (postgres, backend, frontend, comments-service) are up & running, open http://localhost in a browser, to see the below page:

![Screenshot of landing page](landing-page-screenshot.png 'Mommy-Talks')
 

## Technical Specification

- Backend (Fastify)
- Frontend (React/HTML/CSS) using Vite
- Persistence (Database/File Storage)
  - Utilize Mikro-ORM's CLI to manage the database.
  - Configure the Mikro-ORM to connect to PostgreSQL database.
- Authentication (Third-party API integration)
  - Google Firebase authentication
- Docker/Compose
- Unit Testing:
  - Backend Testing done using Tap/ Chai
  - Frontend Testing done using Vite's vitest
- Add an independent microservice COMMENTS  to the final project:
  - Written using Python FastAPI
  - Containerized in Docker file 
