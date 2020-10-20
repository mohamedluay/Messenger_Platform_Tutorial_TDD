const { parseEvent } = require('../managers/webhookEventsManager');
const {
    WEBHOOK_EVENT_TYPES,
} = require('../constants/messengerPlatformConstants');

describe('3.2 - Parsing Postback Event', () => {
    it('should parse postback event object', () => {
        const stubEvent = {
            sender: {
                id: '<PSID>',
            },
            recipient: {
                id: '<PAGE_ID>',
            },
            timestamp: 1458692752478,
            postback: {
                title: '<TITLE_FOR_THE_CTA>',
                payload: '<USER_DEFINED_PAYLOAD>',
            },
        };
        const parsedEvent = parseEvent(stubEvent);
        expect(parsedEvent.eventType).toBe(WEBHOOK_EVENT_TYPES.POSTBACK);
        expect(parsedEvent.userPSID).toBe('<PSID>');
        expect(parsedEvent.sendingPageID).toBe('<PAGE_ID>');
        expect(parsedEvent.timestamp).toBe(1458692752478);
        expect(parsedEvent.isPostbackReferred).toBeFalsy();

        expect(parsedEvent.postback.title).toBe('<TITLE_FOR_THE_CTA>');
        expect(parsedEvent.postback.payload).toBe('<USER_DEFINED_PAYLOAD>');
    });

    it('should parse postback event object with referral', () => {
        const stubEvent = {
            sender: {
                id: '<PSID>',
            },
            recipient: {
                id: '<PAGE_ID>',
            },
            timestamp: 1458692752478,
            postback: {
                title: '<TITLE_FOR_THE_CTA>',
                payload: '<USER_DEFINED_PAYLOAD>',
                referral: {
                    ref: '<USER_DEFINED_REFERRAL_PARAM>',
                    source: '<SHORTLINK>',
                    type: 'OPEN_THREAD',
                },
            },
        };
        const parsedEvent = parseEvent(stubEvent);
        expect(parsedEvent.eventType).toBe(WEBHOOK_EVENT_TYPES.POSTBACK);
        expect(parsedEvent.userPSID).toBe('<PSID>');
        expect(parsedEvent.sendingPageID).toBe('<PAGE_ID>');
        expect(parsedEvent.timestamp).toBe(1458692752478);
        expect(parsedEvent.isPostbackReferred).toBeTruthy();

        expect(parsedEvent.postback.title).toBe('<TITLE_FOR_THE_CTA>');
        expect(parsedEvent.postback.payload).toBe('<USER_DEFINED_PAYLOAD>');

        expect(parsedEvent.referral).toEqual(stubEvent.postback.referral);
    });
});
