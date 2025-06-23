##Installation & Setup
To set up the project, follow these steps:
#basic need - node js, express, mongoose, typescript
1. Initialize the Node.js project - npm init -y
2. Set up TypeScript - tsc --init
3. Update your tsconfig.json with the following:
{
  "rootDir": "./src",
  "outDir": "./dist"
}
4. Install necessary packages:
   - npm install express mongoose dotenv cors ts-node-dev
5. Add this script to your package.json:
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
}

### API Endpoints For Books
The following endpoints are available for managing books in the library:
1. POST - /api/books - Create a new book
2. GET - /api/books	- Get all books (supports query filter, sort, limit)
3. GET - /api/books/:bookId	 - Get details of a specific book by ID
4. PUT - /api/books/:bookId	 - Update a specific book by ID
5. DELETE - /api/books/:bookId	- Delete a specific book by ID

### API Endpoints For Borrowing Books
The following endpoints are available for borrowing books:
1. POST - /api/borrow - Borrow a book
2. GET - /api/borrow/summary - Get a summary of borrowed books (aggregate, grouped by book title and ISBN)