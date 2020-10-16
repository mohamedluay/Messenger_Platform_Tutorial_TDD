const request = require('supertest');
const webhook = require('../app');

describe('1- Webhook Verification', () => {
    it('should respond with 200 when verification token matches environment', async (done) => {
        const res = await request(webhook).get('/webhook').query({
            'hub.mode': 'subscribe',
            'hub.verify_token': process.env.MESSENGER_VERIFY_TOKEN,
            'hub.challenge': 'hello',
        });
        expect(res.status).toBe(200);
        expect(res.text).toBe('hello');
        done();
    });

    it('should respond with 403 when verification token does not match environment', async (done) => {
        const res = await request(webhook).get('/webhook').query({
            'hub.mode': 'subscribe',
            'hub.verify_token': '<DOES_NOT_MATCH>',
            'hub.challenge': 'hello',
        });
        expect(res.status).toBe(403);
        done();
    });
});
