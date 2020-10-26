# Lesson 4.4 - Sending Attachments

## In theory 📖

The messenger platform allows you to attach image, video, audio and files to your messages. The maximum attachment size that you can send through the platform is **25MB** and the maximum resolution of an image to be **85 Mega Pixel**. You have 3 ways to attach an asset to a message, those 3 are:

-   Url.
-   File.
-   Attachment Id.

We will cover the Url one in this lesson, for the other 2, you will be asked to do them on your own in the appendix section from at the end of Lessons 4 category.

**Sample JSON**

```json
{
    "recipient": {
        "id": "1254459154682919"
    },
    "message": {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "http://www.messenger-rocks.com/image.jpg",
                "is_reusable": true
            }
        }
    }
}
```

## Get Your Hands Dirty 👩‍💻

Let's start implementing the function responsible for sending attachments, In the **messageSendingManager**, look for **sendAttachment** function (Or look for the usual keyword 🙄 - `// ToDo: Lesson 4_4`). Since we are implementing the url attachment scenario only now, the function will take _attachmentType_, _url_, & _isReusable_ besides the common ones we are using in all functions. The final function should look something like this one 👇.

```javascript
const sendAttachment = (
    userPSID,
    attachmentType,
    url,
    isReusable = true,
    { messagingType = MESSAGING_TYPES.RESPONSE, quickReplies } = {}
) => {
    // ToDo: Lesson 4_4
    const messageObject = {
        messaging_type: messagingType,
        recipient: {
            id: userPSID,
        },
        message: {
            attachment: {
                type: attachmentType,
                payload: {
                    url,
                    is_reusable: isReusable,
                },
            },
        },
    };
    if (quickReplies) messageObject.message.quick_replies = quickReplies;
    return sendMessageThroughAPI(messageObject);
};
```

```sh
./scripts/start_tutorial.sh lesson_4_4
```

<p align="center">
  <img src="https://media.giphy.com/media/Kxi6QqUGU2dHUD0hZ4/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [Send Messages](https://developers.facebook.com/docs/messenger-platform/send-messages)

## Next Lesson: [Lesson 4.5 - Sending Button Templates](Lesson_4_5.md)

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
