const { sendGenericTemplate } = require('../managers/messageSendingManager');
const {
    buildGenericListElement,
} = require('../managers/genericTemplateBuilder');
const { buildWebUrlButton } = require('../managers/buttonsTemplateManager');
const {
    MESSAGING_TYPES,
    MESSAGE_TEMPLATE_TYPES,
} = require('../constants/messengerPlatformConstants');

const axios = require('axios');

const FACEBOOK_GRAPH_MESSAGE_API = `${process.env.FACEBOOK_SEND_API}${process.env.PAGE_ACCESS_TOKEN}`;

jest.mock('axios');
axios.post.mockReturnValue({ status: 200, data: {} });
jest.useFakeTimers();
describe('4.6 - Sending Generic Template', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send template with 3 elements)', () => {
        const element1 = buildGenericListElement('The Shawshank Redemption', {
            subtitle: 'Year - 1994',
            imageUrl: '<MOVIE_COVER_IMAGE>',
            buttons: [buildWebUrlButton('Movie Link', '<MOVIE_LINK_URL>')],
        });

        const element2 = buildGenericListElement('The Godfather', {
            subtitle: 'Year - 1972',
            imageUrl: '<MOVIE_COVER_IMAGE>',
            buttons: [buildWebUrlButton('Movie Link', '<MOVIE_LINK_URL>')],
        });

        const element3 = buildGenericListElement('Pulp Fiction', {
            subtitle: 'Year - 1994',
            imageUrl: '<MOVIE_COVER_IMAGE>',
            buttons: [buildWebUrlButton('Movie Link', '<MOVIE_LINK_URL>')],
        });
        const elements = [element1, element2, element3];
        sendGenericTemplate(1, elements);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(FACEBOOK_GRAPH_MESSAGE_API, {
            recipient: { id: 1 },
            message: {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: MESSAGE_TEMPLATE_TYPES.GENERIC,
                        elements,
                    },
                },
            },
            messaging_type: MESSAGING_TYPES.RESPONSE,
        });
    });
});
