import express from 'express';
import web from './routes/web.js';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';

const app = express();
const PORT = 3000;

// Session configuration
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false, // set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

// Make user data available to all views
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Authentication middleware
const requireAuth = (req, res, next) => {
    // Public routes that don't need authentication
    const publicRoutes = ['/login', '/signup', '/', '/logout', '/dashboard'];
    
    // Allow all public routes and static files
    if (publicRoutes.includes(req.path) || req.path.startsWith('/stylesheets/') || req.path.startsWith('/images/')) {
        return next();
    }

    // Check if user is authenticated for protected routes
    if (!req.session.user) {
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        return res.redirect('/login');
    }
    next();
};

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Apply authentication middleware to all routes
app.use(requireAuth);

app.use('/', web);

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Stock-Broking');
        console.log('Connected Successfully..');
    } catch (error) {
        console.log(error);
    }
}
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
