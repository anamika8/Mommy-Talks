# Mommy-Talks
A place for new, upcoming and experienced mothers to share their concern, get helpful suggestions etc.

## Background

Being a mother myself, and having experienced hardships bringing up my daughter, I always used to wonder if I could seek help from fellow mothers
regarding any concerns I was having that time.
Hence, I would like to present to you all a forum for mothers to share, discuss and debate all questions faced by mothers
around the world.

## Mommy-Talks SETUP
(All commands are with respect to the root directory of the project)


* Clone repository
```
git clone 
```
* Copy and configure .env file (cp backend/.env.example backend/.env)
* Install dependencies (cd backend/ && pnpm install)
* Start database (docker compose up postgres)

* Reset prior Typeorm setup (cd backend/ && pnpm typeorm:drop)
* Migrate database (cd backend/ && pnpm migration:run)
* Seed Database (cd backend/ && pnpm seed)
* Test backend ( cd backend/ && pnpm test)
* Start backend (cd backend/ && pnpm dev)
