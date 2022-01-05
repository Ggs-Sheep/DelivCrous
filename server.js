// Requierements
const express = require('express')
const path = require('path')
const mongoose = require("mongoose")
const mongooseSerial = require("mongoose-serial")
const bodyParser = require("body-parser")
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cors = require('cors')

// CORS Options
var corsOptions = {
  origin: 'http://localhost:3001'
};

// Starting Express App
const app = express() 
app.use(express.json())
app.use(cors(corsOptions))
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true })) 

// Default route
app.get("/",(req,res) => {
  res.json({message: "Clarence's DelivCrous API."})
})

// Setting server PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// DB Settings
const db = require("./models/index.js");
const dbConfig = require ("./config/db.config");
const Role = db.role;

// Connecting to DB thanks to config/db.config.js file
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    build_initial_roles();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
});

function build_initial_roles() {
  db.role.estimatedDocumentCount((err, count) => {
    // Checking if roles are pre-built, if not, building them
    if (!err && count === 0) {
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Role 'admin' added to Database");
      });

      new Role({
        name: "vendor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Role 'vendor' added to Database");
      });

      new Role({
        name: "client"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Role 'client' added to Database");
      });
    }
  });
}

// Adding routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/dishes.routes')(app);
