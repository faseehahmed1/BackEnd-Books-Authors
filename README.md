# Connecting Our Library to a Database

## Create a Postgres database on Railway.app

Navigate to the [railway website](https://railway.app/) and create a new Postgres database.

Select the database and click the `Connect` menu item to find your Postgres Connection URL.

Next, click the `Query` menu item and execute SQL queries that will:

- Create two tables (books and authors)
- Insert the initial data (see both images below)

![Entity Relationship Diagram](/readme-assets/erd.png "Entity Relationship Diagram")

![Books and Authors Data](/readme-assets/data.png "Books and Authors Data")

<br>

## Create Environment variables

Create a `.env` file at the root of your project. It should contain the following name/value pairs:

```
PORT=3000
POSTGRES_CONNECTION_URL=
```

Your own `POSTGRES_CONNECTION_URL` will be provided by Railway.

The API won't have a hardcoded PORT like you've done before in previous weeks. Use the environment variable syntax to change the port in `app.js` to use the PORT environment variable instead.

<br>

## Using dot env

You can load environment variables using the [dotenv](https://www.npmjs.com/package/dotenv) package. It's already been installed for you and should appear in your `package.json` file as a dev dependency.

The following scripts have been added to your `package.json` file:

```
"start": "node -r dotenv/config app.js"
"dev": "nodemon -r dotenv/config app.js"
```

Now, whenever you enter `npm run dev` or `npm start`, the `dotenv` package will load your environment variables during runtime, and you'll be able to access them via `process.env`.

<br>

## The .env file and .gitignore

`.env` has been added to your `.gitignore` file. You don't want sensitive database credentials being pushed up to GitHub!

```
node_modules
.env
```

<br>

### Using the `pg` package:

You can connect to the PostgreSQL database using the [`pg`](<(https://node-postgres.com/).>) package. It's already been installed for you and should appear in your `package.json` file as a dependency.

The job of the `db/index.js` file is to connect to your database using a `Pool` from the `pg` package and export a `query` method, allowing you to execute SQL queries in your models or other files. This way, you have one connection to the database, and then you export the ability to query using that one connection for use in any other file instead of having multiple connections.

Use the `db/index.js` example in the [docs page](https://node-postgres.com/guides/project-structure) in the docs as a starting point!

Just to note:

- The docs are using an [arrow function](https://www.w3schools.com/js/js_arrow_function.asp) in their example. Although there are some subtle differences between normal functions we're used to and arrow functions, you can rewrite the query function using the `function` keyword if that's easier for you.
- Don't forget to pass your connection string into your pool! Example: `const pool = new Pool({ connectionString: process.env.POSTGRES_CONNECTION_URL, });`
- Always use [parameterized queries](https://node-postgres.com/features/queries) with the `query` method to help protect against SQL injection - this is important!

<br>

## Existing Routes

The routes are already set up and functioning. Use the table below to navigate through the routes in the `/routes` folder to review how they're working.

| Method | Path       | Additional Info | Result                                         | Response                                  |
| ------ | ---------- | --------------- | ---------------------------------------------- | ----------------------------------------- |
| GET    | /books     |                 | all books                                      | { success: Boolean, payload: Book Array } |
| GET    | /books     | ?search=potter  | all books with “potter” in the title           | { success: Boolean, payload: Book Array } |
| GET    | /books     | ?author=austen  | all books who have “austen” in the author name | { success: Boolean, payload: Book Array } |
| GET    | /books/:id |                 | books with a particular id if it exists        | { success: Boolean, payload: Book }       |
| POST   | /books     | { body }        | create a new book                              | { success: Boolean, payload: Book }       |
| PATCH  | /books/:id | { body }        | updated book                                   | { success: Boolean, payload: Book }       |
| DELETE | /books/:id |                 | book deleted                                   | { success: Boolean, payload: Book }       |

| Method | Path         | Additional Info | Result                                    | Response                                    |
| ------ | ------------ | --------------- | ----------------------------------------- | ------------------------------------------- |
| GET    | /authors     |                 | all authors                               | { success: Boolean, payload: Author Array } |
| GET    | /authors     | ?search=austen  | all authors with “austen” in their name   | { success: Boolean, payload: Author Array } |
| GET    | /authors/:id |                 | authors with a particular id if it exists | { success: Boolean, payload: Author }       |
| POST   | /authors     | { body }        | create a new author                       | { success: Boolean, payload: Author }       |
| PATCH  | /authors/:id | { body }        | updated author                            | { success: Boolean, payload: Author }       |
| DELETE | /authors/:id |                 | author deleted                            | { success: Boolean, payload: Author }       |

<br>

## Code the model functions

During week 4, you've been using the filesystem to read and write data to JSON files.

Now you're going to use an SQL database, so there's no need to use the `fs` module anymore.

Complete the code for each function inside `models/books.js` and `models/authors.js`.

Write your parameterized queries using the `query` method imported at the top of each file.

The routes are already setup up, so once you think you've completed each model, test the API with Postman.

Remember, go step by step, make a plan and break each problem down!

<br>

## Bonus Tasks

Build out your front end. The front-end code lives in the public folder. Interact with your API using `fetch`.
