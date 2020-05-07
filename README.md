# cs2102-fdsApp
This project are using react, express, postgre.

## Before deployment
Create a .env under server directory and copy the content in the .env.template to it.

Replace '{someusername}:{somepassword}' by your own psql username and password.

`e.g 
SESSION_SECRET=ABCDEF$123
DATABASE_URL=postgres://postgres:123456@localhost:5432/postgres`

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





## SAMPLE ACCOUNTS

### FDS manager
username: fds
password: 123456


### customer
username: Douglas
password: 123456

### Full time rider
username: Shirley
password: 123456

### Full time rider
username: Jackeline
password: 123456

### Restaurant staff
username: Taylor
password: 123456

All restaurant default are set to `default`

NOTE: username are case sensitive
