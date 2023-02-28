const express=require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const sequelize=require('./util/database');

const userRoutes=require('./routes/user');


const cors=require("cors");
const app=express();

app.use(cors({
    origin:"http://127.0.0.1:5501",
    credentials:true,
}));

app.use(bodyParser.json({ extended: false }));

app.use('/user',userRoutes);



sequelize.sync()
.then(result=>{
    app.listen(process.env.PORT);
}).catch(err=>{
    console.log(err);
});