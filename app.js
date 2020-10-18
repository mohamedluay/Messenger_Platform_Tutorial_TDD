const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { parseEvent } = require('./managers/webhookEventsManager');

const webhook = new Express();
webhook.use(cors());
webhook.use(bodyParser.urlencoded({ extended: false }));
webhook.use(bodyParser.json());

webhook.get('/webhook', (req, res) => {
    // ToDo: Lesson 1
    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = process.env.MESSENGER_VERIFY_TOKEN;
    // Parse the query params
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

webhook.post('/webhook', (req, res) => {
    // ToDo: Lesson 2
    const data = req.body;
    const { object, entry } = data;
    if (object === 'page') {
        entry.forEach((entryEvent) => {
            try {
                const webhookEvent = entryEvent.messaging[0];
                const { sender, recipient, timestamp } = webhookEvent;
                // ToDo: Lesson 3
                const parsedEvent = parseEvent(webhookEvent);
                res.status(200).send('EVENT_RECEIVED');
            } catch (error) {
                res.status(500).send();
            }
        });
    } else {
        res.sendStatus(404);
    }
});

if (process.env.NODE_ENV != 'test')
    webhook.listen(process.env.WEBHOOK_PORT, () => {
        console.log(`App Listing On Port ${process.env.WEBHOOK_PORT}`);
    });

module.exports = webhook;
