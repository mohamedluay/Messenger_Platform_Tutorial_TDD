const { parseEvent } = require('../managers/webhookEventsManager');

const {
    WEBHOOK_EVENT_TYPES,
} = require('../constants/messengerPlatformConstants');

describe('6 - Built-In NLP', () => {
    it('should parse entities & traits attached to user message', () => {
        const stubEvent = {
            sender: {
                id: '<PSID>',
            },
            recipient: {
                id: '<PAGE_ID>',
            },
            timestamp: 1458692752478,
            message: {
                mid: 'mid.1457764197618:41d102a3e1ae206a38',
                text: 'see you tomorrow at 4pm',
                entities: {
                    'wit$datetime:datetime': [
                        {
                            id: '340464963587159',
                            name: 'wit$datetime',
                            role: 'datetime',
                            start: 8,
                            end: 23,
                            body: 'tomorrow at 4pm',
                            confidence: 0.9704,
                            entities: [],
                            type: 'value',
                            grain: 'hour',
                            value: '2020-06-16T16:00:00.000-07:00',
                            values: [
                                {
                                    type: 'value',
                                    grain: 'hour',
                                    value: '2020-06-16T16:00:00.000-07:00',
                                },
                            ],
                        },
                    ],
                },
                traits: {
                    wit$sentiment: [
                        {
                            id: '5ac2b50a-44e4-466e-9d49-bad6bd40092c',
                            value: 'neutral',
                            confidence: 0.6162,
                        },
                    ],
                },
            },
        };
        const parsedEvent = parseEvent(stubEvent);
        expect(parsedEvent.eventType).toBe(WEBHOOK_EVENT_TYPES.MESSAGE);
        expect(parsedEvent.userPSID).toBe('<PSID>');
        expect(parsedEvent.sendingPageID).toBe('<PAGE_ID>');
        expect(parsedEvent.timestamp).toBe(1458692752478);
        expect(parsedEvent.entities).toEqual([
            {
                name: 'wit$datetime:datetime',
                confidence: 0.9704,
                value: '2020-06-16T16:00:00.000-07:00',
            },
        ]);
        expect(parsedEvent.traits).toEqual([
            {
                confidence: 0.6162,
                name: 'wit$sentiment',
                value: 'neutral',
            },
        ]);
    });
});
