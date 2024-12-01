# MEVN CRUD Library Application

This is a full-stack web application built using the MEVN stack (MongoDB, Express.js, Vue.js, and Node.js). The application allows users to manage books and genres in a library system with full CRUD (Create, Read, Update, Delete) functionality.

## Features

- **User Authentication**
  - Register and login functionality
  - Protected routes accessible only to authenticated users
- **Book Management**
  - Add new books with title, author, genre, and description
  - View a list of all books
  - Update book details
  - Delete books
- **Genre Management**
  - Add new genres
  - View a list of all genres
  - Update genre names
  - Delete genres
- **User Profile**
  - View and edit user profile information
- **API Documentation**
  - Swagger UI for API testing and documentation at `/api-docs`

## Technologies Used

### Frontend

- Vue.js 3
- Vue Router
- Vuex
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Express Validator for input validation
- Swagger for API documentation

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Git installed

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/comp1842-coursework.git
   cd comp1842-coursework
   ```
2. **Backend Setup**
    ```bash
    cd server
    npm install
    ```
    - Create a `.env` file in the `server/` directory with the following contents:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ``` 
    - Start the backend server
    ```bash
    npm run dev
    ```
3. **Frontend Setup**
    ```bash
    cd ../client
    npm install
    ```
    - Start the frontend development server:
    ```bash
    npm run dev
    ```
4. **Access the Application**
    - Open your browser and navigate to `http://localhost:5173`

## Usage
- **Register** a new account or **login** if you already have one.
- **Manage Books:**
    - Navigate to the Books section to add, view, update, or delete books.
- **Manage Genres:**
    - Navigate to the Genres section to add, view, update, or delete genres.
- **Edit Profile:**
    - Access your profile to view or edit your personal information.

## Project Structure
### Backend (`server` directory)
```
server/
├── app.js
├── server.js
├── swagger.js
├── config/
|   ├── db.js
├── controllers/
|   ├── authController.js
|   ├── bookController.js
|   ├── genreController.js
|   ├── profileController.js
├── middleware/
|   ├── auth.js
├── models/
|   ├── book.js
|   ├── genre.js
|   ├── user.js
├── routes/
|   ├── authRoutes.js
|   ├── bookRoutes.js
|   ├── genreRoutes.js
|   ├── profileRoutes.js
└── .env
```
### Frontend (`client` directory)
```
client/
├── src/
|   ├── assets/
|   |   ├── tailwind.css
|   ├── components/
|   |   ├── alerts/
|   |   |   ├── ConfirmDialog.vue
|   |   ├── Book/
|   |   |   ├── BookDetails.vue
|   |   |   ├── BookForm.vue
|   |   ├── Genre/
|   |   |   ├── GenreForm.vue
|   |   ├── layout/
|   |   |   ├── AppLayout.vue
|   |   |   ├── Navbar.vue
|   |   ├── Profile/
|   |   |   ├── DeleteAccountModal.vue
|   |   |   ├── ProfileForm.vue
|   ├── pages/
|   |   ├── Authentication/
|   |   |   ├── Login.vue
|   |   |   ├── Register.vue
|   |   ├── Book/
|   |   |   ├── BookDetailsPage.vue
|   |   |   ├── BookList.vue
|   |   ├── Genre/
|   |   |   ├── GenreList.vue
|   |   ├── Profile/
|   |   |   ├── UserProfile.vue
|   |   ├── Home.vue
|   ├── router/
|   |   ├── index.js
|   ├── store/
|   |   ├── auth.js
|   ├── utils/
|   |   ├── axios.js
|   ├── App.vue
|   ├── main.js
|   ├── tailwind.config.js
|   └── postcss.config.js
```

## API Documentation
- The API is documented using Swagger
- Access the documentation at `http://localhost:3000/api-docs`

## License
This project is licensed under the MIT License.

## Acknowledgments
- Thanks to all the open-source contributors and the MEVN community.