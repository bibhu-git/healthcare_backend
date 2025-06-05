Healthcare Management System
This is a simple backend API for managing patients, doctors, and their mappings. It allows users to register, login, and perform CRUD operations on patients and doctors. Users can also assign doctors to patients and view those assignments.


Features
•	User registration and authentication with JWT.
•	Manage patients and doctors associated with a user.
•	Assign doctors to patients using a mapping table.
•	Secure routes with authentication middleware.
•	Basic error handling and validation.
Setup and Run
1. Clone the repository.
2. Run 'npm install' to install dependencies.
3. Create a .env file with the following variables:
   - DATABASE_URL=your_postgres_database_url
   - JWT_SECRET=your_jwt_secret_key
4. Run the migrations or sync the Sequelize models.
5. Start the server using 'npm start' or 'node index.js'.

API Endpoints
Some important API endpoints:
1.	POST /api/auth/register - Register a new user
2.	POST /api/auth/login - Login and receive a JWT token
3.	POST /api/patients - Create a patient (authenticated)
4.	GET /api/patients/:id - Get patient details (authenticated)
5.	POST /api/doctors - Create a doctor (authenticated)
6.	POST /api/mappings - Assign a doctor to a patient (authenticated)
7.	GET /api/mappings - Get all mappings for a user's patients (authenticated)
8.	DELETE /api/mappings/:id - Delete a doctor-patient mapping (authenticated)
Technologies Used
•	Node.js and Express.js for server and API
•	Sequelize ORM for PostgreSQL database interaction
•	JWT for authentication
•	bcrypt for password hashing
•	dotenv for environment variable management
