# Lesson 3.2 - Parsing Postback Events

## In theory 📖

Postback event will be fired when a [postback button](https://developers.facebook.com/docs/messenger-platform/send-api-reference/postback-button), [Get Started button](https://developers.facebook.com/docs/messenger-platform/messenger-profile/get-started-button), or [persistent menu item](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu) is clicked.

The typical request body for this event will be like 👇

```json
{
    "sender": {
        "id": "<PSID>"
    },
    "recipient": {
        "id": "<PAGE_ID>"
    },
    "timestamp": 1458692752478,
    "postback": {
        "title": "<TITLE_FOR_THE_CTA>",
        "payload": "<USER_DEFINED_PAYLOAD>",
        "referral": {
            "ref": "<USER_DEFINED_REFERRAL_PARAM>",
            "source": "<SHORTLINK>",
            "type": "OPEN_THREAD"
        }
    }
}
```

Keep in mind that the referral object is optional, you will get it only if one of those scenarios being fulfilled:

-   The user entered the thread via an m.me link with a ref parameter and tapped the **Get Started button**.
-   The user entered the thread by scanning a parametric Messenger Code and tapped the **Get Started button**.
-   This is the **first postback** after user came from a Messenger Conversation Ad.
-   The user entered the thread via Discover tab and tapped the **Get Started button**.

Just leave the details of this referral thing now, we will visit this into details in the next lesson 😉.

## Get Your Hands Dirty 👩‍💻

Should keep saying in each lesson the red test phase bla bla bla thing, GO RUN THE COMMAND and look for the keyword

<p align="center">
  <img src="https://media.giphy.com/media/3otPowzRBqAi3h9uM0/giphy.gif" />
</p>

```sh
./scripts/start_tutorial.sh lesson_3_2
```

```javascript
// ToDo: Lesson 3_2
```

Paste the following code to **parsePostbackEvent**, just as we did in the previous lesson.

```javascript
const parsePostbackEvent = (event) => {
    // ToDo: Lesson 3_2
    return {
        eventType: WEBHOOK_EVENT_TYPES.POSTBACK,
        userPSID: event.sender.id,
        userReference: event.sender.user_ref,
        sendingPageID: event.recipient.id,
        timestamp: event.timestamp,
        isReferred: event.postback.referral != undefined,
        postback: {
            title: event.postback.title,
            payload: event.postback.payload,
        },
        referral: event.postback.referral,
    };
};
```

Keep in mind since the referral object here share the same characteristics of the main referral object, only coming from different scenario, I kept it in a separate object (outside the postback object) and added the flag **isPostbackReferred** for identification.

Now, is it time to celebrate finishing one more lesson from this tutorial 🤔?

<p align="center">
  <img src="https://media.giphy.com/media/Ii4xqW1M8M9hKrPcCe/giphy.gif" />
</p>

🙄 🤐

```js
const parseEvent = (event) => {
    if (event.message) return parseMessageEvent(event);
    if (event.postback) return parsePostbackEvent(event);
};
```

```sh
./scripts/start_tutorial.sh lesson_3_2
```

Hooray!

<p align="center">
  <img src="https://media.giphy.com/media/l2Sqb0owUC5s5tz5m/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [messages Webhook Event Reference](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_postbacks)

## Next Lesson: [Lesson 3.3 - Parsing Referral Events](Lesson_3_3.md)
