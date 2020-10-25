const { sendMediaTemplate } = require('../managers/messageSendingManager');
const { buildCallButton } = require('../managers/buttonsTemplateManager');
const {
    MESSAGING_TYPES,
    MESSAGE_TEMPLATE_TYPES,
    MEDIA_TYPES,
} = require('../constants/messengerPlatformConstants');

const axios = require('axios');

const FACEBOOK_GRAPH_MESSAGE_API = `${process.env.FACEBOOK_SEND_API}${process.env.PAGE_ACCESS_TOKEN}`;

jest.mock('axios');
axios.post.mockReturnValue({ status: 200, data: {} });
jest.useFakeTimers();
describe('4.7 - Sending Media Template', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send an image with button and attachment Id)', () => {
        const buttons = [buildCallButton('Call Now', '<+PhoneNumber>')];

        sendMediaTemplate(1, {
            attachmentId: 2,
            url: '<IMAGE_URL>',
            buttons,
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(FACEBOOK_GRAPH_MESSAGE_API, {
            recipient: { id: 1 },
            message: {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: MESSAGE_TEMPLATE_TYPES.MEDIA,
                        elements: [
                            { media_type: 'image', attachment_id: 2, buttons },
                        ],
                    },
                },
            },
            messaging_type: MESSAGING_TYPES.RESPONSE,
        });
    });

    it('should send a video with url)', () => {
        sendMediaTemplate(1, {
            mediaType: MEDIA_TYPES.VIDEO,
            url: '<Video_URL>',
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(FACEBOOK_GRAPH_MESSAGE_API, {
            recipient: { id: 1 },
            message: {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: MESSAGE_TEMPLATE_TYPES.MEDIA,
                        elements: [{ media_type: 'video', url: '<Video_URL>' }],
                    },
                },
            },
            messaging_type: MESSAGING_TYPES.RESPONSE,
        });
    });
});
