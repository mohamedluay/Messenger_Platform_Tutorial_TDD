const WEBHOOK_EVENT_TYPES = {
    MESSAGE: 1,
    POSTBACK: 2,
    REFERRAL: 3,
};

const ATTACHMENT_TYPES = {
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    FILE: 'file',
    FALLBACK: 'fallback', // Url Sent in a message
};

const REFERRAL_SOURCES = {
    MESSENGER_CODE: 'MESSENGER_CODE',
    DISCOVER_TAB: 'DISCOVER_TAB',
    ADS: 'ADS',
    SHORTLINK: 'SHORTLINK',
    CUSTOMER_CHAT_PLUGIN: 'CUSTOMER_CHAT_PLUGIN',
};

module.exports = {
    WEBHOOK_EVENT_TYPES,
    ATTACHMENT_TYPES,
    REFERRAL_SOURCES,
};
