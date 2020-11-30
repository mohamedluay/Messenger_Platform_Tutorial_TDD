# Lesson 6 - BuiltIn NLP

## In theory 📖

One of the coolest features that come in handy with the messenger platform is the Built-in NLP feature that you can optionally turn on from your Facebook Application.

<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_6_im1.png" />
</p>

The built-in NLP feature will automatically detect entities and intents for you, and will attach it every request message you receive on your chatbot. This will save you in terms of both latency and complexity requesting an external NLP API like Wit.ai or Dialogflow.

By default, the built-in NLP feature, detects the 15 entities below. Keep in mind that Dates and times are automatically localized based on the locale sent in the user's profile. In other words, if the users sends you a message like "yesterday at 6 pm", you will get the actual timestamp with the message itself.

<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_6_im2.png" />
</p>

This feature supports 22 languages, these languages are:
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

Coming to the practical side of things. By now you should have enabled the built-in NLP already from your Facebook Application and ready to consume the entities and traits you will be receiving from the platform.

_p.s if you find entities as a terminology ambiguous to you, don't worry as we will cover that much more deeper in the next lesson 😉_

Now you can go search for the keyword we usually look for 😁

```javascript
// ToDo: Lesson_6
```

Now, inside the **parseMessageEvent**, I will add two properties to the parsed object, one for the entities found in the message, and the other one for the traits. Keep in mind that we will implement the entities/traits extraction logic in a separate functions for more cleanses and better developer experience.

```javascript
const parseMessageEvent = (event) => {
    // ToDo: Lesson 3_1
    // ToDo: Lesson_6
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
        entities: extractEntitiesFromMessageObject(event.message),
        traits: extractTraitsFromMessageObject(event.message),
    };
};
```

For the **extractEntitiesFromMessageObject**, first of all we will check if the message object has entities included, if not we will return an empty array as by the end of the day not all message will have entities identified from it and we don't want our code to throw an exception every time it doesn't have an entities object. Otherwise, let's construct a new array structure for every entity that contains (entity name, value and confidence). Keep in mind that although this 3 properties doesn't cover all the options supported by Wit.ai, however, it does the job for most of the time, hence, if you find your application does require more details then implement them accordingly in this function.

```javascript
const extractEntitiesFromMessageObject = (message) => {
    // ToDo: Lesson_6
    if (!message.entities) return [];
    const entitiesNames = Object.keys(message.entities);
    const entities = entitiesNames.map((entityName) => ({
        name: entityName,
        confidence: message.entities[entityName][0].confidence,
        value: message.entities[entityName][0].value,
    }));
    return entities;
};
```

The same is applicable to the **extractTraitsFromMessageObject** function

```javascript
const extractTraitsFromMessageObject = (message) => {
    // ToDo: Lesson_6
    if (!message.traits) return [];
    const traitNames = Object.keys(message.traits);
    const traits = traitNames.map((traitName) => ({
        name: traitName,
        confidence: message.traits[traitName][0].confidence,
        value: message.traits[traitName][0].value,
    }));
    return traits;
};
```

Let's run this lesson tests to check if it passes yet 🤓.

```sh
./scripts/start_tutorial.sh lesson_6
```

Hooray 🎊 🎉

<p align="center">
  <img src="https://media.giphy.com/media/w8No4F78DXxBSBQoRt/giphy.gif" />
</p>

In the next lesson, we will learn how to use Wit.ai to further customize the NLP feature and use it for more extensible application.

## Citation

Documentation Reference:

-   [Built-in NLP](https://developers.facebook.com/docs/messenger-platform/built-in-nlp/)

## Next Lesson: [Lesson 7 - Native Wit.ai Support](https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/Lesson_7.md)

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
