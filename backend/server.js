import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(express.json({ limit: '30mb', extended: true }))  // to parse body in json format (body parser)
app.use(express.urlencoded({limit: '30mb',extended:true}))
const PORT= process.env.PORT || 1307
const uri  = "mongodb+srv://shriabishri:MyFamily1915@abishri.5x4yote.mongodb.net/FoodExpress?retryWrites=true&w=majority";

mongoose.connect(uri,
    err => {
        if(err) throw err;
        console.log('Connected to Food express DB...')
    });

app.use(cors())



app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
});