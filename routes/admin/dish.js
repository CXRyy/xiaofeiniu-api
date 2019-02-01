const express=require("express");
const router=express.Router();
const pool=require("../../pool.js");
const fs=require("fs");
const multer=require("multer");
var upload=multer({dest:"tmp/"})
router.get("/",(req,res)=>{
    var sql="SELECT cid,cname FROM xfn_category ORDER BY cid";
    pool.query(sql,[],(err,result)=>{
        if(err){
            throw err;
        }
        var categoryList=result;
        var finishCount=0;
        for(let c of categoryList){
            sql="SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC";
            pool.query(sql,[c.cid],(err,result)=>{
                if(err){
                    throw err;
                }
                c.dishList=result;
                finishCount++;
                if(finishCount==categoryList.length){
                    res.send(categoryList);
                }
            })        
        }     
    })   
})
//接收客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名
router.post("/image",upload.single("dishImg"),(req,res,next)=>{
    var tmpFile=req.file.path;
    var suffix=req.file.originalname.substring(req.file.originalname.lastIndexOf("."));
    var newFile=randomFileName(suffix);
    fs.rename(tmpFile,"img/dish/"+newFile,()=>{
        res.send({code:200,msg:"upload success",fileName:newFile})
    });
})
function randomFileName(suffix){
    var time=new Date().getTime();
    var num=Math.floor(Math.random()*(10000-1000)+1000);
    return time+num+suffix;
}
router.post("/",(req,res)=>{
    var $title=req.body.title;
    var $imgUrl=req.body.imgUrl;
    var $price=req.body.price;
    var $detail=req.body.detail;
    var $categoryId=req.body.categoryId;
    var sql="INSERT INTO xfn_dish VALUES(NULL,?,?,?,?,?)";
    pool.query(sql,[$title,$imgUrl,$price,$detail,$categoryId],(err,result)=>{
        if(err){
            throw err;
        }
        res.send({code:200,msg:"dish added success",dishId:result.changeId});
    })
})
router.delete("/:did",(req,res)=>{
    var $did=req.params.did;
    var sql="DELETE FROM xfn_dish WHERE did=?";
    pool.query(sql,[$did],(err,result)=>{
        if(err){
            throw err;
        }
        if(result.changedRows>0){
            res.send({code:200,msg:"dish deleted success"});
        }else if(result.affectedRows>0&&result.changedRows==0){
            res.send({code:400,msg:"dish not exist"});
        }     
    })
})
router.put("/",(req,res)=>{
    var $did=req.body.did;
    var $title=req.body.title;
    var $imgUrl=req.body.imgUrl;
    var $price=req.body.price;
    var $detail=req.body.detail;
    var $categoryId=req.body.categoryId;
    var sql="UPDATE xfn_dish SET title=?,imgUrl=?,price=?,detail=?,categoryId=? WHERE did=?";
    pool.query(sql,[$title,$imgUrl,$price,$detail,$categoryId,$did],(err,result)=>{
        if(err){
            throw err;
        }
        res.send({code:200,msg:"dish added success",dishId:result.changeId});
    })
})
module.exports=router;