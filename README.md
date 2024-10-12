# Stage Stories 

## Deployment

[Live Application](https://stage-stories-new.vercel.app/)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aishg-2020/stage-stories
   cd stage-stories

2. Install dependencies:

    ```bash
    npm install

3. Running the Application    

    ```bash
    npm run dev
    The application will be available at http://localhost:3000.

4. Running Playwright Tests

    ```bash
    npx playwright test --ui

### Building for Production

1. To create a production build:

    ```bash
    npm run build

2. After the build is successful, you can start the server in production mode:

    ```bash
    npm run start

## Design and architecture
### Tech stack
* **Next.js (TypeScript)**: Chosen for its built-in features like server-side rendering (SSR) and static site generation (SSG), which help in optimizing performance and SEO.
* **TypeScript**: Using TypeScript enhances code quality and maintainability with static type checking.
* **CSS**: Plain CSS is used for styling to avoid the overhead of external libraries and ensure faster load times.
* **Playwright**: Playwright offers cross-browser testing, automatic waits, parallel execution, network interception, and modern web feature support, enhancing reliability and speed in web application testing.

### Performance And Scalability
* **Minimal External Dependencies**: I avoided using any external libraries to keep the bundle size small, thus improving both performance and loading times.
* **Modular Type Definitions**: I've maintained a single types file that organizes the types in a centralized location. This ensures easy maintenance and scalability when the codebase grows.
* **Component-Based Architecture**: The app follows a component-based architecture, making it easier to extend and scale.
* **Build Optimizations**: Using Next.js's built-in build optimizations to handle both client and server bundles efficiently.


