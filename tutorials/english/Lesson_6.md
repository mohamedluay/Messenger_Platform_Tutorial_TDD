# Lesson 6 - BuiltIn NLP

## In theory 📖

One of the coolest features that come in handy with the messenger platform is the Built-in NLP feature that you can optionally turn on from your Facebook Application.

<p align="center">
  <img src="https://scontent-hbe1-1.xx.fbcdn.net/v/t39.2365-6/31753097_2024429501209904_4428415022263173120_n.png?_nc_cat=111&ccb=2&_nc_sid=ad8a9d&_nc_ohc=1WSHGBW2AQYAX-Z0SYo&_nc_ht=scontent-hbe1-1.xx&oh=9b728ff27f979738e8eb49e9a7ad5561&oe=5FE8731C" />
</p>

The built-in NLP feature will automatically detect entities and intents for you, and will attach it every request message you receive on your chatbot. This will save you in terms of both latency and complexity requesting an external NLP API like Wit.ai or Dialogflow.

By default, the built-in NLP feature, detects the 15 entities below. Keep in mind that Dates and times are automatically localized based on the locale sent in the user's profile. In other words, if the users sends you a message like "yesterday at 6 pm", you will get the actual timestamp with the message itself.

By default, this feature supports 22 languages, these languages are:
(Arabic, Chinese, Croatian, Danish, Dutch, English, French, Georgian, German, Greek, Irish, Italian, Hebrew, Hungarian, Korean, Norwegian Bokmål, Polish, Portuguese, Romanian, Spanish, Swedish, and Vietnamese).

