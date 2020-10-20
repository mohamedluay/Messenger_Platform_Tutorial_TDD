const {
    WEBHOOK_EVENT_TYPES,
} = require('../constants/messengerPlatformConstants');

const parseEvent = (event) => {
    if (event.message) return parseMessageEvent(event);
    if (event.postback) return parsePostbackEvent(event);
    if (event.referral) return parseReferralEvent(event);

    // ToDo: Lesson 3_4
    throw new Error('Unsupported Webhook Event Received');
};

const extractCommonAttributes = (event) => {
    // ToDo: Lesson 3_4
    return {
        userPSID: event.sender.id,
        userReference: event.sender.user_ref,
        sendingPageID: event.recipient.id,
        timestamp: event.timestamp,
    };
};
const parseMessageEvent = (event) => {
    const commonAttributes = extractCommonAttributes(event);
    // ToDo: Lesson 3_1
    return {
        eventType: WEBHOOK_EVENT_TYPES.MESSAGE,
        isQuickReply: event.message.quick_reply != undefined,
        isReplyToPreviousMessage: event.message.reply_to != undefined,
        hasAttachments: event.message.attachments != undefined,
        message: event.message,
        ...commonAttributes,
    };
};

const parsePostbackEvent = (event) => {
    const commonAttributes = extractCommonAttributes(event);
    // ToDo: Lesson 3_2
    return {
        eventType: WEBHOOK_EVENT_TYPES.POSTBACK,
        isPostbackReferred: event.postback.referral != undefined,
        postback: {
            title: event.postback.title,
            payload: event.postback.payload,
        },
        referral: event.postback.referral,
        ...commonAttributes,
    };
};

const parseReferralEvent = (event) => {
    const commonAttributes = extractCommonAttributes(event);
    // ToDo: Lesson 3_3
    return {
        eventType: WEBHOOK_EVENT_TYPES.REFERRAL,
        referral: event.referral,
        ...commonAttributes,
    };
};

module.exports = {
    parseEvent,
};
