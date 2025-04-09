const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {db }=require('./db')
const app = express();

app.use(express.json());
app.use(cors({origin:"*"}));



const formRoutes = require('./routes/formRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');  

app.use('/form', formRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes); 
app.get("/",async (req,res)=>{
    res.send({mag:"hello"})
})

app.listen(5000, async () => {
    await db
    console.log('Server started on port 5000');

})