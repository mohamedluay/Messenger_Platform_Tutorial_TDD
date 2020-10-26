const request = require('supertest');
const app = require('../app');
const axios = require('axios');
const { MESSAGING_TYPES } = require('../constants/messengerPlatformConstants');
const {
    ECHO_MESSAGE_STUB,
    QUICK_REPLY_MESSAGE_STUB,
    POSTBACK_MESSAGE_STUB,
    GENERIC_MESSAGE_STUB,
    MULTIPLE_MESSAGES_STUB,
    REFERRAL_STUB,
} = require('./stubs/chatbotScenariosStubs');

const FACEBOOK_GRAPH_MESSAGE_API = `${process.env.FACEBOOK_SEND_API}${process.env.PAGE_ACCESS_TOKEN}`;

jest.mock('axios');
axios.post.mockReturnValue({ status: 200, data: {} });
jest.useFakeTimers();

describe('5. Build your Super Echo Chatbot', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should echo normal text message', async (done) => {
        const res = await request(app)
            .post('/webhook')
            .send({
                object: 'page',
                entry: [ECHO_MESSAGE_STUB],
            });
        expect(axios.post).toHaveBeenCalledTimes(3);

        // * mark_seen
        expect(axios.post.mock.calls[0][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[0][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[0][1].sender_action).toBe('mark_seen');

        // * typing_on
        expect(axios.post.mock.calls[1][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[1][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[1][1].sender_action).toBe('typing_on');

        expect(axios.post.mock.calls[2][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[2][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[2][1].message).toStrictEqual({
            text: 'hello, world!',
        });
        expect(axios.post.mock.calls[2][1].messaging_type).toBe(
            MESSAGING_TYPES.RESPONSE
        );
        done();
    });

    it('should send a message with quick replies when user sends "quick_reply"', async (done) => {
        const res = await request(app)
            .post('/webhook')
            .send({
                object: 'page',
                entry: [QUICK_REPLY_MESSAGE_STUB],
            });
        expect(axios.post).toHaveBeenCalledTimes(3);

        // * mark_seen
        expect(axios.post.mock.calls[0][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[0][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[0][1].sender_action).toBe('mark_seen');

        // * typing_on
        expect(axios.post.mock.calls[1][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[1][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[1][1].sender_action).toBe('typing_on');

        expect(axios.post.mock.calls[2][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[2][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[2][1].message).toStrictEqual({
            text: 'You have asked for a quick replies example',
            quick_replies: [
                {
                    content_type: 'text',
                    title: 'quick reply example',
                    payload: '<QR_PAYLOAD>',
                },
            ],
        });

        expect(axios.post.mock.calls[2][1].messaging_type).toBe(
            MESSAGING_TYPES.RESPONSE
        );
        done();
    });

    it('should reply to a postback event sent by a previous quick reply', async (done) => {
        const res = await request(app)
            .post('/webhook')
            .send({
                object: 'page',
                entry: [POSTBACK_MESSAGE_STUB],
            });
        expect(axios.post).toHaveBeenCalledTimes(3);

        // * mark_seen
        expect(axios.post.mock.calls[0][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[0][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[0][1].sender_action).toBe('mark_seen');

        // * typing_on
        expect(axios.post.mock.calls[1][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[1][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[1][1].sender_action).toBe('typing_on');

        expect(axios.post.mock.calls[2][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[2][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[2][1].message).toStrictEqual({
            text: 'Postback Received, payload => <USER_DEFINED_PAYLOAD>',
        });
        expect(axios.post.mock.calls[2][1].messaging_type).toBe(
            MESSAGING_TYPES.RESPONSE
        );
        done();
    });

    it('should send a generic template when user sends "generic"', async (done) => {
        const res = await request(app)
            .post('/webhook')
            .send({
                object: 'page',
                entry: [GENERIC_MESSAGE_STUB],
            });
        expect(axios.post).toHaveBeenCalledTimes(3);

        // * mark_seen
        expect(axios.post.mock.calls[0][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[0][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[0][1].sender_action).toBe('mark_seen');

        // * typing_on
        expect(axios.post.mock.calls[1][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[1][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[1][1].sender_action).toBe('typing_on');

        expect(axios.post.mock.calls[2][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[2][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[2][1].message).toStrictEqual({
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements: [
                        {
                            buttons: [
                                {
                                    payload: '<ANOTHER_PAYLOAD>',
                                    title: 'another postback',
                                    type: 'postback',
                                },
                            ],
                            subtitle: 'subtitle',
                            title: 'Title',
                        },
                    ],
                },
            },
        });
        expect(axios.post.mock.calls[2][1].messaging_type).toBe(
            MESSAGING_TYPES.RESPONSE
        );
        done();
    });

    it('should respond with multiple messages when user sends "multiple_messages"', async (done) => {
        const res = await request(app)
            .post('/webhook')
            .send({
                object: 'page',
                entry: [MULTIPLE_MESSAGES_STUB],
            });
        expect(axios.post).toHaveBeenCalledTimes(5);

        // * mark_seen
        expect(axios.post.mock.calls[0][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[0][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[0][1].sender_action).toBe('mark_seen');

        // * typing_on
        expect(axios.post.mock.calls[1][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[1][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[1][1].sender_action).toBe('typing_on');

        expect(axios.post.mock.calls[2][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[2][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[2][1].message).toStrictEqual({
            text: 'Hi there',
        });
        expect(axios.post.mock.calls[2][1].messaging_type).toBe(
            MESSAGING_TYPES.RESPONSE
        );

        // * Send Typing_on to indicate that another message will be following
        expect(axios.post.mock.calls[3][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[3][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[3][1].sender_action).toBe('typing_on');

        expect(axios.post.mock.calls[4][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[4][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[4][1].message).toStrictEqual({
            text: 'How are you?',
        });
        expect(axios.post.mock.calls[4][1].messaging_type).toBe(
            MESSAGING_TYPES.RESPONSE
        );
        done();
    });

    it('respond to m.me link referral', async (done) => {
        const res = await request(app)
            .post('/webhook')
            .send({
                object: 'page',
                entry: [REFERRAL_STUB],
            });
        expect(axios.post).toHaveBeenCalledTimes(3);

        // * mark_seen
        expect(axios.post.mock.calls[0][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[0][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[0][1].sender_action).toBe('mark_seen');

        // * typing_on
        expect(axios.post.mock.calls[1][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[1][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[1][1].sender_action).toBe('typing_on');

        expect(axios.post.mock.calls[2][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[2][1].recipient.id).toBe('<PSID>');
        expect(axios.post.mock.calls[2][1].message).toStrictEqual({
            text: 'Referral Received, ref => <REF_DATA_IF_SPECIFIED_IN_THE_AD>',
        });
        expect(axios.post.mock.calls[2][1].messaging_type).toBe(
            MESSAGING_TYPES.RESPONSE
        );
        done();
    });
});
