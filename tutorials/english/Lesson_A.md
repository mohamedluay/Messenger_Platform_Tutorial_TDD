# Lesson Appendix - Setting Up Your Facebook APP

After finishing all these lessons, you will be most probably wondering how can I setup my first Facebook App to be used on the messenger platform. This is a quick appendix lesson to show you the way that this looks like in real life, the process is pretty easy and simple and you can do it in few simple steps.

Before doing all these steps, you still need to deploy your application somewhere in order to get the webhooks url that you will use in this lesson. I would recommend deploying it on [heroku](https://www.heroku.com/nodejs) if you want to have quick straight forward hosting to your application that would probably cost you nothing for a test app like this one.

### 1. Create Your Facebook APP

From the [apps link](https://developers.facebook.com/apps/) within facebook developers website, create an app.

<details>
      <summary>Show Image</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_A_im1.png" />
</p>
</details>

### 2. Select the propose of your app

Select manage business integrations from the list

<details>
      <summary>Show Image</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_A_im2.png" />
</p>
</details>

### 3. Fill in your app details

<details>
      <summary>Show Image</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_A_im3.png" />
</p>
</details>

### 4. Setup Messenger App

From the list of apps that will be displayed to you, click on the setup button associated with the messenger app card

<details>
      <summary>Show Image</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_A_im4.png" />
</p>
</details>

### 5. Add pages to your app

Select or create the page that would be associated with your chatbot. Keep in mind that you can support more than 1 page using the same app. In the image below, I have one of my apps accessible by more than one page as an illustration for that.

<details>
      <summary>Show Image</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_A_im8.png" />
</p>
</details>

### 5. Setup your webhook

Now setup your webhooks by setting your application url as well as the verify token that we have talked about in lesson 1. Also, don't forget selecting the subscriptions that you need your app to support. Keep in mind that some of these subscriptions would need to be approved first by the messenger team.

<details>
      <summary>Show Images</summary>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_A_im9.png" />
</p>
<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_A_im10.png" />
</p>
</details>

### CONGRATULATIONS 🎉

And we are done with the whole tutorial and the the the technical part 😁🕺.

For the sense of achievement, I have made a command that runs all tests together

```sh
./scripts/start_tutorial.sh all_lessons
```

<p align="center">
  <img src="https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/images/lesson_5_im1.png" />
</p>

If you reached it this far, please let me know by tweeting it [from here](https://twitter.com/intent/tweet?text=Hi%20@_mluay,%20I%20have%20completed%20the%20Messenger%20Platform%20Tutorial,%20check%20my%20tests%20%F0%9F%98%81%F0%9F%91%87) 🙏
.

<p align="center">
  <img src="https://media.giphy.com/media/ieyZRXWJLQ2TX4Aln1/giphy.gif" />
</p>

## Citation

Documentation Reference:

-   [Setting Up Your Facebook App](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup/)

## Next Lesson: [All tests went green, what's Next⁉️](https://github.com/mohamedluay/Messenger_Platform_Tutorial_TDD/blob/master/tutorials/english/README.md#3-all-tests-went-green-whats-next%EF%B8%8F)

[<img src="https://img.shields.io/badge/@_mluay%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>](https://twitter.com/_mluay)
