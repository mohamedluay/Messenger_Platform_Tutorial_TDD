# Lesson 4.3 - Sending Quick Replies

## In theory 📖

Quick replies are ones of the most used, user friendly feature associated with sending messages in the messenger platform. It helps you provide users with quick responses to move on smoothly with your chatting experience. It supports textual titles as well as images, and you can use them to get person's location, email address, and phone number.

![image](https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_3_1_im1.png)

**Sample JSON**

```json
{
    "recipient": {
        "id": "<PSID>"
    },
    "messaging_type": "RESPONSE",
    "message": {
        "text": "Pick a color:",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Red",
                "payload": "<POSTBACK_PAYLOAD>",
                "image_url": "http://example.com/img/red.png"
            },
            {
                "content_type": "text",
                "title": "Green",
                "payload": "<POSTBACK_PAYLOAD>",
                "image_url": "http://example.com/img/green.png"
            }
        ]
    }
}
```

## Get Your Hands Dirty 👩‍💻

Since quick replies are send alongside default messages, the first thing we need to do is to modify the **sendTextMessage** and **sendMultipleTextMessages** functions that we have implemented in the previous lesson to optionally support them, our small update here will look like this 👇:

```javascript
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
```

Then we will implement a manager that take few arguments, and use them to format the quick replies supported by the platform, this logic will be placed in the **quickRepliesTemplatesManager.js** file and it look like this:

```javascript
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
```

You will notice the existence of a function called **required**, I use this function as a default assignment to required arguments hence it will throw an error if no value was sent to this argument.

```sh
./scripts/start_tutorial.sh lesson_4_3
```

<p align="center">
  <img src="https://media.giphy.com/media/l42P7LGjW2aGRfvXy/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [Quick Replies](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies)

## Next Lesson: [Lesson 4.4 - Sending Attachments](Lesson_4_4.md)

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
