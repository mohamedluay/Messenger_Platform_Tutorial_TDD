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

## Next Lesson: [Lesson 3.4 - Webhook Events Appendix]()
