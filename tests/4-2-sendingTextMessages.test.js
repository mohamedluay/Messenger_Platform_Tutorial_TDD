const {
    sendTextMessage,
    sendMultipleTextMessages,
} = require('../managers/messageSendingManager');
const { MESSAGING_TYPES } = require('../constants/messengerPlatformConstants');
const axios = require('axios');

const FACEBOOK_GRAPH_MESSAGE_API = `${process.env.FACEBOOK_SEND_API}${process.env.PAGE_ACCESS_TOKEN}`;

jest.mock('axios');
axios.post.mockReturnValue({ status: 200, data: {} });
jest.useFakeTimers();
describe('4.2 - Sending Text Messages', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send a text message request', async (done) => {
        sendTextMessage(1, 'hello');
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(FACEBOOK_GRAPH_MESSAGE_API, {
            recipient: { id: 1 },
            message: { text: 'hello' },
            messaging_type: MESSAGING_TYPES.RESPONSE,
        });
        done();
    });

    it('should queue text messages requests with proper delay between each', async (done) => {
        await sendMultipleTextMessages(1, [
            'Hello',
            'How are you?',
            'My name is Luay',
        ]);
        expect(axios.post).toHaveBeenCalledTimes(5);
        expect(setTimeout).toHaveBeenCalledTimes(2);
        // * 'Hello' message request
        expect(axios.post.mock.calls[0][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[0][1].recipient.id).toBe(1);
        expect(axios.post.mock.calls[0][1].message.text).toBe('Hello');

        // * Send Typing on to indicate that there is still more messages coming
        expect(axios.post.mock.calls[1][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[1][1].recipient.id).toBe(1);
        expect(axios.post.mock.calls[1][1].sender_action).toBe('typing_on');

        // * Check the first timeout number of seconds to be 1/3 - As we have agreed (3 words per second rate)
        expect(setTimeout.mock.calls[0][1]).toBe((1 / 3) * 1000);

        // * 'How are you?' message request
        expect(axios.post.mock.calls[2][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[2][1].recipient.id).toBe(1);
        expect(axios.post.mock.calls[2][1].message.text).toBe('How are you?');

        // * Send Typing on to indicate that there is still more messages coming
        expect(axios.post.mock.calls[3][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[3][1].recipient.id).toBe(1);
        expect(axios.post.mock.calls[3][1].sender_action).toBe('typing_on');

        // * Check the first timeout number of seconds to be 3/3
        expect(setTimeout.mock.calls[1][1]).toBe((3 / 3) * 1000);

        // * 'My name is Luay' message request
        expect(axios.post.mock.calls[4][0]).toBe(FACEBOOK_GRAPH_MESSAGE_API);
        expect(axios.post.mock.calls[4][1].recipient.id).toBe(1);
        expect(axios.post.mock.calls[4][1].message.text).toBe(
            'My name is Luay'
        );

        // * That's it, we won't send the typing on nor wait more seconds as the is our last message
        done();
    });
});
