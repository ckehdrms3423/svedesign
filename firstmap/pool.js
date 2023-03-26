const {Pool}=require('pg')

const pool=new Pool({
  user: "root",
  host: "host",
  database: "postgres",
  password: "503",
  port: port
})
module.exports=pool;