# Lesson 4 - Sending Messages

## In theory 📖

Welcome to most advanced part from this tutorial 😃. It represents the real nugget of the messenger platform due to the variety of templates and configurations you can use to make your chatbot more lively, authentic, presentable, and versatile. When you deal with sending messages to the messenger platform, keep in mind 2 things that you should be aware of.

### 1. Message Types

Sending messages to a user in the messenger platform requires the user to initiate the conversation with the chatbot in the first place. Given this fact and depending on the last message your chatbot received from the server and the use case that you want to support in your chatbot (on the same time limit users spamming and low quality interaction). The available types are:

-   **Standard Messaging** For responses to the messages & interactions your chatbot have received from a given user. Keep in mind that you have only 24 hours window to receive to any message received from a specific user. Any message of this type sent after the 24 hours window won't be delivered to the user.

-   **One Time Notification** For given use cases where your chatbot required to send some sort of a notification to the user (e.g package shipped to XXX), then you can use this type to deliver this type under the condition of having the user explicitly subscribed for such notification.

-   **Private Replies** Using this type, your chatbot will have the ability of sending a single message as a reply, when the user have commented or posted a post in your page. The current window for using this type of messaging is 7 days following the user's interaction with your page.

-   **Sponsored Messaging** You can use this type to send promotional and non promotional type of content beyond the 24 hours window.

### 2. Message Form

The messenger platform utilizes different forms of messaging to provide builders with versatility needed in order to build exciting & usable experiences. From normal texts & buttons to more specific templates like receipts and airlines, you have a variety of templates that you can match most of the use cases you would normal need in your chatbot. The following lessons will discuss most of those templates in details.

## Get Your Hands Dirty 👩‍💻

We won't have that much coding in this lesson aside from discussing the send message API request anatomy and prepare the send function for future lessons.

```javascript
// ToDo: Lesson 4
```

For any type of message you send, you should use the following url to graph API. This url would contain the API version your chatbot is currently supporting, as well as the **page access token** that you have received while configuring your facebook APP.

```
https://graph.facebook.com/v8.0/me/messages?access_token=<PAGE_ACCESS_TOKEN>
```

A successful send request will respond with the following json 👇

```json
{
    "recipient_id": "1008372609250235",
    "message_id": "m_AG5Hz2Uq7tuwNEhXfYYKj8mJEM_QPpz5jdCK48PnKAjSdjfipqxqMvK8ma6AC8fplwlqLP_5cgXIbu7I3rBN0P"
}
```

While an non successful request will have an error object in the [following scenarios](https://developers.facebook.com/docs/messenger-platform/reference/send-api/error-codes)

In the meantime, look for **messageSendingManager.js** file, go to the **sendMessageThroughAPI** function and start writing the below code 👇

```javascript
const sendMessageThroughAPI = async (messageObject) => {
    // ToDo: Lesson 4
    const response = await axios.post(SEND_URL, messageObject);
    const { data } = response;
    if (data.error)
        throw new Error(
            `Send API Request Failed ## Code (${data.error.code}) ##`
        );
    return;
};
```

**N.B: In this lesson, I am using [axios](https://github.com/axios/axios) for handling outgoing http requests**

Now, its time for the usual dance 😎

<p align="center">
  <img src="https://media.giphy.com/media/f8c2Hbv4lajIbJJQyi/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [Sending Messages](https://developers.facebook.com/docs/messenger-platform/send-messages)

## Next Lesson: [Lesson 4.1 - Sending Sender Actions](Lesson_4_1.md)

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
