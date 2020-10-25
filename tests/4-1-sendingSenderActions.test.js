const {
    sendMarkSeen,
    sendTypingOn,
    sendTypingOff,
} = require('../managers/messageSendingManager');

const axios = require('axios');
jest.mock('axios');
axios.post.mockReturnValue({ status: 200, data: {} });
const FACEBOOK_GRAPH_MESSAGE_API = `${process.env.FACEBOOK_SEND_API}${process.env.PAGE_ACCESS_TOKEN}`;

describe('4.1 - Send Sender Actions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should send Mark Seen request', async (done) => {
        sendMarkSeen(1);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(FACEBOOK_GRAPH_MESSAGE_API, {
            recipient: { id: 1 },
            sender_action: 'mark_seen',
        });
        done();
    });

    it('should send Typing On request', async (done) => {
        sendTypingOn(1);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(FACEBOOK_GRAPH_MESSAGE_API, {
            recipient: { id: 1 },
            sender_action: 'typing_on',
        });
        done();
    });

    it('should send Typing Off request', async (done) => {
        sendTypingOff(1);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(FACEBOOK_GRAPH_MESSAGE_API, {
            recipient: { id: 1 },
            sender_action: 'typing_off',
        });
        done();
    });
});
