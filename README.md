# simple-library

___
## Install Project

### Clone the Repository
```bash
git clone git@github.com:thinking-fullstack/simple-library.git
cd simple-library
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a .env file in the root of the project and define the following variables:
```env
VITE_API_URL=http://localhost:8080
```

### Install Mock APIs
Install latest [Mockoon v9.1.0](https://mockoon.com) tool to install REST APIs. \
Download the application according to your operating system. \
https://mockoon.com/download/

Open the mockoon application and import the `api.json` file in the project root folder. \
`File > Open local environment`

### Run the Development Server
```bash
npm run dev
```
The application will be available at http://localhost:5173.

### Build for Production
```bash
npm run build
```
The production build will be located in the dist folder.

### Preview for Production
```bash
npm run preview
```
It will serve the built solution form `./dist` for previewing.

### Run Unit Tests
```bash
npm run test
```

___
## Tech Stack
- **Programming Language**: Typescript
- **Framework**: Vue 3
- **Module Builder**: Vite
- **Package Manager**: npm
- **Authentication**: JWT
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS + Headless UI
- **Store**: Pinia
- **Form Validation**: Vee-validate
- **Unit Testing**: Vue Test Utils + Vitest

___
## Features

### User Registration and Authentication
- **Registration**: Users can create an account by providing a username, email, and password.
- **Login**: Users can log in using their email and password.
- **JWT Tokens**: Authentication is implemented using JSON Web Tokens (JWT) to ensure secure access.

### CRUD Operations for Books
- **Add Books**: Users can add new books with details such as title, author, genre, publication date, and description.
- **View Books**: Display a list of all books or view individual book details.
- **Edit Books**: Users can update book information.
- **Delete Books**: Users can delete books, with a confirmation prompt before deletion.

### Search and Filtering
- **Search**: Search books by title, author, or genre.
- **Filter**: Filter books by publication date.

### Comments
- **Add Comments**: Users can add comments to books.
- **View Comments**: Display a list of comments for each book.
- **Delete Comments**: Users can delete their own comments, with a confirmation prompt before deletion.

### Things Can Be Improved and Added in the Future
- **Real-time updates for Comments**: We can use Socket.io to display the updates of comments in real-time.
- **Pagination for Books**: We can implement pagination or infinite scroll to display a lot of books.
- **Role-Based Access Control**: We can implement role-based access control for books (e.g., admin users can manage all books).
- **Book Cover Images**: We can use third-party library to upload book cover images (e.g., AWS-S3).
