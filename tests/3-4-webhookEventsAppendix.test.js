const { parseEvent } = require('../managers/webhookEventsManager');
const request = require('supertest');
const app = require('../app');

describe('3.4 - Webhook Events Appendix', () => {
    it('should throw error when no known event sent', () => {
        const stubEvent = {
            sender: {
                id: '<PSID>',
            },
            recipient: {
                id: '<PAGE_ID>',
            },
            timestamp: 1458692752478,
        };

        expect(() => {
            parseEvent(stubEvent);
        }).toThrowError(new Error('Unsupported Webhook Event Received'));
    });

    it('webhook should return 500 when no known event sent', async (done) => {
        const res = await request(app)
            .post('/webhook')
            .send({
                object: 'page',
                entry: [
                    {
                        id: '<PAGE_ID>',
                        time: 1458692752478,
                        messaging: [
                            {
                                sender: {
                                    id: '<PSID>',
                                },
                                recipient: {
                                    id: '<PAGE_ID>',
                                },
                                timestamp: 1458692752478,
                            },
                        ],
                    },
                ],
            });
        expect(res.status).toBe(500);
        done();
    });
});
