const copyJsObject = require('../../utils/copyJsObject');
const {
    ATTACHMENT_TYPES,
    REFERRAL_SOURCES,
} = require('../../constants/facebook');

const ENTRY_ATTRIBUTES = {
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
};

const textMessage = (hasQuickReply) => {
    const mockedMessage = copyJsObject(ENTRY_ATTRIBUTES);
    const message = {
        message: {
            mid: 'mid.1457764197618:41d102a3e1ae206a38',
            text: 'hello, world!',
            quick_reply: hasQuickReply
                ? {
                      payload: '<DEVELOPER_DEFINED_PAYLOAD>',
                  }
                : null,
        },
    };
    mockedMessage.messaging[0] = { ...mockedMessage.messaging[0], ...message };
    return mockedMessage;
};

const textMessageWithNLP = () => {
    const mockedMessage = copyJsObject(ENTRY_ATTRIBUTES);
    const message = {
        message: {
            mid: 'mid.1457764197618:41d102a3e1ae206a38',
            text: 'hello, world!',
            nlp: {
                entities: {
                    amount_of_money: [
                        {
                            confidence: 0.9650075,
                            value: 50,
                            type: 'value',
                            unit: '$',
                        },
                    ],
                    email: [
                        {
                            confidence: 0.96904833333333,
                            value: 'your-name@email.com',
                        },
                    ],
                    datetime: [
                        {
                            confidence: 0.96793833333333,
                            values: [
                                {
                                    value: '2018-01-30T14:00:00.000+01:00',
                                    grain: 'hour',
                                    type: 'value',
                                },
                            ],
                            value: '2018-01-30T14:00:00.000+01:00',
                            grain: 'hour',
                            type: 'value',
                        },
                    ],
                },
            },
        },
    };
    mockedMessage.messaging[0] = { ...mockedMessage.messaging[0], ...message };
    return mockedMessage;
};

const textMessageWithAttachment = (attachmentType) => {
    const mockedMessage = copyJsObject(ENTRY_ATTRIBUTES);
    const message = {
        message: {
            mid: 'mid.1457764197618:41d102a3e1ae206a38',
            text: attachmentType === ATTACHMENT_TYPES.FALLBACK ? 'url' : null,
            attachments: [
                {
                    type: attachmentType,
                    payload:
                        attachmentType !== ATTACHMENT_TYPES.FALLBACK
                            ? {
                                  url: '<ATTACHMENT_URL>',
                              }
                            : null,
                    title:
                        attachmentType === ATTACHMENT_TYPES.FALLBACK
                            ? '<TITLE_OF_THE_URL_ATTACHMENT>'
                            : null,
                    URL:
                        attachmentType === ATTACHMENT_TYPES.FALLBACK
                            ? '<URL_OF_THE_ATTACHMENT>'
                            : null,
                },
            ],
        },
    };
    mockedMessage.messaging[0] = { ...mockedMessage.messaging[0], ...message };
    return mockedMessage;
};

const postbackMessage = () => {
    const mockedMessage = copyJsObject(ENTRY_ATTRIBUTES);
    const postback = {
        postback: {
            title: '<TITLE_FOR_THE_CTA>',
            payload: '<USER_DEFINED_PAYLOAD>',
            referral: {
                ref: '<USER_DEFINED_REFERRAL_PARAM>',
                source: '<SHORTLINK>',
                type: 'OPEN_THREAD',
            },
        },
    };
    mockedMessage.messaging[0] = { ...mockedMessage.messaging[0], ...postback };
    return mockedMessage;
};

const referral = (source) => {
    const mockedMessage = copyJsObject(ENTRY_ATTRIBUTES);
    const ref = {
        referral: {
            ref: '<DATA_PASSED>',
            source,
            type: 'OPEN_THREAD',
            referer_uri:
                source === REFERRAL_SOURCES.CUSTOMER_CHAT_PLUGIN
                    ? '<WEBSITE_URL>'
                    : null,
        },
    };
    mockedMessage.messaging[0] = { ...mockedMessage.messaging[0], ...ref };
    return mockedMessage;
};

module.exports = {
    textMessageWithQuickReply: textMessage(true),
    textMessageWithoutQuickReply: textMessage(false),
    textMessageWithNLP: textMessageWithNLP(),
    postbackMessage: postbackMessage(),
    textMessageWithImageAttachment: textMessageWithAttachment(
        ATTACHMENT_TYPES.IMAGE
    ),
    textMessageWithVideoAttachment: textMessageWithAttachment(
        ATTACHMENT_TYPES.VIDEO
    ),
    textMessageWithAudioAttachment: textMessageWithAttachment(
        ATTACHMENT_TYPES.AUDIO
    ),
    textMessageWithFileAttachment: textMessageWithAttachment(
        ATTACHMENT_TYPES.FILE
    ),
    textMessageWithFallbackAttachment: textMessageWithAttachment(
        ATTACHMENT_TYPES.FALLBACK
    ),
    shortLinkReferer: referral(REFERRAL_SOURCES.SHORTLINK),
    adReferer: referral(REFERRAL_SOURCES.ADS),
    messengerCodeReferer: referral(REFERRAL_SOURCES.MESSENGER_CODE),
    discoverTabReferer: referral(REFERRAL_SOURCES.DISCOVER_TAB),
    chatPluginReferer: referral(REFERRAL_SOURCES.CUSTOMER_CHAT_PLUGIN),
};
