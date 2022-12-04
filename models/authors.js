import query from "../db/index.js";

export async function getAuthors() {
  // Query the database and return all authors
  const result = await query(`SELECT * FROM authors ORDER BY first_name ASC`);
  return result.rows;
}

export async function searchAuthorByName(searchTerm) {
  // Query the database and return all authors that have a name matching the searchTerm
  // ?name=henry
  const result = await query(
    `SELECT * FROM authors where UPPER(CONCAT(first_name,' ' , last_name)) LIKE UPPER($1)`,
    [`%${searchTerm}%`]
  );
  return result.rows;
}

export async function getAuthorById(id) {
  // Query the database and return the author with a matching id
  const result = await query(
    `SELECT first_name, last_name FROM 
      authors
    WHERE authors.id = $1`,
    [id]
  );
  return result.rows[0];
}

export async function createAuthor(book) {
  // Query the database to create an author and return the newly created author
  // const { first_name, last_name } = book
  const result = await query(
    `INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING *`,
    [book.first_name, book.last_name]
  );
  return result.rows[0];
}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author
  const result = await query(
    ` UPDATE authors SET 
      first_name= $1,
      last_name= $2
      WHERE
      id=$3 RETURNING *`,
    [updates.first_name, updates.last_name, id]
  );
  return result.rows[0];
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author
  const result = await query(`DELETE FROM authors WHERE id=$1 RETURNING *`, [
    id,
  ]);
  return result.rows[0];
}
