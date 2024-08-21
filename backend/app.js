const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const adminRoutes = require('./routes/admin');
const chatRoutes = require('./routes/chat');
const messageRoutes = require('./routes/message');
// const restrictedUserOnly =  require('./middleware/auth');

const app = express();
app.set('view engine', 'ejs');
//  to use the static routes in the project like want to fetch data from the assets folder 
// app.use(express.static('assets'));
 
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'X-uid'],
    exposedHeaders:'X-uid',
    credentials: true 
}));
app.options('*', cors());
app.use(cookieParser());
app.use('/', adminRoutes);
app.use('/chat',chatRoutes);
app.use('/message',messageRoutes);
// app.use('/users', userRoutes);
const port = config.server.PORT;
app.listen(port, (err) => {
    if (err) {
        console.log('Error occurred: ' + err);
    }
    console.log(`Server is running on port ${port}`);
});
