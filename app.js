const path = require('path')
const express = require("express")
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const morgan = require('morgan')
const i18nModule = require('i18n');

const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

//Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))
// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars helper
const { formatDate, truncate, stripTags, editIcon, select, i18n, __n, url } = require('./helpers/hbs')

// Handlebars
app.engine(
    '.hbs',
    exphbs.engine({
        helpers: {
            formatDate,
            truncate,
            stripTags,
            editIcon,
            select,
            i18n,
            __n,
            url,
        },
        defaultLayout: 'main',
        extname: '.hbs',
    })
)

i18nModule.configure({
    locales: ['fr', 'en'],
    //List of available languages

    cookie: 'locale',
    //Name of the cookie this preference is going to be stored
    directory: __dirname + '/locales',
    //Where the dictionaries will be stored
    //(This directory and the available dictionary JSON files are generated by the module automatically)
    defaultLocale: 'en',
    //Which will be the default language loaded if the language requested by the browser is not available
});

app.set('view engine', '.hbs')

app.use(i18nModule.init)

// Sessions 
app.use(session({
    secret: 'RUHhrymN9vyKov9DSi',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/batches', require('./routes/batches'))
app.use('/batches', require('./routes/entries'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

