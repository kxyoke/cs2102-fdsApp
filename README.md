# cs2102-fdsApp
This project are using react, express, postgre

## Before deployment
Create a .env under server directory and copy the content in the .env.template to it
Replace '{someusername}:{somepassword}' by your own psql username and password
'e.g DATABASE_URL=postgres://postgres:123456@localhost:5432/postgres'

## Setup 
1.Go to server/sql/pgsqlSetup directory run psql postgre and then run \i ./setup.sql; to create tables, function, triggers and seed data
NOTE:existing database tables might be dropped.

2.Go to client directory, RUN `npm install` to install all the packages and dependencies for client.

3.Go to server directory, RUN `npm install` to install all the packages and dependencies for server.



# Start the app

## Scripts
Go to the server directory:

### `npm start`

Runs the server

### `npm run client`
Runs the client 
open[http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run server`
Runs the server using nodemon


### `npm run dev`
Runs both the server and client concurrently.
