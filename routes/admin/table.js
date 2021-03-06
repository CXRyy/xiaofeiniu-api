const express=require("express");
const router=express.Router();
const pool=require("../../pool.js");
router.get("/",(req,res)=>{
    var sql="SELECT * FROM xfn_table ORDER BY tid";
    pool.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})
//预约
router.get("/reservation/:tid",(req,res)=>{
    var $tid=req.params.tid;
    var sql="SELECT * FROM xfn_table WHERE tid=? AND status=2";
    pool.query(sql,[$tid],(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})
//占用
router.get("/inuse/:tid",(req,res)=>{
    var $tid=req.params.tid;
    var sql="SELECT * FROM xfn_table WHERE tid=? AND status=3";
    pool.query(sql,[$tid],(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})
router.put("/",(req,res)=>{
    var $tid=req.body.tid;
    var $tname=req.body.tname;
    var $type=req.body.type;
    var $status=req.body.status;
    var sql="UPDATE xfn_table SET tname=?,type=?,status=? WHERE tid=?";
    pool.query(sql,[$tname,$type,$status,$tid],(err,result)=>{
        if(err){
            throw err;
        }
        res.send({code:200,msg:"table updated success"});
    })
})
router.post("/",(req,res)=>{
    var $tname=req.body.tname;
    var $type=req.body.type;
    var $status=req.body.status;
    var sql="INSERT INTO xfn_table VALUES(NULL,?,?,?)";
    pool.query(sql,[$tname,$type,$status],(err,result)=>{
        if(err){
            throw err;
        }
        res.send({code:200,msg:"table added success",tid:result.insertId});
    })
})
router.delete("/:tid",(req,res)=>{
    var $tid=req.params.tid;
    var sql="SELECT status FROM xfn_table WHERE tid=?";
    pool.query(sql,[$tid],(err,result)=>{
        if(err){
            throw err;
        }
        if(result.length>0){
            if(result[0].status==4){
                sql="DELETE FROM xfn_table WHERE tid=?";
                pool.query(sql,[$tid],(err,result)=>{
                    if(err){
                        throw err;
                    }
                    res.send({code:200,msg:"table deleted success"});
                }) 
            }else{
                res.send({code:401,msg:"table status is inuse"}) 
            }
        }else{
            res.send({code:400,msg:"table is not exist"})
        }
    })   
})
module.exports=router;