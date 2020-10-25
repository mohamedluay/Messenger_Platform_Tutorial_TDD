# Lesson 3.1 - Parsing Message Event

## In theory 📖

Message webhook event will be the first to do here. In this lesson we will cover parsing the typical text message object as well as payload coming from quick reply button, the reply_to reference if the message was a reply to a pervious one, and attachments messages. Before designing the parsing manager and the parsing function, please take a moment exploring the request body data in each case of the above 4 cases.

**Text Message**

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
        "text": "hello, world!",
        "quick_reply": {
            // quick_reply is optional, only messages coming from quick_reply button click with have this one
            "payload": "<DEVELOPER_DEFINED_PAYLOAD>" // Tip: You can serialize this payload to hold different parameters
        }
    }
}
```

Don't be confused with the quick_reply property, we will get it covered in depth during the send message lessons, however, to give you some context, it is the message you get after the user clicks one of these buttons 👇

![image](images/lesson_3_1_im1.png)

hence if the user clicked **Small** in the left most image, your webhook will receive something like:

```json
{
    "message": {
        "mid": "mid.1457764197618:41d102a3e1ae206a38",
        "text": "Small",
        "quick_reply": {
            "payload": "hat_size-sm" // this is just an example of how you can define this payload
        }
    }
}
```

**Reply Message**

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
        "mid": "m_1457764197618:41d102a3e1ae206a38",
        "text": "hello, world!",
        "reply_to": {
            "mid": "m_1fTq8oLumEyIp3Q2MR-aY7IfLZDamVrALniheU"
        }
    }
}
```

**Message with attachment**

```json
{
    "id": "682498302938465",
    "time": 1518479195594,
    "messaging": [
        {
            "sender": {
                "id": "<PSID>"
            },
            "recipient": {
                "id": "<PAGE_ID>"
            },
            "timestamp": 1518479195308,
            "message": {
                "mid": "mid.$cAAJdkrCd2ORnva8ErFhjGm0X_Q_c",
                "attachments": [
                    {
                        "type": "<image|video|audio|file>",
                        "payload": {
                            "url": "<ATTACHMENT_URL>"
                        }
                    }
                ]
            }
        }
    ]
}
```

## Get Your Hands Dirty 👩‍💻

Now run lesson_3_1 to start the red phase of the test driven development, you will find 4 test cases failing, one for each case we have discussed earlier (message, message with quick_reply, reply to message and attachment).

```sh
./scripts/start_tutorial.sh lesson_3_1
```

As usual, the test should be now on the red stage and we will be going to make it green now. In your code editor, search for lesson 3_1 by typing the below keyword 👇.

```javascript
// ToDo: Lesson 3_1
```

Start adding code to the now empty **parseMessageEvent**, you can format the parsed object as you want, my preference is to fix the common parameters cross all webhook parsed objects (e.g eventType, userPSID, userReference, sendingPageID, & timestamp) for the sake of code usability and readability. Keep in mind that I have used an **eventType** argument that read from a constants file, I will be using this property in the chatbot main logic in order to route the event to the proper request handling manager or function, and will do the same with other webhooks.

```javascript
const parseMessageEvent = (event) => {
    // ToDo: Lesson 3_1
    return {
        eventType: WEBHOOK_EVENT_TYPES.MESSAGE,
        userPSID: event.sender.id,
        userReference: event.sender.user_ref,
        sendingPageID: event.recipient.id,
        timestamp: event.timestamp,
        isQuickReply: event.message.quick_reply != undefined,
        isReplyToPreviousMessage: event.message.reply_to != undefined,
        hasAttachments: event.message.attachments != undefined,
        message: event.message,
    };
};
```

Also, I have defined some flags give me some sort of control on the request content behavior, you can check for these fields if exists instead of the flags, but I believe it is more readable and self descriptive that way. For **message** object, I used the same structure received in the request, this will give me some sort of flexibility in integrating future features and arguments into my logic as I don't need to explicitly parse every argument being added to this event.

Now, is it time to celebrate finishing one more lesson from this tutorial 🤔? Well, run the lesson command to make sure

```sh
./scripts/start_tutorial.sh lesson_3_1
```

<p align="center">
  <img src="https://media.giphy.com/media/3o85xESzqR5iqZS1S8/giphy.gif" />
</p>

How would it work without adding the **parseMessageEvent** to the now empty **parseEvent** function in the same manager 🤦‍♂️, GO ADD THIS LINE THERE 😡

```js
const parseEvent = (event) => {
    if (event.message) return parseMessageEvent(event);
};
```

Now, we can do the dance 😁

<p align="center">
  <img src="https://media.giphy.com/media/doPrWYzSG1Vao/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [messages Webhook Event Reference](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages)

## Next Lesson: [Lesson 3.2 - Parsing Postback Events](Lesson_3_2.md)
