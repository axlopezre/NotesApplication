NotesApplication
Challenge node js express notes application

Steps to run the application:

-first create the docker container to run the ORM sequelize postgre DB (You need to have installed docker, run just one time):

command: docker run --network=bridge --name postgreSQLContainer -e POSTGRES_PASSWORD=12345 -p 5432:5432 -d postgres

-second: run npm install, in the root project.

command: npm install

-third: run the whole application.

command: npm run start-application

----ExtraComments

I would like to add that when you run the application with the last command, You need to wait until the server run correctly before start using the frontend.

Versions: I am using the 20.12.2 node js version, port for frontend is 4000, port for backend is 3001, port for ORM sequelize postgre DB is 5432.

I developed with windows 10, I could say that is not problem to run with other operating system.
