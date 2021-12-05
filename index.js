const express = require("express");


const app = express();

const db = require("./models")

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const apiRouter = require("./routes/api.routes");
app.use("/api", apiRouter);

db.sequelize.sync().then(()=>{
app.listen(3000, ()=>{
    console.log("port is listening at 3000");
})
})