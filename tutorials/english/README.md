# Facebook Messenger English Tutorial

## Table Of Content

1. [Introduction](#1-introduction)
    - [1.1. Tutorial Introduction 👋](#11-tutorial-introduction)
    - [1.2 Helicopter View 🚁](#12-helicopter-view)
    - [1.3 The Anatomy Of A Lesson 💀](#13-the-anatomy-of-a-lesson)
    - [1.4 Test Runner Script 👾](#14-test-runner-script)
    - [1.5 Environment Variables](#15-environment-variables)
    - [1.6 Setup your Facebook App](#16-setup-your-facebook-app)
2. [Tutorial Lessons](#2-usage-guide)
3. [All tests went green, what's Next⁉️](#3-all-tests-went-green-whats-next)

## 1. Introduction

### **1\.1\. Tutorial Introduction 👋**

As mentioned before in the main Readme.md file related to this repo, in This tutorial, I am relaying on [Test Driven Development](https://www.infoq.com/articles/test-driven-design-java/) as a practice in order to ensure that you are grasping the practices mentioned in this tutorial the optimum way as well as having a pi product of getting more familiar with TDD as a practice and a design technique. All the required tests for this tutorial was pre written [(You can find them in the tests folder)](../../tests), however, they are all in the **red state**, hence your goal will be moving this one into a green state.

### **1\.2 Helicopter View 🚁**

In order for your chatbot to receive and send messages from users on your page, you will need to manage this sort of communication using 2 main channels:

1.  Webhook to receive messages sent to your app.
2.  An Api to send to it the messages you want to deliver to your users.

The high level architecture of this whole operation can be summarized using this image 📸 👇

<p align="center">
  <a href="https://developers.facebook.com/docs/messenger-platform/introduction/"  target="_blank"><img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Intro_im4.png" /></a>
</p>

The conversation life cycle starts when a user sends message to your chatbot, the message received in the platform's servers and delivered to you through the Webhooks you have implemented **_(Lesson_1 & Lesson_2)_**. In your webhooks, you will parse the webhook event **_(Lesson_3)_**, build your app logic **_(Lesson_5)_** , and then send the message back through the platform's API **_(Lesson_4)_**. Finally, the platform will deliver the messages to your user on your behalf.

### **1\.3 The Anatomy Of A Lesson 💀**

Ideally, each lesson will consist of those 3 parts:

1. **In theory 📖** The lesson's high level concepts
2. **Get Your Hands Dirty 👩‍💻** The lesson's technical part and code related stuff.
3. **Citation** lesson references from the official documentation

### **1.4 Test Runner Script 👾**

In order to make it easier for you to run each lessons test and be super focused in moving them from **red state** to **green state**, I have developed a lesson runner specifically for this tutorial, you will find it in the **scripts folder**. Example from first lesson:

```
./scripts/start_tutorial.sh lesson_1
```

#### Red State

![image](https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Intro_im3.png)

#### Green State

![image](https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Intro_im2.png)

### **1.5 Environment Variables**

In the [dev.env](../../dev.env) file, you will find 4 variables defined that the coded needs to run, these are:

```
WEBHOOK_PORT=3000
MESSENGER_VERIFY_TOKEN=Bla_Bla
PAGE_ACCESS_TOKEN="bla_bla+bla"
FACEBOOK_SEND_API="https://graph.facebook.com/v8.0/me/messages?access_token="
```

**WEBHOOK_PORT**

Is the port that express js will be using for your app webhooks.

**MESSENGER_VERIFY_TOKEN**

A verify token that you will define during the facebook app configuration, you will need it in the code in order to verify the webhook of your application (will use it in lesson 1).

**PAGE_ACCESS_TOKEN**

An access token that will be generated for you during facebook app configuration as well. You will use this token in the send api in order to define the page you are using to send messages to your users.

**FACEBOOK_SEND_API**

The graph API that you will use in order to send messages from your application to your page's users, keep in mind that I am using version **8.0**

### **1.6 Setup your Facebook App**

You can follow [this link](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup) from the **official platform documentation** to have your app ready. However, you won't need this setup on order to follow up with this tutorial as all the lessons been prepared inside a testing environment.

Never the less, you will still need to do this step when you start publishing your chatbot on the platform and assign page to it.

## 2. Tutorial Lessons

-   [Lesson 1 - Verification Webhook 👮‍♂️](Lesson_1.md)
-   [Lesson 2 - Messaging Events Webhook 💬](Lesson_2.md)
-   [Lesson 3 - Parsing Messaging Events](Lesson_3.md)
    -   [Lesson 3.1 - Parsing Message Event](Lesson_3_1.md)
    -   [Lesson 3.2 - Parsing Postback Event](Lesson_3_2.md)
    -   [Lesson 3.3 - Parsing Referral Event](Lesson_3_3.md)
    -   [Lesson 3.4 - Parsing Appendix (Refactoring)](Lesson_3_4.md)
-   [Lesson 4 - Sending Messages 📩](Lesson_4.md)
    -   [Lesson 4.1 - Sending Sender Actions](Lesson_4_1.md)
    -   [Lesson 4.2 - Sending Text Messages](Lesson_4_2.md)
    -   [Lesson 4.3 - Sending Quick Replies](Lesson_4_3.md)
    -   [Lesson 4.4 - Sending Attachments](Lesson_4_4.md)
    -   [Lesson 4.5 - Sending Button Template](Lesson_4_5.md)
    -   [Lesson 4.6 - Sending Generic Template](Lesson_4_6.md)
    -   [Lesson 4.7 - Sending Media Template](Lesson_4_7.md)
    -   [Lesson 4.8 - Sending Messages Appendix](Lesson_4_8.md)
-   [Lesson 5 - Build your Super Echo Chatbot 💬🤖](Lesson_5.md)

## 3. All tests went green, what's Next⁉️

Well first of all congratulations 👏, congratulation for you for completing this tutorial and being ready to build your first chatbot. Another congratulation for me for having another one completed my first written online tutorials 😁, hence, a deserved cheers for both of us.

<p align="center">
  <img src="https://media.giphy.com/media/87NS05bya11mg/giphy.gif" />
</p>

I highly recommend try building a side project above the messenger platform, from an experience, it will great 😉. The reason why I am saying is due to:

1.  Plug & play platform, you don't need that much resources or learnings in order to do outstanding results.
2.  Your potential users are already there, everyone one is using messenger right now and it is easy to get them trying the chatbot than downloading an app.
3.  You will learn more about product management and see how each user interacts with your little alien 👽.

My first tinkering with the messenger platform was back to 2016-2017, I participated in 2017 MEA Bots for messenger challenge, luckily enough I have Won the first place by then, and hence a series of fortunate events started happening from knowing awesome people to attending F8 in person. That's why I am a little bit personally attached to this platform.

![image](https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/Intro_im5.JPG)

Wish you all the best, if you have any questions or needed to catch up, you can do so using twitter from here 👇.

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
