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
The front end is designed with ReactJS and the use of Ant Design library. Each of the actions (register, log in, log out) are calling REST APIs which in reality are using GraphQL to either query or mutate the database by hitting the endpoint exposed on the server side.

---

**Server application:**
The back end is designed with Node.JS and a couple of handful libraries like

```bcrypt``` (for password hashing) and ```jsonwebtoken``` (for user verification).
A GraphQL server is running on [http://localhost:9000/graphql](http://localhost:9000/graphql) and upon navigating to that endpoint the user will be able to directly query and mutate the database.

