const request = require('supertest');
const axios = require('axios');
const webhook = require('../app');
// const { textMessageWithNLP } = require('./mocks/facebookEntryEvents');
// const { MESSAGING_TYPES } = require('../../constants/facebook');

jest.mock('axios');

describe('Facebook webhook', () => {
    it('Get Webhook should respond with 200 when verification token matches environment', async () => {
        const res = await request(webhook).get('/webhook').query({
            'hub.mode': 'subscribe',
            'hub.verify_token': process.env.MESSENGER_VERIFY_TOKEN,
            'hub.challenge': 'hello',
        });
        expect(res.status).toBe(200);
        expect(res.text).toBe('hello');
    });

    it('Get Webhook should respond with 403 when verification token does not match environment', async () => {
        const res = await request(webhook).get('/webhook').query({
            'hub.mode': 'subscribe',
            'hub.verify_token': '<DOES_NOT_MATCH>',
            'hub.challenge': 'hello',
        });
        expect(res.status).toBe(403);
    });

    // test('Post Webhook to respond to a message with greetings entities', async () => {
    //     const res = await request(webhook)
    //         .post('/webhook')
    //         .send({
    //             object: 'page',
    //             entry: [
    //                 {
    //                     ...textMessageWithNLP,
    //                 },
    //             ],
    //         });
    //     const message = axios.post.mock.calls[2][1];
    //     expect(res.status).toBe(200);
    //     expect(axios.post.mock.calls.length).toBe(3);
    //     expect(axios.post.mock.calls[0][0]).toBe(
    //         `me/messages?access_token=${process.env.PAGE_TOKEN}`
    //     );
    //     expect(axios.post.mock.calls[0][1].sender_action).toBe('mark_seen');
    //     expect(axios.post.mock.calls[1][1].sender_action).toBe('typing_on');
    //     expect(axios.post.mock.calls[1][0]).toBe(
    //         `me/messages?access_token=${process.env.PAGE_TOKEN}`
    //     );
    //     expect(axios.post.mock.calls[2][0]).toBe(
    //         `me/messages?access_token=${process.env.PAGE_TOKEN}`
    //     );
    //     // expect(axios.post.mock.calls[0][1].senderAction)
    //     expect(message.messaging_type).toBe(MESSAGING_TYPES.RESPONSE);
    //     expect(message.recipient.id).toBe('<PSID>');
    //     expect(message.message.text).toBe('Ok, will do');
    // });
});
