const greetingsMock = {
  entities: {
    greetings: [
      {
        confidence: 0.85,
        value: true
      }
    ]
  }
};

const moneyTransferMock = {
  entities: {
    amount_of_money: [
      {
        confidence: 0.9650075,
        value: 50,
        type: 'value',
        unit: '$'
      }
    ],
    email: [
      {
        confidence: 0.96904833333333,
        value: 'your-name@email.com'
      }
    ],
    datetime: [
      {
        confidence: 0.96793833333333,
        values: [
          {
            value: '2018-01-30T14:00:00.000+01:00',
            grain: 'hour',
            type: 'value'
          }
        ],
        value: '2018-01-30T14:00:00.000+01:00',
        grain: 'hour',
        type: 'value'
      }
    ]
  }
};

module.exports = {
  greetingsMock,
  moneyTransferMock
};
