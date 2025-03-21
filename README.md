# Movie Suggestion App

This is the **Movie Suggestion App** built using **React JS**. The app utilizes the **TMDB API** to fetch movie details. Users can view popular movies, search for their favorite movies, and navigate to other pages to view unlimited results.

### Live Demo
You can view the live demo of the app here: [movie-suggestion-react.netlify.app](https://movie-suggestion-react.netlify.app/)

## Features
- View popular movies on the homepage
- Search for your favorite movies
- Page navigation to explore more movie results
- Search optimization using debouncing for faster results
- Clean, modern UI styled with **Tailwind CSS**
- Fast and responsive design

## Technologies Used
- **React JS**: JavaScript library for building the user interface
- **TMDB API**: Provides movie data
- **Netlify**: For deployment
- **ViteJS**: Fast build tool for the project
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Appwrite**: Backend-as-a-service used for database management (optional for storing app data)
- **Icons8**: For icons used throughout the app
- **Debouncing**: Optimizes the search functionality to reduce API calls
- **Page Navigation**: Allows users to navigate through movie results seamlessly

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/movie-suggestion-app.git
cd movie-suggestion-app
```

### 2. Install dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of the project directory. Add the following variables to the `.env.local` file:

```bash
VITE_TMBD_API_KEY=<your_tmdb_api_key>
VITE_APPWRITE_PROJECT_ID=<your_appwrite_project_id>
VITE_APPWRITE_DATABASE_ID=<your_appwrite_database_id>
VITE_APPWRITE_COLLECTION_ID=<your_appwrite_collection_id>
```

Replace the placeholders (`<your_tmdb_api_key>`, `<your_appwrite_project_id>`, etc.) with your actual API keys and project details.

### 4. Run the app

To start the development server, run:

```bash
npm run dev
```

This will start the app at `http://localhost:3000`. Open your browser and navigate to the URL to see the app in action.

## Usage

- **Movie Suggestions**: The app will suggest movies based on predefined genres.
- **Search Functionality**: You can search for specific movies by name.
- **Responsive Design**: The app is built to be fully responsive across different screen sizes.

## Contributing

If you would like to contribute to the project, feel free to fork the repository, create a branch, and submit a pull request. Ensure your changes are well-tested and adhere to the existing code style.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

If you encounter any issues or have suggestions, feel free to open an issue on the GitHub repository.

Happy coding! 🎬🍿
