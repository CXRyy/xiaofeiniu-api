SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaofeiniu;
CREATE DATABASE xiaofeiniu CHARSET=UTF8;
USE xiaofeiniu;

#管理员信息
CREATE TABLE xfn_admin(
  aid INT PRIMARY KEY AUTO_INCREMENT,#管理员编号
  aname VARCHAR(32) UNIQUE,#管理员用户名
  apwd	VARCHAR(64) #管理员密码
);

#项目全局设置
CREATE TABLE xfn_settings(
  sid INT PRIMARY KEY AUTO_INCREMENT,#桌台编号
  appName VARCHAR(32),#应用/店家的名称
  apiUrl	VARCHAR(64),#数据API子系统地址
   addminUrl VARCHAR(64),#管理后台子系统地址
   appUrl VARCHAR(64),#顾客app子系统地址
   icp   VARCHAR(64),#系统备案号
   copyright  VARCHAR(64) #版权声明
);

#桌台信息表
CREATE TABLE xfn_table(
  tid INT PRIMARY KEY AUTO_INCREMENT,#桌台编号
  tname VARCHAR(32),#桌台昵称
  type	VARCHAR(64), #桌台类型，入3-4人桌
  status INT  #当前状态
);

#桌台预定信息表
CREATE TABLE xfn_reservation(
  rid INT PRIMARY KEY AUTO_INCREMENT,#桌台编号
  contactName VARCHAR(32),#桌台昵称
  phone	VARCHAR(64), #桌台类型，入3-4人桌
  contactTime BIGINT,  #联系时间
  dinnertime BIGINT  #预约的用餐时间            
);

#菜品分类表
CREATE TABLE xfn_category(
    cid INT PRIMARY KEY AUTO_INCREMENT, #类别编号
    cname VARCHAR(32), #类别名称
    did INT, #菜品编号
    title VARCHAR(32), #菜品名称/标题
    imgUrl VARCHAR(128), #图片地址
    price DECIMAL(6,2), #价格
    detail VARCHAR(128), #详细描述信息
    categoryId INT #所属类别的编号
);

#菜品信息表
CREATE TABLE xfn_dish(
    did INT PRIMARY KEY AUTO_INCREMENT, #菜品编号
    title VARCHAR(32), #菜品名称/标题
    imgUrl VARCHAR(128), #图片地址
    price VARCHAR(6,2), #价格
    detail VARCHAR(128), #详细描述信息
    categoryId INT #所属类别的编号
);

#订单表
CREATE TABLE xfn_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    startTime BIGINT,
    endTime BIGINT,
    customerCount INT,
    tabled INT
);

#订单详情表
CREATE TABLE xfn_order_detail(
    did INT PRIMARY KEY AUTO_INCREMENT, #订单编号
    dishId INT, #菜品编号
    dishCount INT, #菜品数量
    customerName VARCHAR(64), #点餐用户的称呼
    orderId INT  #订单编号，指明所属订单
)