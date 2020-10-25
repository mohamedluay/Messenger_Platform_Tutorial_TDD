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

const MESSAGING_TYPES = {
    RESPONSE: 'RESPONSE',
    UPDATE: 'UPDATE',
    MESSAGE_TAG: 'MESSAGE_TAG',
};

const QUICK_REPLY_TYPES = {
    TEXT: 'text',
    USER_PHONE_NUMBER: 'user_phone_number',
    USER_EMAIL: 'user_email',
};

const MESSAGE_TEMPLATE_TYPES = {
    BUTTON: 'button',
    GENERIC: 'generic',
    MEDIA: 'media',
    RECEIPT: 'receipt',
    AIRLINE: {
        BOARDING_PASS: 'airline_boardingpass',
        CHECK_IN: 'airline_checkin',
        ITINERARY: 'airline_itinerary',
        UPDATE: 'airline_update',
    },
};

const BUTTON_TYPES = {
    WEB_URL: 'web_url',
    POSTBACK: 'postback',
    PHONE_NUMBER: 'phone_number',
    LOG_IN: 'account_link',
    LOG_OUT: 'account_unlink',
    GAME_PLAY: 'game_play',
    SHARE: 'element_share',
};

const WEBVIEW_HIGHT_RATIOS = {
    COMPACT: 'compact',
    TALL: 'tall',
    FULL: 'full',
};

const MEDIA_TYPES = {
    IMAGE: 'image',
    VIDEO: 'video',
};

module.exports = {
    WEBHOOK_EVENT_TYPES,
    ATTACHMENT_TYPES,
    REFERRAL_SOURCES,
    MESSAGING_TYPES,
    QUICK_REPLY_TYPES,
    MESSAGE_TEMPLATE_TYPES,
    BUTTON_TYPES,
    WEBVIEW_HIGHT_RATIOS,
    MEDIA_TYPES,
};
