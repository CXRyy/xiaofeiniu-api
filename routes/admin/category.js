const express=require("express");
const router=express.Router();
const pool=require("../../pool.js");
router.get("/",(req,res)=>{
    var sql="SELECT * FROM xfn_category ORDER BY cid";
    pool.query(sql,[],(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})
//PUT/DELETE请求之前浏览器会先提交一个“预取请求”-Preflight-OPTIONS
router.delete("/:cid",(req,res)=>{
    //删除类别前必须先将属于该类别的菜品的类别编号设置为NULL
    var $cid=req.params.cid;
    var sql="UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?";
    pool.query(sql,[$cid],(err,result)=>{
        if(err){
            throw err;
        }
        sql="DELETE FROM xfn_category WHERE cid=?";
        pool.query(sql,[$cid],(err,result)=>{
            if(err){
                throw err;
            }
            if(result.affectedRows>0){
                res.send({code:200,msg:"1 category deleted"});
            }else{
                res.send({code:400,msg:"0 category deleted"});
            }   
        })
    })
})
router.put("/",(req,res)=>{
    var data=req.body;
    var sql="UPDATE xfn_category SET ? WHERE cid=?";
    pool.query(sql,[data,data.cid],(err,result)=>{
        if(err){
            throw err;
        }
        if(result.changedRows>0){
            res.send({code:200,msg:"1 category modified"});
        }else if(result.affectedRows==0){
            res.send({code:400,msg:"category not exist"});
        }else if(result.affectedRows==1&&result.changedRows==0){ 
            res.send({code:401,msg:"no category modified"});
        }  
    })
})
router.post("/",(req,res)=>{
    var data=req.body; 
    var sql="INSERT INTO xfn_category SET ?";
    pool.query(sql,data,(err,result)=>{
        if(err){
            throw err;
        }
        res.send({code:200,msg:"1 category added",cid:result.insertId});
    })
})

module.exports=router;
