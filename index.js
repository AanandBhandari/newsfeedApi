const express  = require('express');
const app  = express();
const passport = require('passport')
const PORT  = process.env.PORT || 3000;
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

app.use(express.static('./uploads/'));

const run = async () => {
    await mongoose.set('useCreateIndex', true)
    .connect('mongodb://localhost:27017/newsfeed', {useNewUrlParser: true});
    console.log('sucessfully connected to the database')
  }
run().catch(error => console.error('cannot connect to the database server '+error))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
require('./config/passport').isAdmin(passport);
require('./config/passport').isLogin(passport);
require('./config/passport').googleStrategy(passport);

app.use('/api', require('./routes/routes.js'));

  app.listen(PORT, ()=>{
    console.log(`App started at PORT ${PORT}`)
  });
  