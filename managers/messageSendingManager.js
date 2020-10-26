const SEND_URL = `${process.env.FACEBOOK_SEND_API}${process.env.PAGE_ACCESS_TOKEN}`;
const axios = require('axios');
const {
    MESSAGING_TYPES,
    MESSAGE_TEMPLATE_TYPES,
    MEDIA_TYPES,
} = require('../constants/messengerPlatformConstants');
const sendMessageThroughAPI = async (messageObject) => {
    // ToDo: Lesson_4
};

const waitFor = async (seconds) => {
    setTimeout(() => true, seconds * 1000);
};

const isLastMessageInArray = (index, textMessagesArray) =>
    index === textMessagesArray.length - 1;

const sendMarkSeen = (userPSID) => {
    // ToDo: Lesson 4_1
};

const sendTypingOn = (userPSID) => {
    // ToDo: Lesson 4_1
};

const sendTypingOff = (userPSID) => {
    // ToDo: Lesson 4_1
};

const sendTextMessage = async (
    userPSID,
    messageText,
    { messagingType = MESSAGING_TYPES.RESPONSE, quickReplies } = {}
) => {
    // ToDo: Lesson 4_2
    // ToDo: Lesson 4_3
};

const sendMultipleTextMessages = async (
    userPSID,
    textMessagesArray,
    { messagingType = MESSAGING_TYPES.RESPONSE, quickReplies } = {}
) => {
    // ToDo: Lesson 4_2
};

const sendAttachment = (
    userPSID,
    attachmentType,
    url,
    isReusable = true,
    { messagingType = MESSAGING_TYPES.RESPONSE, quickReplies } = {}
) => {
    // ToDo: Lesson 4_4
};

const sendButtonsTemplate = (
    userPSID,
    displayText,
    buttons,
    { messagingType = MESSAGING_TYPES.RESPONSE } = {}
) => {
    // ToDo: Lesson 4_5
};

const sendGenericTemplate = (
    userPSID,
    elements,
    { messagingType = MESSAGING_TYPES.RESPONSE, imageAspectRatio } = {}
) => {
    // ToDo: Lesson 4_6
};

const sendMediaTemplate = (
    userPSID,
    { mediaType = MEDIA_TYPES.IMAGE, attachmentId, url, buttons } = {},
    { messagingType = MESSAGING_TYPES.RESPONSE } = {}
) => {
    // ToDo: Lesson 4_7
};

module.exports = {
    sendMarkSeen,
    sendTypingOn,
    sendTypingOff,
    sendTextMessage,
    sendMultipleTextMessages,
    sendAttachment,
    sendButtonsTemplate,
    sendGenericTemplate,
    sendMediaTemplate,
};
