const SEND_URL = `${process.env.FACEBOOK_SEND_API}${process.env.PAGE_ACCESS_TOKEN}`;
const axios = require('axios');
const {
    MESSAGING_TYPES,
    MESSAGE_TEMPLATE_TYPES,
    MEDIA_TYPES,
} = require('../constants/messengerPlatformConstants');
const sendMessageThroughAPI = async (messageObject) => {
    // ToDo: Lesson 4
    const response = await axios.post(SEND_URL, messageObject);
    const { data } = response;
    if (data.error)
        throw new Error(
            `Send API Request Failed ## Code (${data.error.code}) ##`
        );
    return;
};

const waitFor = async (seconds) => {
    setTimeout(() => true, seconds * 1000);
};

const isLastMessageInArray = (index, textMessagesArray) =>
    index === textMessagesArray.length - 1;

const sendMarkSeen = (userPSID) => {
    // ToDo: Lesson 4_1
    sendMessageThroughAPI({
        recipient: {
            id: userPSID,
        },
        sender_action: 'mark_seen',
    });
};

const sendTypingOn = (userPSID) => {
    // ToDo: Lesson 4_1
    sendMessageThroughAPI({
        recipient: {
            id: userPSID,
        },
        sender_action: 'typing_on',
    });
};

const sendTypingOff = (userPSID) => {
    // ToDo: Lesson 4_1
    sendMessageThroughAPI({
        recipient: {
            id: userPSID,
        },
        sender_action: 'typing_off',
    });
};

const sendTextMessage = async (
    userPSID,
    messageText,
    { messagingType = MESSAGING_TYPES.RESPONSE, quickReplies } = {}
) => {
    // ToDo: Lesson 4_2
    const messageObject = {
        messaging_type: messagingType,
        recipient: {
            id: userPSID,
        },
        message: {
            text: messageText,
        },
    };
    // ToDo: Lesson 4_3
    if (quickReplies) messageObject.message.quick_replies = quickReplies;
    return sendMessageThroughAPI(messageObject);
};

const sendMultipleTextMessages = async (
    userPSID,
    textMessagesArray,
    { messagingType = MESSAGING_TYPES.RESPONSE, quickReplies } = {}
) => {
    // ToDo: Lesson 4_2
    for (const [index, textMessage] of textMessagesArray.entries()) {
        await sendTextMessage(userPSID, textMessage, {
            messagingType,
            quickReplies: isLastMessageInArray(index, textMessagesArray)
                ? quickReplies
                : undefined, // ToDo: Lesson 4_3
        });
        if (!isLastMessageInArray(index, textMessagesArray)) {
            await sendTypingOn(userPSID);
            const secondsToWait = textMessage.split(' ').length / 3;
            await waitFor(secondsToWait);
        }
    }
};

const sendAttachment = (
    userPSID,
    attachmentType,
    url,
    isReusable = true,
    { messagingType = MESSAGING_TYPES.RESPONSE, quickReplies } = {}
) => {
    // ToDo: Lesson 4_4
    const messageObject = {
        messaging_type: messagingType,
        recipient: {
            id: userPSID,
        },
        message: {
            attachment: {
                type: attachmentType,
                payload: {
                    url,
                    is_reusable: isReusable,
                },
            },
        },
    };
    if (quickReplies) messageObject.message.quick_replies = quickReplies;
    return sendMessageThroughAPI(messageObject);
};

const sendButtonsTemplate = (
    userPSID,
    displayText,
    buttons,
    { messagingType = MESSAGING_TYPES.RESPONSE } = {}
) => {
    // ToDo: Lesson 4_5
    const messageObject = {
        messaging_type: messagingType,
        recipient: {
            id: userPSID,
        },
        message: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: MESSAGE_TEMPLATE_TYPES.BUTTON,
                    text: displayText,
                    buttons: buttons,
                },
            },
        },
    };
    return sendMessageThroughAPI(messageObject);
};

const sendGenericTemplate = (
    userPSID,
    elements,
    { messagingType = MESSAGING_TYPES.RESPONSE, imageAspectRatio } = {}
) => {
    // ToDo: Lesson 4_6
    const messageObject = {
        messaging_type: messagingType,
        recipient: {
            id: userPSID,
        },
        message: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: MESSAGE_TEMPLATE_TYPES.GENERIC,
                    elements,
                },
            },
        },
    };
    if (imageAspectRatio)
        messageObject.message.payload.image_aspect_ratio = imageAspectRatio;
    return sendMessageThroughAPI(messageObject);
};

const sendMediaTemplate = (
    userPSID,
    { mediaType = MEDIA_TYPES.IMAGE, attachmentId, url, buttons } = {},
    { messagingType = MESSAGING_TYPES.RESPONSE } = {}
) => {
    // ToDo: Lesson 4_7
    const element = { media_type: mediaType };
    if (!attachmentId) element.url = url;
    else element.attachment_id = attachmentId;
    if (buttons) element.buttons = buttons;
    const messageObject = {
        messaging_type: messagingType,
        recipient: {
            id: userPSID,
        },
        message: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: MESSAGE_TEMPLATE_TYPES.MEDIA,
                    elements: [element],
                },
            },
        },
    };
    return sendMessageThroughAPI(messageObject);
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
