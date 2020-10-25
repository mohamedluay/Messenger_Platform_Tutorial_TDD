const { sendButtonsTemplate } = require('../managers/messageSendingManager');
const {
    buildWebUrlButton,
    buildPostbackButton,
    buildCallButton,
} = require('../managers/buttonsTemplateManager');
const {
    MESSAGING_TYPES,
    WEBVIEW_HIGHT_RATIOS,
    MESSAGE_TEMPLATE_TYPES,
} = require('../constants/messengerPlatformConstants');

const axios = require('axios');

const FACEBOOK_GRAPH_MESSAGE_API = `${process.env.FACEBOOK_SEND_API}${process.env.PAGE_ACCESS_TOKEN}`;

jest.mock('axios');
axios.post.mockReturnValue({ status: 200, data: {} });
jest.useFakeTimers();
describe('4.5 - Sending Button Template', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send template with 3 different buttons (web_url, postback & call)', () => {
        const buttons = [
            buildWebUrlButton('visit website', '<WEB_SITE_URL>', {
                webViewHightRatio: WEBVIEW_HIGHT_RATIOS.COMPACT,
            }),
            buildPostbackButton('Say Hello', '<USER_DEFINED_PAYLOAD>'),
            buildCallButton('Call Me 📲', '<PHONE_NUMBER>'),
        ];
        sendButtonsTemplate(
            1,
            'please click one of the blow buttons 👇',
            buttons
        );
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(FACEBOOK_GRAPH_MESSAGE_API, {
            recipient: { id: 1 },
            message: {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: MESSAGE_TEMPLATE_TYPES.BUTTON,
                        text: 'please click one of the blow buttons 👇',
                        buttons,
                    },
                },
            },
            messaging_type: MESSAGING_TYPES.RESPONSE,
        });
    });
});
