const express=require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const sequelize=require('./util/database');

const userRoutes=require('./routes/user');


var cors=require('cors');
const app=express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use('/user',userRoutes);



sequelize.sync()
.then(result=>{
    app.listen(process.env.PORT);
}).catch(err=>{
    console.log(err);
});