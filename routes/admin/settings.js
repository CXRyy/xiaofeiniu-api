const express=require("express");
const router=express.Router();
const pool=require("../../pool.js");
router.put("/",(req,res)=>{
    var $sid=req.body.sid;
    var $appName=req.body.appName;
    var $apiUrl=req.body.apiUrl;
    var $addminUrl=req.body.addminUrl;
    var $appUrl=req.body.appUrl;
    var $icp=req.body.icp;
    var $copyright=req.body.copyright;
    var sql="UPDATE xfn_settings SET appName=?,apiUrl=?,addminUrl=?,appUrl=?,icp=?,copyright=? WHERE sid=?";
    pool.query(sql,[$appName,$apiUrl,$addminUrl,$appUrl,$icp,$copyright,$sid],(err,result)=>{
        if(err){
            throw err;
        }
        res.send({code:200,msg:"settings updated success"});
    })
})
router.get("/",(req,res)=>{
    var sql="SELECT sid,appName,apiUrl,addminUrl,appUrl,icp,copyright FROM xfn_settings LIMIT 1";
    pool.query(sql,[],(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result[0]);  
    })              
})
module.exports=router;