# Lesson 3.3 - Parsing Referral Events

## In theory 📖

This event will be fired when any of the referral scenarios mentioned in the last lesson being fulfilled **having the user already having a thread with the chatbot** on the contrary of the case being discussed in the last lesson where these scenarios were the user's first interaction and he/she used **Get Started** Button or any other postback button in between. The referral object json hence in this case is typically the same as the one in the last lesson, the only difference is that you will receive it in the referral key in the webhook object root, not inside the postback key.

```json
{
    "sender": {
        "id": "<PSID>"
    },
    "recipient": {
        "id": "<PAGE_ID>"
    },
    "timestamp": 1458692752478,
    "referral": {
        "ref": "<REF_DATA_PASSED_IN_M.ME_PARAM>",
        "source": "SHORTLINK",
        "type": "OPEN_THREAD"
    }
}
```

As we mentioned in the previous lesson, Referrals typically come from 5 different entries:

-   Following an [m.me link with a referral parameter.](https://developers.facebook.com/docs/messenger-platform/referral-params)
-   Clicking on a [Messenger Conversation Ad.](https://developers.facebook.com/docs/messenger-platform/guides/ads)
-   Scanning a [parametric Messenger Code.](https://developers.facebook.com/docs/messenger-platform/messenger-code)
-   Starting a conversation from the [Discover tab.](https://developers.facebook.com/docs/messenger-platform/discovery/discover-tab).
-   Starting or resuming a conversation from the [customer chat plugin.](https://developers.facebook.com/docs/messenger-platform/discovery/customer-chat-plugin)

## Get Your Hands Dirty 👩‍💻

<p align="center">
  <img src="https://media.giphy.com/media/MV1lkie34DMRaFuZFx/giphy.gif" />
</p>

```sh
./scripts/start_tutorial.sh lesson_3_3
```

```javascript
// ToDo: Lesson 3_3
```

😁👌

Paste the following code to **parseReferralEvent**, just as we did in the previous 2 lessons.

```javascript
const parseReferralEvent = (event) => {
    // ToDo: Lesson 3_3
    return {
        eventType: WEBHOOK_EVENT_TYPES.REFERRAL,
        userPSID: event.sender.id,
        userReference: event.sender.user_ref,
        sendingPageID: event.recipient.id,
        timestamp: event.timestamp,
        referral: event.referral,
    };
};
```

AS mentioned in the pervious lesson, I used the referral key for this event with the only differencing of having **isPostbackReferred** flag set to false in this case.

<p align="center">
  <img src="https://media.giphy.com/media/NUetUJhxCayQiFgeqQ/giphy.gif" />
</p>

```sh
./scripts/start_tutorial.sh lesson_3_3
```

<p align="center">
  <img src="https://media.giphy.com/media/fwQ2LSNYusDoTv3Pe6/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [messages Webhook Event Reference](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_referrals)

## Next Lesson: [Lesson 3.4 - Webhook Events Appendix](Lesson_3_4.md)

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
