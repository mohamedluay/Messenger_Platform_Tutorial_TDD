# Facebook Messenger English Tutorial

## Table Of Content

1. [Introduction](#1-introduction)
   - [1.1. Tutorial Introduction 👋](#11-tutorial-introduction)
   - [1.2 How to get maximum benefit from this tutorial 💪🏻](#12-run-with-docker)
   - [1.3 Helicopter View 🚁](#13-run-with-local-nodejs)
2. [Part I: Webhooks 🔌](#2-usage-guide)
   - [2.1 Setup Your Facebook App]()
   - [2.2 Setup Your Webhooks]()
     - [2.2.1 (GET) Verification Webhook]()
     - [2.2.2 (POST) Received Events Webhook]()
   - [2.3 Environment Variables]()
3. [Part II: Messaging 💬](#2-usage-guide)
   - [3.1 Received Messages Through Webhook 📩]()
     - [3.1.1 Parsing Text Messages]()
     - [3.1.2 Parsing Attachments]()
     - [3.1.3 Parsing Referrals]()
     - [3.1.4 Parsing Postback]()
   - [3.2 Sending Messages 📨]
     - [3.2.1 Send Text Messages]()
     - [3.2.1 Send Attachments]()
     - [3.2.1 Send Generic List]()
4. [Part III: Wit & Built In NLP 🤖](#2-usage-guide)
   - [2.1 Setup Your Facebook App]
   - [2.1 Environment Variables]()
   - [2.2 Chatbots Rules]()
   - [2.3 Run Extra Code Besides Response ]()
   - [2.4 Broadcaster]

## 1. Introduction

### **1\.1\. Tutorial Introduction 👋**

In This tutorial, I am relaying on [Test Driven Development](https://www.infoq.com/articles/test-driven-design-java/) as a practice in order to ensure that you are grasping the practices mentioned in this tutorial the optimum way as well as having a bi product of getting more familiar with TDD as a practice and a design technique. All the required tests for this tutorial was pre written [(You can find them in the tests folder)](), however, they are all in the **red state**, hence your goal will be moving this one into a green state.

### **1\.2 How to get maximum benefit from this tutorial 💪🏻**

Recommended Installation!

### **1\.3 Helicopter View 🚁**

## 2. Webhooks 🔌

Webhooks are the main channel that the messenger platform uses to communicate with your application. Mainly there are only two webhooks that you need to configure for your application to receive events from the platform.

1. Verify application webhook.
2. Messages related events.

Keep in mind that your webhook should meet the minimum performance standards defined by:

- All webhook events respond with a 200 status code.
- All webhook events to respond within 20 seconds or less.
- All webhooks should have HTTPS support (Self-signed certificates are not supported).
- A valid SSL certificate.
- An open port that accepts GET & Post requests.

### **2\.1\. Setup Your Facebook App**

### **2\.2\. Setup Your Webhooks**

#### **2\.2\.1 (GET) Verification Webhook**

The main responsibility of this webhook is to ensure that your webhook is authentic and working. The requirements of this webhook are:

- It should accepts GET requests.
- Read three query string parameters received with the request:
  - hub.mode (it needs to be equal to 'subscribe')
  - hub.verify_token (The verify token that you have assigned to the facebook app in the previous step 👆)
  - hub.challenge
- Your code should compare the **hub.verify_token** with the one you have already provided and check for the **hub.mode** to be equal 'subscribe', if those 2 conditions were met, respond with 200 status code and the hub.challenge value received.

After doing so, the messenger platform subscribes your webhook to the app.

Going into the practical side of things, you will find the below functions inside the **./webhooks.js** file, pretty simple and easy one.

```javascript
webhook.get('/webhook', (req, res) => {
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

#### **2\.2\.2 (POST) Received Events Webhook**
