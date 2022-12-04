import query from "../db/index.js";

export async function getBooks() {
  // Qexport uery the database and return all books
  const result = await query(`SELECT * from books`);
  return result.rows;
}

export async function searchBooksByTitle(searchTerm) {
  // Qexport uery the database and return all books that have a matching title matching the searchTerm
  const result = await query(
    `SELECT * FROM books WHERE UPPER(title) LIKE UPPER($1)`,
    [`%${searchTerm}%`]
  );
  return result.rows;
}

export async function searchBooksByAuthor(searchTerm) {
  // Query the database and return all books that have an author name matching the searchTerm
  const result = await query(
    `
  SELECT books.title FROM 
  books
  INNER JOIN
  authors
  ON authors.id = books.author_id
  WHERE UPPER(CONCAT(authors.first_name, ' ', authors.last_name)) LIKE UPPER($1)`,
    [`%${searchTerm}%`]
  );
  return result.rows;
}

export async function getBookById(id) {
  // Query the database and return the book with a matching id
  const result = await query(`SELECT * FROM books where id = $1`, [id]);
  return result.rows;
}

export async function createBook(book) {
  // Query the database to create a book and return the newly created book
  const result = await query(
    `INSERT INTO books(author_id, title, published_date) 
    VALUES
    ($1, $2, $3) RETURNING *`,
    [book.author_id, book.title, book.published_date]
  );
  return result.rows;
}

export async function updateBookById(id, updates) {
  // Query the database to update a book and return the newly updated book
  const result = await query(
    `UPDATE books SET title=$1, published_date=$2 WHERE id=$3 RETURNING *`,
    [updates.title, updates.published_date, id]
  );
  return result.rows;
}

export async function deleteBookById(id) {
  // Query the database to delete a book and return the deleted book
  const result = await query(`DELETE FROM books WHERE id=$1 RETURNING *`, [id]);
  return result.rows;
}
