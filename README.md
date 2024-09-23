# BeerTracker

BeerTracker is a simple application for tracking beer (and other products) in a warehouse. It allows users to manage products, track inventory, and record transactions.

## Project Structure

```
BeerTracker/
├── frontend/         # Vite + React TypeScript frontend
├── backend/          # Go backend API
└── docker-compose.yml
```

## Prerequisites

- Docker and Docker Compose
- Go 1.21+ (for running backend separately)
- Node.js 14+ and npm (for running frontend separately)

## Running with Docker Compose

To run the entire application stack (frontend, backend, and database) using Docker Compose:

1. Clone the repository:
   ```
   git clone git@github.com:puunukk/BeerTracker.git
   cd BeerTracker
   ```

2. Build and start the services:
   ```
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

To stop the application, press `Ctrl+C` in the terminal where docker-compose is running, or run:
```
docker-compose down
```

## Running Projects Separately

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   go mod download
   ```

3. Set up your PostgreSQL database and update the `.env` file with your database credentials.

4. Run the backend:
   ```
   go run cmd/api-server/main.go
   ```

The API will be available at `http://localhost:8080`.

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The frontend will be available at `http://localhost:3000`.

## API Endpoints

- `GET /products`: Get all products
- `POST /products`: Create a new product
- `PUT /products/{id}`: Update a product
- `DELETE /products/{id}`: Delete a product
- `GET /transactions`: Get all transactions
- `POST /transactions`: Create a new transaction
- `GET /users`: Get all users
- `POST /users`: Create a new user
- `PUT /users/{id}`: Update a user
- `DELETE /users/{id}`: Delete a user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.