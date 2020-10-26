// ToDo: Lesson 4_5
const { BUTTON_TYPES } = require('../constants/messengerPlatformConstants');

const buildWebUrlButton = (
    title,
    url,
    {
        webViewHightRatio,
        messengerExtensions,
        fallbackUrl,
        webViewShareButton,
    } = {}
) => {};

const buildPostbackButton = (title, payload) => ({});

const buildCallButton = (title, phoneNumber) => ({});

const buildLogInButton = (loginUrl) => ({});

const buildLogOutButton = (logoutUrl) => ({});

const buildShareButton = (shareContent) => {};

module.exports = {
    buildWebUrlButton,
    buildPostbackButton,
    buildCallButton,
    buildLogInButton,
    buildLogOutButton,
    buildShareButton,
};
