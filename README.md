# Registration-Login app

Technology stack used:

* Node.JS (Express)
* ReactJS
* GraphQL
* PostgreSQL
* Ant Design
* bcrypt
* jsonwebtoken

---

**Short blurb:** The application lets users register for new accounts and log in to the system.

---

**Client application:**
The front end (running at [http://localhost:3000](http://localhost:3000)) is designed with ReactJS and the use of Ant Design library. Each of the actions (register, log in, log out) are calling REST APIs which in reality are using GraphQL to either query or mutate the database by hitting the endpoint exposed on the server side.
To run the front-end application locally, navigate to the ```client``` directory of this repository and run (once):

```
npm i
```

And then to actually start the front end application:

```
npm run start
```

---

**Server application:**
The back end is designed with Node.JS and a couple of handful libraries like

```bcrypt``` (for password hashing) and ```jsonwebtoken``` (for user verification).
A GraphQL server is running on [http://localhost:9000/graphql](http://localhost:9000/graphql) and upon navigating to that endpoint the user will be able to directly query and mutate the database.
To run the back-end application locally, you need to have a local PostgreSQL instance running, edit the ```.env``` file located in the root of the ```server``` directory and enter the relevant details for your local connection.
Afterwards, while still in the ```server``` directory, run (once):

```
npm i
```

And then to actually start the back end application:

```
npm run start:prod
```

---

Note: when starting, the back end application inserts a "default" user with the following credentials:
E-mail: rafail.zorzos@gmail.com
Password: a1234567

