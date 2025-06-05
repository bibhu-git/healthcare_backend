# Healthcare Management System - Backend API

A simple and secure backend API for managing patients, doctors, and their assignments.  
This API allows users to register, log in, and perform CRUD operations on patients and doctors. Users can also assign doctors to patients and view these assignments.

---

## Features

-  User registration and authentication with JWT  
-  Manage patients and doctors associated with each user  
-  Assign doctors to patients via a mapping table  
-  Secure routes with authentication middleware  
-  Basic error handling and input validation  

---

## Setup and Run

1. **Clone the repository**  
   ```bash
   git clone https://github.com/bibhu-git/healthcare_backend
   cd healthcare_backend

2. **Install dependencies**

    npm install

3. **Create a .env file in the project root with the following variables:**

    DATABASE_URL=your_postgres_database_url,
    JWT_SECRET=your_jwt_secret_key


4. **Start the server**

    npm start

---

**Author**

Developed by Bibhu Ranjan Mohanty

