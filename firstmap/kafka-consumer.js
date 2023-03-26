const kafka = require('kafka-node');
const Consumer = kafka.Consumer;

const client = new kafka.KafkaClient({ kafkaHost: '114.70.21.91:9091' });
const consumer = new Consumer(
    client,
    [
        { topic: 'gps_info' }
    ],
    {
        autoCommit: false
    }
);

consumer.on('message', function (message) {
    console.log('received message:', message);
});

consumer.on('error', function (err) {
    console.log('error:', err);
});

module.exports=consumer;