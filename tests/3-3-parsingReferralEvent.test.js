const { parseEvent } = require('../managers/webhookEventsManager');
const {
    WEBHOOK_EVENT_TYPES,
    REFERRAL_SOURCES,
} = require('../constants/messengerPlatformConstants');

describe('3.3 - Parsing Referral Event', () => {
    it('should parse referral event object referred referred from m.me link', () => {
        const stubEvent = {
            sender: {
                id: '<PSID>',
            },
            recipient: {
                id: '<PAGE_ID>',
            },
            timestamp: 1458692752478,
            referral: {
                ref: '<REF_DATA_PASSED_IN_M.ME_PARAM>',
                source: 'SHORTLINK',
                type: 'OPEN_THREAD',
            },
        };

        const parsedEvent = parseEvent(stubEvent);
        expect(parsedEvent.eventType).toBe(WEBHOOK_EVENT_TYPES.REFERRAL);
        expect(parsedEvent.userPSID).toBe('<PSID>');
        expect(parsedEvent.sendingPageID).toBe('<PAGE_ID>');
        expect(parsedEvent.timestamp).toBe(1458692752478);

        expect(parsedEvent.referral.ref).toBe(
            '<REF_DATA_PASSED_IN_M.ME_PARAM>'
        );
        expect(parsedEvent.referral.source).toBe(REFERRAL_SOURCES.SHORTLINK);
        expect(parsedEvent.referral.type).toBe('OPEN_THREAD');
    });

    it('should parse referral event object referred referred from AD', () => {
        const stubEvent = {
            sender: {
                id: '<PSID>',
            },
            recipient: {
                id: '<PAGE_ID>',
            },
            timestamp: 1458692752478,
            referral: {
                ref: '<REF_DATA_IF_SPECIFIED_IN_THE_AD>',
                ad_id: '<ID_OF_THE_AD>',
                source: 'ADS',
                type: 'OPEN_THREAD',
            },
        };

        const parsedEvent = parseEvent(stubEvent);
        expect(parsedEvent.eventType).toBe(WEBHOOK_EVENT_TYPES.REFERRAL);
        expect(parsedEvent.userPSID).toBe('<PSID>');
        expect(parsedEvent.sendingPageID).toBe('<PAGE_ID>');
        expect(parsedEvent.timestamp).toBe(1458692752478);

        expect(parsedEvent.referral.ref).toBe(
            '<REF_DATA_IF_SPECIFIED_IN_THE_AD>'
        );
        expect(parsedEvent.referral.source).toBe(REFERRAL_SOURCES.ADS);
        expect(parsedEvent.referral.type).toBe('OPEN_THREAD');
        expect(parsedEvent.referral.ad_id).toBe('<ID_OF_THE_AD>');
    });

    it('should parse referral event object Referred from chat plugin', () => {
        const stubEvent = {
            sender: {
                user_ref: '<USER_REF>',
            },
            recipient: {
                id: '<PAGE_ID>',
            },
            timestamp: 1458692752478,
            referral: {
                ref: '<REF_DATA_PASSED_IN_CODE>',
                source: 'CUSTOMER_CHAT_PLUGIN',
                type: 'OPEN_THREAD',
                referer_uri: '<WEBSITE_URL>',
            },
        };

        const parsedEvent = parseEvent(stubEvent);
        expect(parsedEvent.eventType).toBe(WEBHOOK_EVENT_TYPES.REFERRAL);
        expect(parsedEvent.userPSID).toBe(undefined);
        expect(parsedEvent.userReference).toBe('<USER_REF>');
        expect(parsedEvent.sendingPageID).toBe('<PAGE_ID>');
        expect(parsedEvent.timestamp).toBe(1458692752478);

        expect(parsedEvent.referral.ref).toBe('<REF_DATA_PASSED_IN_CODE>');
        expect(parsedEvent.referral.source).toBe(
            REFERRAL_SOURCES.CUSTOMER_CHAT_PLUGIN
        );
        expect(parsedEvent.referral.type).toBe('OPEN_THREAD');
        expect(parsedEvent.referral.referer_uri).toBe('<WEBSITE_URL>');
    });
});
