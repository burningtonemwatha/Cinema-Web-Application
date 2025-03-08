# Cinema Web Application

## Overview
This is a web application that allows users to submit their favorite cinema-related preferences. It features user authentication, session management, and secure data handling.

## Features
- **Frontend:** Built using HTML, CSS, and JavaScript.
- **Authentication:** User login and registration with secure password hashing.
- **Session Management:** Uses cookies and sessions to maintain user state.
- **Database Security:** Prevents SQL injection using prepared statements.
- **Backend:** Developed with Node.js and Express.js.
- **Database:** MySQL with a connection pool.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL (with MySQL2 Promise)
- **Security:** bcrypt for password hashing, prepared statements to prevent SQL injection

## Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cinema-webapp.git
   cd cinema-webapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and configure your database:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=webapp
   ```

4. Run database migrations (create tables):
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(50) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL
   );
   
   CREATE TABLE cinema_responses (
       id INT AUTO_INCREMENT PRIMARY KEY,
       favorite_movie VARCHAR(255),
       favorite_character VARCHAR(255),
       universe VARCHAR(255),
       favorite_genre VARCHAR(255),
       favorite_director VARCHAR(255),
       comments TEXT,
       user_id INT,
       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );
   ```

5. Start the server:
   ```bash
   node server.js
   ```

6. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## API Endpoints
| Method | Endpoint         | Description           |
|--------|----------------|-----------------------|
| POST   | /auth/register | Register a new user  |
| POST   | /auth/login    | Log in a user        |
| POST   | /auth/logout   | Log out a user       |
| POST   | /submit-cinema | Submit cinema data   |

## Security Measures
- **Password Hashing:** All passwords are hashed using bcrypt.
- **Session Management:** Uses cookies for maintaining user sessions.
- **SQL Injection Prevention:** All database queries use prepared statements.

## Contribution
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your fork (`git push origin feature-branch`).
5. Create a pull request.

## License
This project is licensed under the MIT License.
