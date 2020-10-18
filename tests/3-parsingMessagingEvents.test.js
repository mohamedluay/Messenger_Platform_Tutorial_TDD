const request = require('supertest');
const app = require('../app');

jest.mock('../managers/webhookEventsManager.js');
const { parseEvent } = require('../managers/webhookEventsManager');

describe('3- Parsing Messaging Events', () => {
    it('parseEvent (inside webhookEventsManager.js) should be invoked with entry event messaging object', async (done) => {
        const messaging = [
            {
                sender: {
                    id: '<PSID>',
                },
                recipient: {
                    id: '<PAGE_ID>',
                },
                timestamp: 1458692752478,
            },
        ];

        const res = await request(app)
            .post('/webhook')
            .send({
                object: 'page',
                entry: [
                    {
                        id: '<PAGE_ID>',
                        time: 1458692752478,
                        messaging,
                    },
                ],
            });
        expect(parseEvent).toHaveBeenCalledTimes(1);
        expect(parseEvent).toHaveBeenCalledWith(messaging[0]);
        done();
    });
});
