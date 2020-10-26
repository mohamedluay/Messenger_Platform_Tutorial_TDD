# Lesson 3.4 - Webhook Events Appendix

## In theory 📖

This lesson will be a quick lesson where we will just do some sort of minor refactoring to the **webhookEventsManager.js** file, the refactor will touch these 2 minor points:

-   We only handled 3 types of webhook events(message, postback and referral), since your webhook will still manage to receive other events, the webhook will respond with 200 without handling the coming request. Hence, we will throw a minor error instead to let the messenger platform know that we can't receive such event yet.
-   Given the existence of some common attributes in each event (like sender id & timestamp), it would be better to group those into one central code so that we can easily add new attributes to it in the future.

## Get Your Hands Dirty 👩‍💻

```sh
./scripts/start_tutorial.sh lesson_3_4
```

```javascript
// ToDo: Lesson 3_4
```

I would suggest that you go do the refactor yourself and come back to check the final code for **webhookEventsManager** from here 👇

```javascript
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
```

As a disclaimer, you are not required to do it exactly like I did here, if you are comfortable with what you wrote and it passes the test then that's more than enough.

```sh
./scripts/start_tutorial.sh lesson_3_4
```

At this point I must congratulate you for passing the mid milestone from this tutorial, what would you need only to complete your first chatbot is to know how to send messages to your users and you are all set 😉. Now, it's time for the usual dance 😁.

<p align="center">
  <img src="https://media.giphy.com/media/lMameLIF8voLu8HxWV/giphy.gif" />
</p>

## Next Lesson: [Lesson 4 - Sending Messages](Lesson_4.md)

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
