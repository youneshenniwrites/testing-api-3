# Nationality Finder

A simple React application that uses the [Nationalize.io API](https://nationalize.io/) to predict the nationality of a name. The app fetches data from an API, processes it, and displays the most probable country based on the provided name.

---

## Table of Contents

  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Technologies](#technologies)
  - [Features](#features)
  - [How to Use](#how-to-use)
  - [Folder Structure](#folder-structure)
  - [Customization](#customization)
  - [Contributing](#contributing)
  - [License](#license)

---

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/nationality-finder.git
   cd nationality-finder
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory to store the environment variables:

   ```env
   VITE_NATIONALIZE_API_URL=https://api.nationalize.io
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   Now, open your browser and go to `http://localhost:3000` to see the app in action.

---

## Technologies

- **React** (Frontend Framework)
- **Vite** (Build Tool)
- **Tailwind CSS** (Utility-first CSS framework)
- **Custom Hooks** (For API calls and debouncing)
- **Nationalize API** (To get nationality predictions)

---

## Features

- **Search by name**: Enter a name, and the app predicts the most likely nationality using Nationalize.io.
- **Debounced input**: The app waits for the user to stop typing before sending an API request, preventing unnecessary calls.
- **Loading and error handling**: Displays a loading spinner while fetching data and handles any errors gracefully.
- **Responsive design**: Fully responsive with Tailwind CSS to ensure the app works across devices.

---

## How to Use

1. **Search for a name**: Enter a name into the input field. The app will automatically debounce the input and fetch results after typing stops.
2. **View the result**: Once the data is fetched, the app displays the predicted nationality.
3. **Handle loading and errors**: While fetching, a loading spinner is displayed. If an error occurs, a message is shown.

---

## Folder Structure

```
/src
  /api
    nationalityService.js   // Contains the API call logic
  /components
    NationalityInput.js     // Input field for the user to type a name
    NationalityResult.js    // Displays the predicted nationality
  /hooks
    useFetchNationality.js  // Custom hook for fetching nationality data
    useDebounce.js          // Custom hook for debouncing input
  /constants
    api.js                  // Contains the API base URL
  /utils
    computeHighestProbabilityCountry.js  // Helper function to process the API response
/App.js                    // Main App component
/App.css                   // Global styles (optional)
```

---

## Customization

- **Change the API URL**: If you'd like to use a different API or endpoint, modify the value in the `.env` file:

  ```env
  VITE_NATIONALIZE_API_URL=https://new-api-url.com
  ```

- **Styling**: Customize the styling using Tailwind CSS classes. You can adjust colors, layout, spacing, etc., by modifying the respective components like `App.js`, `NationalityInput.js`, and `NationalityResult.js`.

- **Add additional APIs**: You can easily extend the app by integrating other APIs. Just update the `nationalityService.js` file or create new ones for different services.

---

## Contributing

We welcome contributions to this project! If you'd like to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your fork (`git push origin feature-name`).
5. Create a pull request.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
