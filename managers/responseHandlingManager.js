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
    // * Send mark_seen to indicate that the message was received by the chatbot
    sendMarkSeen(parsedEvent.userPSID);
    // * Send typing_on to indicate that the reply is being processed and will be sent shortly
    sendTypingOn(parsedEvent.userPSID);
    switch (parsedEvent.eventType) {
        case WEBHOOK_EVENT_TYPES.MESSAGE:
            respondToMessageEvent(parsedEvent);
            break;
        case WEBHOOK_EVENT_TYPES.POSTBACK:
            respondToPostbackEvent(parsedEvent);
            break;
        case WEBHOOK_EVENT_TYPES.REFERRAL:
            respondToReferralEvent(parsedEvent);
            break;
    }
};

const sendMessageWithQuickReplyResponse = (parsedEvent) => {
    sendTextMessage(
        parsedEvent.userPSID,
        'You have asked for a quick replies example',
        {
            quickReplies: [
                buildTextualQuickReply('quick reply example', '<QR_PAYLOAD>'),
            ],
        }
    );
};

const sendGenericTemplateResponse = (parsedEvent) => {
    const elements = [
        buildGenericListElement('Title', {
            subtitle: 'subtitle',
            buttons: [
                buildPostbackButton('another postback', '<ANOTHER_PAYLOAD>'),
            ],
        }),
    ];
    sendGenericTemplate(parsedEvent.userPSID, elements);
};
const respondToMessageEvent = (parsedEvent) => {
    if (parsedEvent.message.text === 'quick_reply') {
        sendMessageWithQuickReplyResponse(parsedEvent);
    } else if (parsedEvent.message.text === 'generic') {
        sendGenericTemplateResponse(parsedEvent);
    } else if (parsedEvent.message.text === 'multiple_messages') {
        sendMultipleTextMessages(parsedEvent.userPSID, [
            'Hi there',
            'How are you?',
        ]);
    } else sendTextMessage(parsedEvent.userPSID, parsedEvent.message.text);
};

const respondToPostbackEvent = (parsedEvent) => {
    sendTextMessage(
        parsedEvent.userPSID,
        `Postback Received, payload => ${parsedEvent.postback.payload}`
    );
};

const respondToReferralEvent = (parsedEvent) => {
    sendTextMessage(
        parsedEvent.userPSID,
        `Referral Received, ref => ${parsedEvent.referral.ref}`
    );
};

module.exports = {
    respondToMessage,
};
