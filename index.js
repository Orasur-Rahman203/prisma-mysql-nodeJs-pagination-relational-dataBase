const express = require("express");
const userRoutes=require('./route/user')
const app = express();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

//connection
app.use(express.json())
async function checkDbCOnnection() {
    await prisma.$connect().then(() => {
        console.log("DB connection established")
    }).catch(() => {
        console.log("Error connecting DB")
    })
}
checkDbCOnnection()
//middleware  -plugin
app.use(express.urlencoded({extended: false}))

//routes
app.use('/api/users', userRoutes)

app.listen(8000, () => console.log(`Server is running on port ${8000}`));
