# Lesson 1 - Verification Webhook 👮‍♂️

## In theory 📖

Webhooks are the main channel that the messenger platform uses to communicate with your application. Mainly there are only two webhooks that you need to configure for your application to receive events from the platform.

1. Verify application webhook.
2. Messages related events.

Keep in mind that your webhook should meet the minimum performance standards defined by:

-   All webhook events respond with a 200 status code.
-   All webhook events to respond within 20 seconds or less.
-   All webhooks should have HTTPS support (Self-signed certificates are not supported).
-   A valid SSL certificate.
-   An open port that accepts GET & Post requests.

#### Verification Webhook\*\*

The main responsibility of this webhook is to ensure that your webhook is authentic and working. The requirements of this webhook are:

-   It should accepts GET requests.
-   Read three query string parameters received with the request:
    -   hub.mode (it needs to be equal to 'subscribe')
    -   hub.verify_token (The verify token that you have assigned to the facebook app in the previous step 👆)
    -   hub.challenge
-   Your code should compare the **hub.verify_token** with the one you have already provided and check for the **hub.mode** to be equal 'subscribe', if those 2 conditions were met, respond with 200 status code and the hub.challenge value received.

After doing so, the messenger platform subscribes your webhook to the app.

## Get Your Hands Dirty 👩‍💻

Going into the practical side of things, first let's check the TDD red stage. Run the following command in your terminal 👇

```sh
./scripts/start_tutorial.sh lesson_1
```

This command will run the tests for the first lesson (Verification Webhook), since that we have the function still to be empty, the test will fail with the following error message

```sh
  : Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Error:
  .
  .
  .
  Test Suites: 1 failed, 1 total
test_1  | Tests:       2 failed, 2 total
test_1  | Snapshots:   0 total
test_1  | Time:        12.072s
test_1  | Ran all test suites.
test_1  | Jest did not exit one second after the test run has completed.
```

Now, lets start getting our hands dirty 👩‍💻, in your editor search for:

```javascript
// ToDo: Lesson_1
```

Start adding your code following the comments mentioned above, make sure that your code will end up something like this 👇

```javascript
webhook.get('/webhook', (req, res) => {
    // ToDo: Lesson_1
    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = process.env.MESSENGER_VERIFY_TOKEN;
    // Parse the query params
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});
```

Keep writing until all tests pass for lesson_1.

<p align="center">
  <img src="https://media.giphy.com/media/l0Iy88cWKqBeBN92o/giphy.gif" />
</p>

```sh
./scripts/start_tutorial.sh lesson_1
```

once it did pass then Hooray 🎉🥳, You have passed the first lesson 😉.

<p align="center">
  <img src="https://media.giphy.com/media/zCln43mMti1UI/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [Setting Up Your Webhook](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup)

## Next Lesson: [Lesson 2 - Messaging Events Webhook 💬](Lesson_2.md)

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
