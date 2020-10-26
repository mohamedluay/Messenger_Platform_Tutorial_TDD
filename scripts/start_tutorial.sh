#!/usr/bin/env bash



cmd=$1

if [ -z "$cmd" ]; then
    echo "
Please choose the lesson you want to run (e.g: lesson_3_2)
    "
else        
    if [ "$cmd" = "lesson_1" ]; then    
        docker-compose run test node_modules/jest/bin/jest.js tests/1-webhookVerification.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_2" ]; then    
        docker-compose run test node_modules/jest/bin/jest.js tests/2-messagingEventsWebhook.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_3" ]; then    
        docker-compose run test node_modules/jest/bin/jest.js tests/3-parsingMessagingEvents.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_3_1" ]; then    
        docker-compose run test node_modules/jest/bin/jest.js tests/3-1-parsingMessageEvent.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_3_2" ]; then            
        docker-compose run test node_modules/jest/bin/jest.js tests/3-2-parsingPostbackEvent.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_3_3" ]; then    
        docker-compose run test node_modules/jest/bin/jest.js tests/3-3-parsingReferralEvent.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_3_4" ]; then 
        docker-compose run test node_modules/jest/bin/jest.js tests/3-4-webhookEventsAppendix.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_4_1" ]; then 
        docker-compose run test node_modules/jest/bin/jest.js tests/4-1-sendingSenderActions.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_4_2" ]; then 
        docker-compose run test node_modules/jest/bin/jest.js tests/4-2-sendingTextMessages.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_4_3" ]; then 
        docker-compose run test node_modules/jest/bin/jest.js tests/4-3-sendingQuickReplies.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_4_4" ]; then 
        docker-compose run test node_modules/jest/bin/jest.js tests/4-4-sendingAttachments.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_4_5" ]; then 
        docker-compose run test node_modules/jest/bin/jest.js tests/4-5-sendingButtonTemplate.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_4_6" ]; then 
        docker-compose run test node_modules/jest/bin/jest.js tests/4-6-sendingGenericTemplate.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_4_7" ]; then 
        docker-compose run test node_modules/jest/bin/jest.js tests/4-7-sendingMediaTemplate.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "lesson_5" ]; then 
        docker-compose run test node_modules/jest/bin/jest.js tests/5-superEchoChatbot.test.js --detectOpenHandles --forceExit
    elif [ "$cmd" = "all_lessons" ]; then 
        docker-compose run test node_modules/jest/bin/jest.js --detectOpenHandles --forceExit
    else
      echo "
I can't find this lesson, please try the lesson codes placed in the tuorial!
    "
    fi
    
fi