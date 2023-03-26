const kafka = require('kafka-node');
const Consumer = kafka.Consumer;

const client = new kafka.KafkaClient({ kafkaHost: 'address' });
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