# Lesson 4.2 - Sending Text Messages

## In theory 📖

In this lesson, we will cover sending text messages (either single one or multiple ones) to the your users using the messenger platform. Keep in mind that since the messenger platform doesn't support natively queueing multiple messages, and it is recommended to send few short messages than one long message, I have wrote a simple logic in this lesson that helps you queue few messages, and give the user a waiting time after each message (with a typing on signal simulated) in order to simulate real life chatting and give the user the opportunity to read the whole message before sending the next one. Typically, a user reads at a speed of 3 words per second, hence, I will just split the sentence into words, then divide its length by 3 in order to get the number of seconds needed to wait.

## Get Your Hands Dirty 👩‍💻

As usual, look for the lesson keyword

```javascript
// ToDo: Lesson 4_2
```

Go to the **sendTextMessage** and **sendMultipleTextMessages** functions, for the single message logic, we will only need to format the json object to match the one mentioned in the documentation:

```json
"messaging_type": "<MESSAGING_TYPE>",
"recipient":{
  "id":"<PSID>"
},
"message":{
  "text":"hello, world!"
}
```

While, the multiple messages, I have implemented a little more complicated function where I:

-   Iterate over each text message in the **textMessagesArray**
-   After making sure that the message have been successfully delivered, In each message in the array (except for the last one):
    -   Send typing on signal.
    -   Calculate the number of seconds required to read the sent message (number of words / 3).
    -   Wait fot that number of seconds before moving on with the next message.

```javascript
const sendTextMessage = async (
    userPSID,
    messageText,
    { messagingType = MESSAGING_TYPES.RESPONSE } = {}
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
    return sendMessageThroughAPI(messageObject);
};

const sendMultipleTextMessages = async (
    userPSID,
    textMessagesArray,
    { messagingType = MESSAGING_TYPES.RESPONSE } = {}
) => {
    // ToDo: Lesson 4_2
    for (const [index, textMessage] of textMessagesArray.entries()) {
        await sendTextMessage(userPSID, textMessage, {
            messagingType,
        });
        if (!isLastMessageInArray(index, textMessagesArray)) {
            await sendTypingOn(userPSID);
            const secondsToWait = textMessage.split(' ').length / 3;
            await waitFor(secondsToWait);
        }
    }
};
```

A little clarification regarding the above code, whenever I see optional arguments with or without default values, I use **destructuring assignment** with default values assigned so that it gives flexibility with declaration and assigning default values. For example, in this code, I set the messagingType to equal **RESPONSE** since that most of the messages you send will be a response to user sent messages, hence no need to send that over and over again in each response.

```
 { messagingType = MESSAGING_TYPES.RESPONSE } = {}
```

```sh
./scripts/start_tutorial.sh lesson_4_2
```

<p align="center">
  <img src="https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [Send Messages](https://developers.facebook.com/docs/messenger-platform/send-messages)

## Next Lesson: [Lesson 4.3 - Sending Quick Replies]()
