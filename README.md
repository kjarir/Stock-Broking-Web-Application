# Stock Broking Web Application

A modern, secure, and user-friendly web application for stock broking services. Built with Node.js, Express.js, and MongoDB, this application provides a robust platform for users to manage their stock trading activities.

## Features

### 1. User Authentication & Security
- Secure user registration and login system
- Phone number-based authentication
- Session management for secure access
- Password strength indicator for better security
- Automatic logout on session expiry

### 2. User Interface
- Modern and responsive design
- Interactive animations for enhanced user experience
- Clean and intuitive navigation
- Profile dropdown menu with user information
- Mobile-friendly layout

### 3. Dashboard Features
- Real-time stock market updates
- Portfolio management
- Transaction history
- Investment tracking
- Market analysis tools

### 4. Security Features
- Protected routes and endpoints
- Secure session handling
- Input validation and sanitization
- Protection against common web vulnerabilities
- Encrypted password storage

## Technical Stack

### Frontend
- EJS (Embedded JavaScript templates)
- HTML5 & CSS3
- JavaScript (ES6+)
- Responsive design with modern CSS
- Font Awesome icons

### Backend
- Node.js
- Express.js
- MongoDB database
- Mongoose ODM
- Express-session for session management

### Security
- Session-based authentication
- Password hashing
- CSRF protection
- Secure HTTP headers
- Input validation

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Stock-Broking-Web-Application.git
```

2. Install dependencies:
```bash
cd Stock-Broking-Web-Application
npm install
```

3. Set up MongoDB:
- Install MongoDB
- Start MongoDB service
- Database will be created automatically on first run

4. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
Stock-Broking-Web-Application/
├── controllers/          # Route controllers
├── models/              # Database models
├── public/              # Static files
│   ├── stylesheets/    # CSS files
│   └── images/         # Image assets
├── routes/             # Route definitions
├── views/              # EJS templates
├── app.js             # Application entry point
└── package.json       # Project dependencies
```

## Environment Variables

The application uses the following environment variables:
- `PORT`: Application port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `SESSION_SECRET`: Session secret key

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Node.js community
- Express.js framework
- MongoDB team
- All contributors who helped in building this application