For other languages, check [customizing NLP via wit.ai](https://developers.facebook.com/docs/messenger-platform/built-in-nlp/#customizing_nlp)

So the question now would be now, how would I receive the fetched entities for any message request?
As a short answer, once you enable the built-in NLP feature as shown above 👆, you will start receiving an object named **entities** within the typical message webhook we discussed in **lesson 3.1**. For example, if the user send you a message like **"see you tomorrow at 4pm"**, then you would receive an object that will look something like this:

```json
{
    "sender": {
        "id": "<PSID>"
    },
    "recipient": {
        "id": "<PAGE_ID>"
    },
    "timestamp": 1458692752478,
    "message": {
        "mid": "mid.1457764197618:41d102a3e1ae206a38",
        "text": "see you tomorrow at 4pm",
        "entities": {
            "wit$datetime:datetime": [
                {
                    "id": "340464963587159",
                    "name": "wit$datetime",
                    "role": "datetime",
                    "start": 8,
                    "end": 23,
                    "body": "tomorrow at 4pm",
                    "confidence": 0.9704,
                    "entities": [],
                    "type": "value",
                    "grain": "hour",
                    "value": "2020-06-16T16:00:00.000-07:00",
                    "values": [
                        {
                            "type": "value",
                            "grain": "hour",
                            "value": "2020-06-16T16:00:00.000-07:00"
                        }
                    ]
                }
            ]
        },
        "traits": {
            "wit$sentiment": [
                {
                    "id": "5ac2b50a-44e4-466e-9d49-bad6bd40092c",
                    "value": "neutral",
                    "confidence": 0.6162
                }
            ]
        }
    }
}
```

Every message that you will receive from any user through the platform would have a mapped objects **entities** (Containing the detected entities within the message) & **traits** (Containing the sentiment of the sent message). The key information here will be the **confidence** (How confident the engine in the value you are receiving), and the actual **value** of that analysis. If you want to know more about the JSON format of the entities & traits objects, please read this in details from [wit.ai docs](https://wit.ai/docs/http/20200513?fbclid=IwAR20H0MbWTU2C-gX8EVlO0z3XewsyFE5bFCko-In-pSxRhQItO8lHhFYPHo#response_format_link)

## Get Your Hands Dirty 👩‍💻

First of all look for our dedicated keyword 😁

```javascript
// ToDo: Lesson_5
```

Let's have a manager dedicated for handling these responses, will call it **responseHandlingManager.js**, in this file, we will be defining a **respondToMessage** function that will take the parsed webhook event and do the logic for each one of the 6 above scenarios. As starting point, If you remember when we implemented the webhook events parser, we managed to handle 3 main webhook events, these are:

1.  Message Event.
2.  Postback Event.
3.  Referral Event.

Hence, the first thing we will do in this **respondToMessage** function will be identifying the type of the webhook received, and then route it to a responding function.

The second thing we will do in this function is sending 2 sender actions:

1.  mark_seen to give the user feedback that the message was received successfully.
2.  typing_on to give the user the notion that the reply is being processed and will be sent shortly.

With all that being said, this function should look like this 👇

```javascript
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
```

Now, we will be going to handle the 2 easy scenarios, the postback reply, and the referral reply. For the postback, I will reply with a message indicating that post back received with payload X, let's say that it will be something like

```
Postback Received, payload => <USED_DEFINED_PAYLOAD>
```

Hence, will write a function that looks like this 👇. keep in mind that in real life scenarios, you will be having different quick replies with different responses hence it would be better if you serialize your reply as JSON object (It should be stringified) and use it here in your logic. Keep in mind that payload argument is limited to _1000 characters_.

```javascript
const respondToPostbackEvent = (parsedEvent) => {
    sendTextMessage(
        parsedEvent.userPSID,
        `Postback Received, payload => ${parsedEvent.postback.payload}`
    );
};
```

Coming to referrals part (my personal favorite due to ease of onboarding & re-engagement), as mentioned in **Lesson_3_3**, there is 5 different entry points when it comes to referrals. In this chatbot, I will only cover the m.me links (my personal favorite due to ease of onboarding & re-engagement). This event will be fired when the user visited the m.me url with your page name and a ref value of your preference, e.g:

```
http://m.me/<PAGE_NAME>?ref=<REF_PARAM>
```

In this cases, we will deal with it exactly like we have with the postback, where the ref is the <REF_PARAM> set in the url.

```javascript
const respondToReferralEvent = (parsedEvent) => {
    sendTextMessage(
        parsedEvent.userPSID,
        `Referral Received, ref => ${parsedEvent.referral.ref}`
    );
};
```

Now looking back at the rest of the 4 other cases that we are going to handle in this chatbot, the cases are:

1.  User sends **quick_reply**.
2.  User sends **generic**.
3.  User sends **multiple_messages**.
4.  Otherwise.

```javascript
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
```

For the **multiple_messages** scenario, I will just use the **sendMultipleTextMessages** we implemented in **Lesson_4_2** by passing to it an array of messages that I want to send to the user for this flow.

```
['Hi there', 'How are you?']
```

For any other text message received, I will just echo it back to the sender as shown in the piece of code above.

Finally, for the **quick_reply** & the **generic template** examples, I have just used a lorem ipsum templates to test the functionality, nothing more, definitely in real life cases, you would use them in a different manner in conjunction with the usability flow you are up to.

```javascript
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
```

The last step would be invoking this **respondToMessage** function from the webhook code found in the **app.js** file.

```javascript
webhook.post('/webhook', (req, res) => {
    // ToDo: Lesson_2
    const data = req.body;
    const { object, entry } = data;
    if (object === 'page') {
        entry.forEach((entryEvent) => {
            try {
                const webhookEvent = entryEvent.messaging[0];
                const { sender, recipient, timestamp } = webhookEvent;
                // ToDo: Lesson_3
                const parsedEvent = parseEvent(webhookEvent);
                // ToDo: Lesson_5
                respondToMessage(parsedEvent);
                res.status(200).send('EVENT_RECEIVED');
            } catch (error) {
                res.status(500).send();
            }
        });
    } else {
        res.sendStatus(404);
    }
});
```

Now, we have made it to the last green check in this tutorial 👏, we have wrote our last piece of code here, let's check if it is turned green.

```sh
./scripts/start_tutorial.sh lesson_5
```

And we are done with the whole tutorial and the the the technical part 😁🕺.

For the sense of achievement, I have made a command that runs all tests togetherL

```sh
./scripts/start_tutorial.sh all_lessons
```

<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_5_im1.png" />
</p>

If you reached it this far, please let me know by tweeting it [from here](https://twitter.com/intent/tweet?text=Hi%20@_mluay,%20I%20have%20completed%20the%20Messenger%20Platform%20Tutorial,%20check%20my%20tests%20%F0%9F%98%81%F0%9F%91%87) 🙏
.

<p align="center">
  <img src="https://media.giphy.com/media/vmon3eAOp1WfK/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [Using m.me Links](https://developers.facebook.com/docs/messenger-platform/discovery/m-me-links/)

## Next Lesson: [All tests went green, what's Next⁉️](https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/tree/master/tutorials/english#3-all-tests-went-green-whats-next)

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
