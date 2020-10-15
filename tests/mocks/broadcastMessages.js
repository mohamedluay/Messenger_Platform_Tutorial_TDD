const { MESSAGING_TYPES } = require('../../constants/facebook');

const generateBroadcastMessagesMock = (messages) =>
  messages.reduce((newMessages, currentMessage, currentIndex) => {
    newMessages.push({
      messaging_type: MESSAGING_TYPES.RESPONSE,
      recipient: {
        id: 1
      },
      message: {
        text: currentMessage,
        quick_replies: undefined
      }
    });
    if (currentIndex < messages.length - 1) {
      newMessages.push({
        recipient: {
          id: 1
        },
        sender_action: 'typing_on'
      });
    }
    return newMessages;
  }, []);

module.exports = {
  generateBroadcastMessagesMock
};
