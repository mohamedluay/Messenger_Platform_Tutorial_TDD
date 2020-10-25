const { sendAttachment } = require('../managers/messageSendingManager');

const {
    MESSAGING_TYPES,
    ATTACHMENT_TYPES,
} = require('../constants/messengerPlatformConstants');

const {
    buildUserEmailQuickReply,
} = require('../managers/quickRepliesTemplatesManager');
const axios = require('axios');

const FACEBOOK_GRAPH_MESSAGE_API = `${process.env.FACEBOOK_SEND_API}${process.env.PAGE_ACCESS_TOKEN}`;

jest.mock('axios');
axios.post.mockReturnValue({ status: 200, data: {} });
jest.useFakeTimers();
describe('4.4 - Sending Attachments', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send image attachment without quick replies', () => {
        sendAttachment(1, ATTACHMENT_TYPES.IMAGE, '<IMAGE_URL>');
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(FACEBOOK_GRAPH_MESSAGE_API, {
            recipient: { id: 1 },
            message: {
                attachment: {
                    type: ATTACHMENT_TYPES.IMAGE,
                    payload: { url: '<IMAGE_URL>', is_reusable: true },
                },
            },
            messaging_type: MESSAGING_TYPES.RESPONSE,
        });
    });

    it('should send image attachment with quick replies', () => {
        sendAttachment(1, ATTACHMENT_TYPES.VIDEO, '<IMAGE_URL>', false, {
            quickReplies: [buildUserEmailQuickReply()],
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(FACEBOOK_GRAPH_MESSAGE_API, {
            recipient: { id: 1 },
            message: {
                attachment: {
                    type: ATTACHMENT_TYPES.VIDEO,
                    payload: { url: '<IMAGE_URL>', is_reusable: false },
                },
                quick_replies: [buildUserEmailQuickReply()],
            },
            messaging_type: MESSAGING_TYPES.RESPONSE,
        });
    });
});
