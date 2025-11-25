# Social Media Application Frontend

This is the frontend for a modern social media application, built with React and Vite. It provides a dynamic and responsive user interface for interacting with a social media platform, including features like user authentication, a news feed, post creation, and commenting.

## Key Features

-   **User Authentication**: Secure user registration and login functionality.
-   **Private Routes**: Protected routes that ensure only authenticated users can access the main application.
-   **Dynamic News Feed**: A central feed to view and interact with posts from other users.
-   **Post Management**: Ability for users to create their own posts.
-   **Commenting System**: Functionality to add and view comments on posts.
-   **State Management**: Centralized state management using Redux Toolkit for a predictable state container.
-   **API Integration**: Seamless communication with a backend API using Axios.

## Technologies & Libraries Used

-   **Core Framework**: [React](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
-   **API Client**: [Axios](https://axios-http.com/)
-   **Styling**:
    -   [Bootstrap](https://getbootstrap.com/)
    -   Custom CSS Modules
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
-   **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
-   **Date Formatting**: [date-fns](https://date-fns.org/)
-   **Linting**: [ESLint](https://eslint.org/)

## Folder Structure

The project follows a standard React application structure, organized for scalability and maintainability.

```
social-media-application-frontend/
├── public/              # Static assets (images, fonts, etc.)
├── src/
│   ├── api/             # Axios instances and API call definitions (auth, posts, comments)
│   ├── components/      # Reusable UI components (layout, post, comment)
│   ├── pages/           # Top-level page components (Feed, Login, Register)
│   ├── redux/           # Redux store, slices, and actions
│   ├── utils/           # Utility functions and constants
│   ├── App.jsx          # Main application component with routing
│   ├── main.jsx         # Entry point of the application
│   └── index.css        # Global styles
├── .env                 # Environment variables (must be created locally)
├── .gitignore           # Git ignore file
├── index.html           # Main HTML template
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18.x or higher recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/your-username/social-media-application-frontend.git
    cd social-media-application-frontend
    ```

2.  Install the required npm packages:
    ```sh
    npm install
    ```

### Environment Configuration

The application requires a backend API to function correctly.

1.  Create a `.env` file in the root of the project.
2.  Add the base URL for your backend API to the `.env` file:
    ```
    VITE_API_BASE_URL=http://your-backend-api-url.com
    ```
    Replace `http://your-backend-api-url.com` with the actual URL of your running backend server.

### Running the Application

Once the dependencies are installed and the environment is configured, you can start the development server:

```sh
npm run dev
```

This will start the Vite development server, and you can view the application by navigating to `http://localhost:5173` (or the URL provided in the terminal) in your web browser.

## Available Scripts

In the project directory, you can run the following commands:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the project files using ESLint.
-   `npm run preview`: Serves the production build locally to preview it.