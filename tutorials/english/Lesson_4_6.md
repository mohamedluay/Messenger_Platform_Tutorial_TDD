# Lesson 4.5 - Sending Generic Template

## In theory 📖

Generic template is one of the most versatile templates to use, it mixes between the use of images, text & buttons and presented in a horizontally scrollable carousel what makes it a perfect template for displaying different items with details and visual indication.

<p align="center">
  <img style="width: 800px;" src="https://scontent.fcai19-1.fna.fbcdn.net/v/t39.2178-6/13178095_790767981060697_1148772092_n.png?_nc_cat=104&ccb=2&_nc_sid=5ca315&_nc_ohc=7mn64-TdWhsAX_Yg5yX&_nc_ht=scontent.fcai19-1.fna&oh=38f2d3edcf8e6513806fbac4a39eec2c&oe=5FB9998A" />
</p>

This templates consist of an array of elements (maximum 10 elements) that will be displayed horizontally side by side, hence the request sample for this one will look something like this 👇

**Request Sample**

```json
{
    "recipient": {
        "id": "<PSID>"
    },
    "message": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Welcome!",
                        "image_url": "https://petersfancybrownhats.com/company_image.png",
                        "subtitle": "We have the right hat for everyone.",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://petersfancybrownhats.com/view?item=103",
                            "webview_height_ratio": "tall"
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://petersfancybrownhats.com",
                                "title": "View Website"
                            },
                            {
                                "type": "postback",
                                "title": "Start Chatting",
                                "payload": "DEVELOPER_DEFINED_PAYLOAD"
                            }
                        ]
                    }
                ]
            }
        }
    }
}
```

## Get Your Hands Dirty 👩‍💻

As usual, we will dedicate a manager to be responsible for creating the template's elements object, we will name it **genericTemplateBuilder** which in turn has a function called **buildGenericListElement**. The file will look like this:

```javascript
// ToDo: Lesson_4_6
const buildGenericListElement = (
    title,
    { subtitle, imageUrl, defaultAction, buttons } = {}
) => {
    const elementTemplate = { title };
    if (subtitle) elementTemplate.subtitle = subtitle;
    if (imageUrl) elementTemplate.image_url = imageUrl;
    if (defaultAction) elementTemplate.default_action = defaultAction;
    if (buttons) elementTemplate.buttons = buttons;
    return elementTemplate;
};

module.exports = {
    buildGenericListElement,
};
```

A pretty simple straight forward one 😁.

For the sending function, go to the **sendGenericTemplate** inside the **messageSendingManager.js** file and use the elements array produced to populate the object to be send to the user.

```javascript
const sendGenericTemplate = (
    userPSID,
    elements,
    { messagingType = MESSAGING_TYPES.RESPONSE, imageAspectRatio } = {}
) => {
    // ToDo: Lesson 4_6
    const messageObject = {
        messaging_type: messagingType,
        recipient: {
            id: userPSID,
        },
        message: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: MESSAGE_TEMPLATE_TYPES.GENERIC,
                    elements,
                },
            },
        },
    };
    if (imageAspectRatio)
        messageObject.message.payload.image_aspect_ratio = imageAspectRatio;
    return sendMessageThroughAPI(messageObject);
};
```

Keep in mind that the image aspect ratio property is an optional property _(default horizontal)_ responsible for rendering the **element.image_url** property either horizontal (1.91:1) or square (1:1).

```sh
./scripts/start_tutorial.sh lesson_4_6
```

<p align="center">
  <img src="https://media.giphy.com/media/BIPRDoFF8DbPi/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [Generic Template](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic)
-   [Generic Template Reference](https://developers.facebook.com/docs/messenger-platform/reference/templates/generic)

## Next Lesson: [Lesson 4.6 - Sending Media Template]()
