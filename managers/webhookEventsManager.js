const {
    WEBHOOK_EVENT_TYPES,
} = require('../constants/messengerPlatformConstants');

const parseEvent = (event) => {
    if (event.message) return parseMessageEvent(event);
    if (event.postback) return parsePostbackEvent(event);
    if (event.referral) return parseReferralEvent(event);

    // ToDo: Lesson 3_4
};

const extractCommonAttributes = (event) => {
    // ToDo: Lesson 3_4
};
const parseMessageEvent = (event) => {
    // ToDo: Lesson 3_1
    // ToDo: Lesson_6
    return {
        eventType: WEBHOOK_EVENT_TYPES.MESSAGE,
        userPSID: event.sender.id,
        userReference: event.sender.user_ref,
        sendingPageID: event.recipient.id,
        timestamp: event.timestamp,
        isQuickReply: event.message.quick_reply != undefined,
        isReplyToPreviousMessage: event.message.reply_to != undefined,
        hasAttachments: event.message.attachments != undefined,
        message: event.message,
        entities: extractEntitiesFromMessageObject(event.message),
        traits: extractTraitsFromMessageObject(event.message),
    };
};

const parsePostbackEvent = (event) => {
    // ToDo: Lesson 3_2
};

const parseReferralEvent = (event) => {
    // ToDo: Lesson 3_3
};

const extractEntitiesFromMessageObject = (message) => {
    // ToDo: Lesson_6
    if (!message.entities) return [];
    const entitiesNames = Object.keys(message.entities);
    const entities = entitiesNames.map((entityName) => ({
        name: entityName,
        confidence: message.entities[entityName][0].confidence,
        value: message.entities[entityName][0].value,
    }));
    return entities;
};

const extractTraitsFromMessageObject = (message) => {
    // ToDo: Lesson_6
    if (!message.traits) return [];
    const traitNames = Object.keys(message.traits);
    const traits = traitNames.map((traitName) => ({
        name: traitName,
        confidence: message.traits[traitName][0].confidence,
        value: message.traits[traitName][0].value,
    }));
    return traits;
};

module.exports = {
    parseEvent,
};
