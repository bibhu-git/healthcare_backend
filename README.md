Healthcare Management System
Project Overview
This project is a Healthcare Management System built using Node.js, Express, and PostgreSQL with Sequelize ORM. It allows users to manage patients, doctors, and the relationships between them efficiently.
Features
•	User registration and login with secure password hashing and JWT authentication.
•	Manage Patients and Doctors associated with a user.
•	Create, read, and delete mappings between Patients and Doctors.
•	Role-based data access ensuring users can only access their own patients and mappings.
Technologies Used
•	Node.js
•	Express.js
•	PostgreSQL
•	Sequelize ORM
•	JWT for authentication
•	bcrypt for password hashing
•	dotenv for environment variables
Setup Instructions
1.	Clone the repository.
2.	Run `npm install` to install dependencies.
3.	Create a `.env` file with your database URL and JWT secret.
4.	Run database migrations and seeders if applicable.
5.	Start the server using `npm start` or `node index.js`.
6.	Use Postman or any API client to test the endpoints.
API Endpoints
The main endpoints include:
- POST /api/auth/register: Register a new user
- POST /api/auth/login: Login user and get JWT token
- Patient CRUD endpoints (secured)
- Doctor CRUD endpoints (secured)
- Mappings endpoints to manage patient-doctor assignments
Author
Developed by Bibhu Ranjan Mohanty
