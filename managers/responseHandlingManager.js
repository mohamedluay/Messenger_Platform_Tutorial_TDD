// ToDo: Lesson_5

const {
    WEBHOOK_EVENT_TYPES,
} = require('../constants/messengerPlatformConstants');

const { buildTextualQuickReply } = require('./quickRepliesTemplatesManager');

const {
    sendTextMessage,
    sendMarkSeen,
    sendTypingOn,
    sendGenericTemplate,
    sendMultipleTextMessages,
} = require('./messageSendingManager');

const { buildGenericListElement } = require('./genericTemplateBuilder');

const { buildPostbackButton } = require('./buttonsTemplateManager');

const respondToMessage = (parsedEvent) => {
    switch (parsedEvent.eventType) {
    }
};

const sendMessageWithQuickReplyResponse = (parsedEvent) => {};

const sendGenericTemplateResponse = (parsedEvent) => {};
const respondToMessageEvent = (parsedEvent) => {};

const respondToPostbackEvent = (parsedEvent) => {};

const respondToReferralEvent = (parsedEvent) => {};

module.exports = {
    respondToMessage,
};
