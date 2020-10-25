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
) => {
    const buttonTemplate = {
        type: BUTTON_TYPES.WEB_URL,
        title,
        url,
    };
    if (webViewHightRatio)
        buttonTemplate.webview_height_ratio = webViewHightRatio;
    if (messengerExtensions)
        buttonTemplate.messenger_extensions = messengerExtensions;
    if (fallbackUrl) buttonTemplate.fallback_url = fallbackUrl;
    if (webViewShareButton)
        buttonTemplate.webview_share_button = webViewShareButton;
    return buttonTemplate;
};

const buildPostbackButton = (title, payload) => ({
    type: BUTTON_TYPES.POSTBACK,
    title,
    payload,
});

const buildCallButton = (title, phoneNumber) => ({
    type: BUTTON_TYPES.PHONE_NUMBER,
    title,
    payload: phoneNumber,
});

const buildLogInButton = (loginUrl) => ({
    type: BUTTON_TYPES.LOG_IN,
    url: loginUrl,
});

const buildLogOutButton = (logoutUrl) => ({
    type: BUTTON_TYPES.LOG_OUT,
    url: logoutUrl,
});

const buildShareButton = (shareContent) => {
    const buttonTemplate = {
        type: BUTTON_TYPES.SHARE,
    };
    if (shareContent) buttonTemplate.share_content = shareContent;
    return buttonTemplate;
};

module.exports = {
    buildWebUrlButton,
    buildPostbackButton,
    buildCallButton,
    buildLogInButton,
    buildLogOutButton,
    buildShareButton,
};
