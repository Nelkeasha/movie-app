# 🎬 Entertainment Web App

A responsive, full-stack entertainment application that allows users to browse movies and TV series, search for content, and curate a personal list of bookmarked shows. Built with the **MERN Stack** (MongoDB, Express, React, Node.js).

![Project Preview](./movie_app_desktop.png)

## ✨ Features

-   **User Authentication**: Secure Sign Up and Login functionality using JWT (JSON Web Tokens).
-   **Personalized Bookmarks**: Users can bookmark their favorite Movies and TV Series. Bookmarks are stored persistently in the database per user.
-   **Responsive Design**: Fully responsive layout optimized for Desktop, Tablet, and Mobile devices using Tailwind CSS.
-   **Dynamic Content**: Browse "Trending" content, strictly Movies, or strictly TV Series.
-   **Search Functionality**: Real-time filtering of content by title.
-   **Secure Backend**: RESTful API built with Express.js and MongoDB, featuring protected routes and password hashing (bcrypt).

## 🛠️ Tech Stack

### Frontend
-   **React** (Vite)
-   **Tailwind CSS** (Styling)
-   **React Router** (Navigation)
-   **Context API** (State Management)

### Backend
-   **Node.js & Express** (Server)
-   **MongoDB & Mongoose** (Database)
-   **JWT & Bcrypt** (Authentication)
-   **Cors** (Cross-Origin Resource Sharing)

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
-   **Node.js** (v16 or higher)
-   **MongoDB** (Local instance or Cloud URI)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd entertainment-web-app
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    *   Ensure your MongoDB server is running locally on `mongodb://127.0.0.1:27017/entertainment-app` (or configure a `.env` file).
    *   **Seed the Database**: Run the seed script to populate initial movie data.
        ```bash
        node seed.js
        ```
    *   **Start the Server**:
        ```bash
        node server.js
        ```
    *   The server should start on `http://localhost:3000`.

3.  **Frontend Setup**
    Open a new terminal window:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    *   The application will run on `http://localhost:5173`.

## 📂 Project Structure

```
/
├── backend/            # Express Server & MongoDB Models
│   ├── controllers/    # Route Logic
│   ├── models/         # Mongoose Schemas (User, Movie)
│   ├── routes/         # API Endpoints
│   ├── services/       # Business Logic
│   └── server.js       # Entry Point
│
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI Components (Sidebar, Cards)
│   │   ├── context/    # AuthContext
│   │   ├── layouts/    # Main Layout Wrapper
│   │   ├── pages/      # Views (Home, Login, Signup, Movies)
│   │   └── App.jsx     # Routing & Setup
```

## 🔐 API Reference

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login user & get Token | ❌ |
| `GET` | `/api/entertainment` | Get all movies (supports search/filter) | 🔓 (Optional) |
| `POST` | `/api/entertainment/bookmark` | Toggle bookmark for a movie | ✅ |
| `GET` | `/api/entertainment/bookmarked` | Get user's bookmarked movies | ✅ |

## 👨‍💻 Developer

Developed with ❤️ using modern web best practices.
