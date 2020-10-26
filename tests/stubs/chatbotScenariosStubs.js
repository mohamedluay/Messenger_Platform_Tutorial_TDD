const ECHO_MESSAGE_STUB = {
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
            message: {
                mid: 'mid.1457764197618:41d102a3e1ae206a38',
                text: 'hello, world!',
            },
        },
    ],
};

const QUICK_REPLY_MESSAGE_STUB = {
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
            message: {
                mid: 'mid.1457764197618:41d102a3e1ae206a38',
                text: 'quick_reply',
            },
        },
    ],
};

const POSTBACK_MESSAGE_STUB = {
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
            postback: {
                title: '<TITLE_FOR_THE_CTA>',
                payload: '<USER_DEFINED_PAYLOAD>',
            },
        },
    ],
};

const GENERIC_MESSAGE_STUB = {
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
            message: {
                mid: 'mid.1457764197618:41d102a3e1ae206a38',
                text: 'generic',
            },
        },
    ],
};

const MULTIPLE_MESSAGES_STUB = {
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
            message: {
                mid: 'mid.1457764197618:41d102a3e1ae206a38',
                text: 'multiple_messages',
            },
        },
    ],
};

const REFERRAL_STUB = {
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
            referral: {
                ref: '<REF_DATA_IF_SPECIFIED_IN_THE_AD>',
                ad_id: '<ID_OF_THE_AD>',
                source: 'ADS',
                type: 'OPEN_THREAD',
            },
        },
    ],
};

module.exports = {
    ECHO_MESSAGE_STUB,
    QUICK_REPLY_MESSAGE_STUB,
    POSTBACK_MESSAGE_STUB,
    GENERIC_MESSAGE_STUB,
    MULTIPLE_MESSAGES_STUB,
    REFERRAL_STUB,
};
