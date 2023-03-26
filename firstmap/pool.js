const {Pool}=require('pg')

const pool=new Pool({
  user: "root",
  host: "114.70.21.165",
  database: "postgres",
  password: "503",
  port: 30005
})
module.exports=pool;