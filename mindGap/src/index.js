/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.be0df69e-ec84-4025-a0cf-6c0af32444c4";

// Skill icon from: http://www.freepik.com

/* psychology facts from: 
http://www.thepsychmind.com
http://www.factslides.com/s-Psychology 
*/

/**
 * Array containing psychology facts.
 */
var MIND_GAP = [
    "90 percent of people will text things that they could never say in person.",
    "Psychology states that the average dream only lasts 2 to 3 seconds.",
	"Your shoes are much more important than you think. People draw many conclusions about a person based on what shoes they are wearing.",
	"Life is not about the people who act true to your face. It is about the people who remain true behind your back.",
	"Studies have shown that two strangers on average can only read up to 20 percent of the other persons' mind.",
	"A small amount of stress helps you to remember things better, but a large amount hinders your memory.",
	"Life does not change, but people do. Learn to accept that not everybody is who you thought you knew.",
	"Person disorientation is associated with cerebral trauma, seizures, or amnesia.",
	"Crying can strengthen a relationship by signalling your pain or vulnerability.",
	"That mood where everything irritates you indicates that you are actually missing someone.",
	"When people in love stare into each other's eyes, their heart beats sync together.",
	"Psychology says that playing video games makes you more creative.",
	"Happiness depends on our expectations.",
	"Psychology says, staying quiet does not mean you have nothing to say. It means that you do not think they are ready to hear your thoughts.",
	"Lack of sleep is associated with excessive worrying.",
	"If you want to know where your heart is, look where your mind goes when it wanders.",
	"Remember a past situation can provoke a person to feel the exact emotions that were attached to that specific memory.",
	"Children develop the ability to see through lies when they are about seven years old.",
	"If you wait until you are ready, you will be waiting the rest of your life.",
	"We think that other people are more easily influenced than ourselves.",
	"As hard as it may be, establish eye contact with everyone you meet. It is one of the best way to make people take you seriously.",
	"Intelligent people more are likely to avoid conflict which explains why some people notice everything but choose to say nothing.",
	"Your happiness has nothing to do the problems you face, it is how you choose to deal with them.",
	"If a person's pupils are dilated when they are talking to you, they are more likely to be interested in you.",
	"If you announce your goals to others, you are less likely to make them happen because you lose motivation, studies confirmed.",
	"Your mind rewrites monotonous speech of boring people to make it sound more interesting.",
	"There are more than 400 distinct phobias well recognized by psychologists.",
	"They type of music you listen to affects the way you perceive the world.",
	"Spending money on others yields more happiness than spending it on yourself a study concluded.",
	"Romantic love is biochemically indistinguishable from having a severe obsessive-compulsive disorder.",
	"Phobias may be memories passed down through generations in DNA, according to a new research.",
	"Phobophobia is the fear of having a phobia.",
	"There is a rare mental disorder where people imagine that they are decomposing, dead or non-existent.",
	"Researchers are debating on adding Internet addiction to the list of mental disorders.",
	"There is a gene that can cause you to be negative most of the time.",
	"Psychologists examined Internet trolls and found that they are narcissistic, psychopathic, and sadistic.",
	"The Truman Syndrome is a psychological disorder in which patients believe they are living in a reality TV show.",
	"The brain treats rejection like physical pain, according to scientists.",
	"The average high school kid today has the same level of anxiety as the average psychiatric patient in early 1950.",
	"Religious practices, like prayer and attending services, is associated with lower levels of psychological distress.",
	"No one born blind has ever developed schizophrenia.",
	"Research conducted on comedians and funny people have shown they are usually more depressed than average.",
	"Severe Depression can cause us to biologically age more by increasing the aging process in cells.",
	"About 1 million Japanese men are estimated to be locking themselves in their bedrooms for years, creating social and health problems, a condition called Hikikomori.",
	"In addition to aches, fever and pains, Tylenol (acetaminophen) also alleviates psychological pain, such as social rejection.",
	"Crying makes you feel better, reduces stress, and may help to keep the body healthy.",
	"The feeling of Certainty can be triggered without the need for facts or reasoning, using electric stimulation over a specific part of the brain.",
	"Around 6 percent of people have narcissistic personality disorder.”, They have a strong sense of self-importance and lack empathy.",
	"Gratitude can boost dopamine and serotonin, just like antidepressants.",
	"Sarcasm promotes creativity, a Harvard study found.",	
	"82 percent of people would feel more confident approaching an attractive person if they had their dog with them, a survey found."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * MindGap is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var MindGap = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
MindGap.prototype = Object.create(AlexaSkill.prototype);
MindGap.prototype.constructor = MindGap;

MindGap.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("MindGap onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

MindGap.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("MindGap onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
MindGap.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("MindGap onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

MindGap.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Mind Gap tell me a mind fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random psychology fact from the mind facts list
    var factIndex = Math.floor(Math.random() * MIND_GAP.length);
    var fact = MIND_GAP[factIndex];

    // Create speech output
    var speechOutput = "Here's your mind fact: " + fact;

    response.tellWithCard(speechOutput, "MindGap", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the MindGap skill.
    var mindGap= new MindGap();
    mindGap.execute(event, context);
};

