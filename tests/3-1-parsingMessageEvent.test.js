const { parseEvent } = require('../managers/webhookEventsManager');
const {
    WEBHOOK_EVENT_TYPES,
    ATTACHMENT_TYPES,
} = require('../constants/messengerPlatformConstants');

describe('3.1 - Parsing Message Event', () => {
    it('should parse text message object if found in the webhook event object', () => {
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
                text: 'hello, world!',
            },
        };
        const parsedEvent = parseEvent(stubEvent);
        expect(parsedEvent.eventType).toBe(WEBHOOK_EVENT_TYPES.MESSAGE);
        expect(parsedEvent.userPSID).toBe('<PSID>');
        expect(parsedEvent.sendingPageID).toBe('<PAGE_ID>');
        expect(parsedEvent.timestamp).toBe(1458692752478);
        expect(parsedEvent.isQuickReply).toBeFalsy();
        expect(parsedEvent.isReplyToPreviousMessage).toBeFalsy();
        expect(parsedEvent.hasAttachments).toBeFalsy();

        expect(parsedEvent.message).toEqual(stubEvent.message);
    });

    it('should parse a quick_reply text message event object', () => {
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
                text: 'hello, world!',
                quick_reply: {
                    payload: '<DEVELOPER_DEFINED_PAYLOAD>',
                },
            },
        };
        const parsedEvent = parseEvent(stubEvent);
        expect(parsedEvent.eventType).toBe(WEBHOOK_EVENT_TYPES.MESSAGE);
        expect(parsedEvent.isQuickReply).toBeTruthy();
        expect(parsedEvent.message.quick_reply.payload).toBe(
            '<DEVELOPER_DEFINED_PAYLOAD>'
        );
    });

    it('should parse a reply_to text message event object', () => {
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
                text: 'hello, world!',
                reply_to: {
                    mid: 'm_1fTq8oLumEyIp3Q2MR-aY7IfLZDamVrALniheU',
                },
            },
        };
        const parsedEvent = parseEvent(stubEvent);
        expect(parsedEvent.eventType).toBe(WEBHOOK_EVENT_TYPES.MESSAGE);
        expect(parsedEvent.isReplyToPreviousMessage).toBeTruthy();
        expect(parsedEvent.message.reply_to.mid).toBe(
            'm_1fTq8oLumEyIp3Q2MR-aY7IfLZDamVrALniheU'
        );
    });

    it('should parse message event with attachments', () => {
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
                attachments: [
                    {
                        type: 'image',
                        payload: {
                            url: '<ATTACHMENT_URL>',
                        },
                    },
                ],
            },
        };
        const parsedEvent = parseEvent(stubEvent);
        expect(parsedEvent.eventType).toBe(WEBHOOK_EVENT_TYPES.MESSAGE);
        expect(parsedEvent.hasAttachments).toBeTruthy();
        expect(parsedEvent.message.attachments[0].type).toBe(
            ATTACHMENT_TYPES.IMAGE
        );
        expect(parsedEvent.message.attachments[0].payload.url).toBe(
            '<ATTACHMENT_URL>'
        );
    });
});
