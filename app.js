const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { parseEvent } = require('./managers/webhookEventsManager');
const { respondToMessage } = require('./managers/responseHandlingManager');
const { sendMarkSeen } = require('./managers/messageSendingManager');
const webhook = new Express();
webhook.use(cors());
webhook.use(bodyParser.urlencoded({ extended: false }));
webhook.use(bodyParser.json());

webhook.get('/webhook', (req, res) => {
    // ToDo: Lesson_1
});

webhook.post('/webhook', (req, res) => {
    // ToDo: Lesson_2
    // ToDo: Lesson_3
    // ToDo: Lesson_5
});

if (process.env.NODE_ENV != 'test')
    webhook.listen(process.env.WEBHOOK_PORT, () => {
        console.log(`App Listing On Port ${process.env.WEBHOOK_PORT}`);
    });

module.exports = webhook;
