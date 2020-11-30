# Lesson 7 - Native Wit.ai Support

## In theory 📖

[Wit.ai](wit.ai) is a tool that provides NLP as a service to your application, it helps you understand the action intended by the user sending the message, hence, you would only worry about executing the action rather than understanding the intent.

What is interesting in the messenger platform is that it implicitly support the integration with Wit.ai meaning that you don't need to do an extra API request to identify the intended action out of each message as with simple integration, you will receive that directly into your webhook event just like we did in the previous lesson.

To integrate your wit.ai app into your Facebook app, do the following:

1. Go to your app's 'Messenger Settings' page.
2. In the 'Built-in NLP' section, select one of your subscribed Pages.
   _(Those 2 steps are common with the previous lesson and you should have them enabled by now)_

3- Add your Wit Server access token. You can find your access token in the Wit App settings.

<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Lesson_7_im1.png" />
</p>

### Understanding The Difference Between Utterances, Intents & Entities

**Utterance:** Represents the whole sentence (message) that the user sends to your chatbot. For example, if the user sends to your chatbot **"Book me a table for 4 tomorrow 3 PM"** then the whole sentence is considered an utterance.

**Intent:** It represents the user's intention from the message he sent, or the action he wanted to perform from that message. Using the same example in the previous sentence, then the user intent here is booking a table. Intents usually given a mix of a verb and a noun as a name, e.g: bookTable.

Entity: An entity is anything that modifies an intent. Using the same example earlier, when the user says **"Book me a table for 4 tomorrow 3 PM"** then 4, tomorrow, 3PM are all considered entities that constitutes the intent. Entities could be something like **numberOfSeats**, **dateTime** ... etc

## Get Your Hands Dirty 👩‍💻

First of all let's setup our project within Wit.ai

<details>
      <summary>Show Image</summary>
    <p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Lesson_7_im2.png" />
</p>
</details>

Click on the **+ New App** button and start filling your App's details

<details>
      <summary>Show Image</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Lesson_7_im3.png" />
</p>
</details>

Now, let's get our hand dirty and start giving the app some possible utterances and define some intents and entities to these utterances.

For example, enter the following utterance in the designated field **"book table for 4 tomorrow 3 pm"**

<details>
      <summary>Show Image</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Lesson_7_im5.png" />
</p>
</details>

You will find that wit automatically detected **tomorrow 3 pm** as a datetime entity, that is because datetime is one of the generically supported entities in the platform, however, we will give this utterance an intent name, e.g **bookTable**. Then click Train and Validate Button.

Now let's try writing something like **"I want to book a table today 10 pm"**, you can use the same intent that we have created earlier to map it to this utterance as well.

<details>
      <summary>Show Image</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Lesson_7_im6.png" />
</p>
</details>

What about defining our first entity now, let's say that the restaurant provide 1 of 3 course types upon booking (seafood, chicken, or beef), hence I would create an intent named **selectMenuCourse** and assign those 3 values as a new entity called **courseType**

<details>
      <summary>Show Images</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Lesson_7_im7.png" />
</p>

<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Lesson_7_im8.png" />
</p>

<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Lesson_7_im9.png" />
</p>
</details>

Now let's explore what we have done through the management menu on the left hand side of wit.ai dashboard.

**Intents We Have Defined**

<details>
      <summary>Show Image</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Lesson_7_im10.png" />
</p>
</details>

**Course Type Entity**

<details>
      <summary>Show Image</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Lesson_7_im12.png" />
</p>
</details>

**Utterances Trained**

<details>
      <summary>Show Image</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Lesson_7_im13.png" />
</p>
</details>

As simple as this, we can define all the intents, entities and traits that our chatbot would support. Then you would receive all these info side by side with the webhook events that you chatbot handles as we have illustrated in the previous lesson. This implicit integration between the messenger platform and Wit.ai will save you both Complexity and latency of handling or requesting similar APIs within your code, as the messenger platform will provide it to you in a nutshell 😎.

All what would you need to do now is to define your main app logic in the **responseHandlingManager**, so that you use the entities you have defined inside wit.ai to identify the intended action your users would perform, and then serve them based on that fact.

Having one more lesson before finishing this tutorial, It is time for a one before last wild dance 😁.

<p align="center">
  <img src="https://media.giphy.com/media/dmirAxknJvd9C/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [Wit.ai How](https://wit.ai/how)
-   [Wit.ai Quick Start](https://wit.ai/docs/quickstart)
-   [Chatbot Vocabulary: 10 Chatbot Terms You Need to Know](https://tangowork.com/chatbot-vocabulary/)
-   [Messenger Platform - Customizing NLP via Wit.ai](https://developers.facebook.com/docs/messenger-platform/built-in-nlp/#customizing_nlp)

## Next Lesson: [ Lesson Appendix - Setting Up Your Facebook APP](https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/tree/master/tutorials/english#3-all-tests-went-green-whats-next)

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
