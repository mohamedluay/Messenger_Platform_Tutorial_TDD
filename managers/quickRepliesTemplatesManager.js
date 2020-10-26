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
) => {};

const buildUserPhoneNumberQuickReply = () => ({});

const buildUserEmailQuickReply = () => ({});

module.exports = {
    buildTextualQuickReply,
    buildUserEmailQuickReply,
    buildUserPhoneNumberQuickReply,
};
