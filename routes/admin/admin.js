const express=require("express");
const router=express.Router();
const pool=require("../../pool.js");
router.get("/login/:aname/:apwd",(req,res)=>{
    var $aname=req.params.aname;
    var $apwd=req.params.apwd;
    var sql="SELECT aid FROM xfn_admin WHERE aname=? AND apwd=md5(?)";
    pool.query(sql,[$aname,$apwd],(err,result)=>{
        if(err){
            throw err;
        }
        if(result.length>0){
            res.send({code:200,msg:"login success"});
        }else{
            res.send({code:400,msg:"aname or apwd error"});
        }
    })
})
router.patch("/",(req,res)=>{
    var $aname=req.body.aname;
    var $oldPwd=req.body.oldPwd;
    var $newPwd=req.body.newPwd;
    var sql="SELECT aid FROM xfn_admin WHERE aname=? AND apwd=md5(?)";
    pool.query(sql,[$aname,$oldPwd],(err,result)=>{
        if(err){
            throw err;
        }
        if(result.length==0){
            res.send({code:400,msg:"password error"});
            return;
        }
        sql="UPDATE xfn_admin SET apwd=md5(?) WHERE aname=?";
        pool.query(sql,[$newPwd,$aname],(err,result)=>{
            if(err){
                throw err;
            }
            if(result.changedRows>0){
                res.send({code:200,msg:"modified success"});
            }else{
                res.send({code:401,msg:"pwd not modified"});
            }
        })      
        
    })   
})
module.exports=router;