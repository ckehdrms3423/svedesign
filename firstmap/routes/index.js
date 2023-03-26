var express = require('express');
var router = express.Router();
const pool=require('../pool');
const kafka=require('../kafka-consumer');


router.get('/data',(req,res,next) => {
  pool.connect((err,client,done)=>{
    if (err){
      console.log(err);
      return res.status(500).send('error');
    }
    client.query('SELECT x,y,traffic from public.tv,moct."NODE" WHERE public.tv.node_id=moct."NODE".node_id' ,(err,result) => {
      done();
      if (err) console.log(err);
      console.log(result.rows);
      res.json(result.rows);
    });
  });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index');
  res.render('index', { title: 'Express' });
});

router.get('/upload',(req,res,next) => {
  res.render('upload')
})

router.get("/test",(req,res,next)=>{
  console.log("테스트 완료!")
})

router.get('/kafka', (req, res, next) => {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient({ kafkaHost: '114.70.21.91:9092' });

  const consumer = new Consumer(
    client,
    [{ topic: 'gps_info', partition: 3 }],
    { autoCommit: false }
  );

  consumer.on('message', function (message) {
    console.log(message);
  });

  consumer.on('error', function (err) {
    console.log('Error:', err);
  });

  res.send('Reading Kafka topic...');
});

module.exports = router;