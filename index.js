const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const categoryRouter=require("./routes/admin/category");
const adminRouter=require("./routes/admin/admin");
const app=express();
const Port=8090;
app.listen(Port,()=>{
    console.log('server listening:'+Port+'...');
});
app.use(cors());
app.use(bodyParser.json());
app.use("/admin/category",categoryRouter);
app.use("/admin",adminRouter);