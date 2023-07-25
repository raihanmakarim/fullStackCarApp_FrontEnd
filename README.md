

# Full Stack Car App - Frontend

This is the frontend part of the Full Stack Car App project. It is built with React and uses Vite as the development tool. The frontend provides a user interface for managing cars, user authentication, and displaying car promotions.

## Getting Started

To get started with the frontend of the Full Stack Car App, follow these steps:

### Prerequisites

1. Make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone the repository from GitHub.

\`\`\`bash
git clone https://github.com/raihanmakarim/fullstackcarapp-frontend.git
\`\`\`


2. Install the required dependencies.

\`\`\`bash
npm install
\`\`\`

### Configuration

Before running the frontend, you need to configure the backend API endpoint. Open the \`src/config.js\` file and update the value of \`API_BASE_URL\` with the URL of your backend API.

\`\`\`javascript
const config = {
  API_BASE_URL: 'http://localhost:3001' // Replace with your backend API URL
};

export default config;
\`\`\`

### Running the Development Server

After completing the installation and configuration, you can start the development server by running the following command:

\`\`\`bash
npm run dev
\`\`\`

The development server will start running at http://localhost:3000. Open your web browser and visit this URL to access the Full Stack Car App.

### Building for Production

If you want to build the frontend for production, you can run the following command:

\`\`\`bash
npm run build
\`\`\`

The production build will be generated in the \`dist\` directory.

### Linting

To lint the code and check for any potential errors or style violations, you can run the following command:

\`\`\`bash
npm run lint
\`\`\`

The linter will provide feedback on the code quality and adherence to coding standards.

## Usage

The frontend of the Full Stack Car App provides the following features:

- View a list of all cars available.
- View details of a specific car.
- Add a new car (requires authentication).
- Edit an existing car (requires authentication).
- Delete a car (requires authentication).
- User registration and login.
- Log out.

## Contributing

If you want to contribute to the Full Stack Car App project, feel free to submit pull requests or report issues on the GitHub repository.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- The Full Stack Car App was developed as part of a learning project and may be subject to updates and improvements.
- Special thanks to the authors of the open-source packages used in this project.

