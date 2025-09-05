# Entravel - Flight Search

## About the Project

Entravel is a simple flight search application developed using React, TypeScript, and Vite. It allows users to search for flights by selecting flight type (one-way or round-trip), flight class, departure and arrival cities, departure and return dates, and the number of passengers.

The application uses the real Kiwi API (via RapidAPI) to retrieve flight data, demonstrating work with live requests.

## Functionality

- **Flight Search:** Select departure and arrival cities, dates, flight type, and class.
- **Passenger Selection:** Specify the number of adults, children, and infants.
- **Filtering:** Choose between one-way/round-trip flight types and flight classes (Economy, Business, etc.).
- **Information Modal:** A modal window appears on the first launch of the application with important project information and potential API limitations.
- **Clear Filters:** A button to reset all search parameters to their default values.

## Getting Started

Follow these instructions to get the project up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/entravel-app.git
cd entravel-app
```

Replace `YOUR_USERNAME` and `entravel-app` with your actual repository details.

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Application in Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port specified in the console).

### 4. Create a Production Build

```bash
npm run build
# or
yarn build
```

This command will create a production-optimized build of your application in the `dist/` folder.

### 5. Deploy to GitHub Pages

1.  **Install `gh-pages`:**

    ```bash
    npm install gh-pages --save-dev
    # or
    yarn add gh-pages --dev
    ```

2.  **Configure `package.json`:**
    Add the `homepage` field and `predeploy` and `deploy` scripts:

    ```json
    {
      "name": "entravel",
      "private": true,
      "version": "0.0.0",
      "type": "module",
      "homepage": "https://YOUR_USERNAME.github.io/entravel-app",
      "scripts": {
        "dev": "vite",
        "build": "tsc -b && vite build",
        "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview",
        "predeploy": "npm run build",
        "deploy": "gh-pages -d dist"
      },
      "dependencies": {
        // ... your dependencies ...
      },
      "devDependencies": {
        "gh-pages": "^6.1.1"
        // ... other devDependencies ...
      }
    }
    ```

    **Important:** Replace `YOUR_USERNAME` and `entravel-app` with your actual values.

3.  **Deploy the Application:**

    ```bash
    npm run deploy
    # or
    yarn deploy
    ```

4.  **Configure GitHub Pages in the Repository:**
    Go to `Settings` -> `Pages` on GitHub, select the `gh-pages` branch and the `/ (root)` folder for deployment.
