# Lesson 2 - Messaging Events Webhook 💬

## In theory 📖

For this lesson, we will be focusing on the webhook responsible for receiving messages from the messenger platform, this means that with every message being sent from a user to your application, the messenger platform will fire a **POST** request to your webhook containing the [UserPSID](), [PageId](), and other message related parameters.

Hence the request body will have 2 parameters in this case:

```js
{
  object: 'page',// it is designed to tell your webhook that this request is from a page subscription, hence it should be always equal to **'page'**
  entry: [
      id: '<PAGE_ID>', // The page sending the event
      time: 1458692752478,
      messaging: [
        {
            sender: {
                id: '<PSID>', // User Page Scoped Id
            },
            recipient: {
                id: '<PAGE_ID>',
            },
            timestamp: 1458692752478,
        },
      ],
  ]
}
```

Keep in mind these few things:

-   The entry array may have more than 1 entry if multiple is batched.
-   entry.messaging is an array, but will only ever contain one message, so it is safe to always get the object of index[0].
-   The properties shown in the above example are the common ones, each message type will have its own set of properties and will be attached to the same messaging object just like sender, recipient, and timestamp.
-   In order not to receive the webhook event again, you should respond with 200 within 20 seconds or less from receiving the event.

## Get Your Hands Dirty 👩‍💻

Going into the practical side of things, first let's check the TDD red stage. Run the following command in your terminal 👇

```sh
./scripts/start_tutorial.sh lesson_2
```

As usual, the test should be now on the red stage and we will be going to make it green now. In your code editor, search for lesson 2 by typing the below keyword 👇.

```javascript
// ToDo: Lesson_2
```

Start adding your code following the comments mentioned above, make sure that your code will end up something like this 👇

```javascript
webhook.post('/webhook', (req, res) => {
    const data = req.body;
    const { object, entry } = data;
    if (object === 'page') {
        entry.forEach((entryEvent) => {
            try {
                const webhookEvent = entryEvent.messaging[0];
                const { sender, recipient, timestamp } = webhookEvent;

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

lesson_2 turned green? ✅ ? Good Job 👏, move to the next lesson 😉

```sh
./scripts/start_tutorial.sh lesson_2
```

## Citation

Documentation Reference:

-   [Setting Up Your Webhook](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup)

## Next Lesson: [Lesson 3 - Parsing Messaging Events](Lesson_3.md)

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
