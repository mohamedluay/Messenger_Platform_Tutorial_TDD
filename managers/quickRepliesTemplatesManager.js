// ToDo: Lesson 4_3

const {
    QUICK_REPLY_TYPES,
} = require('../constants/messengerPlatformConstants');

const required = () => {
    throw new Error(
        'Required Parameter Is Missing in quickRepliesTemplatesManager'
    );
};

const buildTextualQuickReply = (
    title = required(),
    payload = required(),
    imageUrl
) => {
    const quickReplyObject = {
        content_type: QUICK_REPLY_TYPES.TEXT,
        title,
        payload,
    };
    if (imageUrl) quickReplyObject.image_url = imageUrl;
    return quickReplyObject;
};

const buildUserPhoneNumberQuickReply = () => ({
    content_type: QUICK_REPLY_TYPES.USER_PHONE_NUMBER,
});

const buildUserEmailQuickReply = () => ({
    content_type: QUICK_REPLY_TYPES.USER_EMAIL,
});

module.exports = {
    buildTextualQuickReply,
    buildUserEmailQuickReply,
    buildUserPhoneNumberQuickReply,
};
