import Bowser from 'bowser';
import { ADD_MESSAGE, Type, ChatState, ChatActionTypes } from '../types/chat';

const browser = Bowser.getParser(window.navigator.userAgent).getBrowser();
const { location } = window;

const INITIAL_STATE: ChatState = {
	messages: [
		{
			id: '01',
			type: Type.received,
			username: 'Chatty Bot',
			message: 'Hey there! 👋',
			timestamp: new Date().getTime()
		},
		{
			id: '02',
			type: Type.sent,
			username: `${browser.name} ${browser.version}`,
			message: 'Hello, who are you?',
			timestamp: new Date().getTime()
		},
		{
			id: '03',
			type: Type.received,
			username: 'Chatty Bot',
			message: "I am Chatty's chat bot 😀",
			timestamp: new Date().getTime()
		},
		{
			id: '04',
			type: Type.sent,
			username: `${browser.name} ${browser.version}`,
			message: 'Hmm, and what is Chatty?',
			timestamp: new Date().getTime()
		},
		{
			id: '05',
			type: Type.received,
			username: 'Chatty Bot',
			message: `Chatty helps you send messages to other browsers`,
			timestamp: new Date().getTime()
		},
		{
			id: '06',
			type: Type.received,
			username: 'Chatty Bot',
			message: `In addition to this ${browser.name}, open a second browser`,
			timestamp: new Date().getTime()
		},
		{
			id: '07',
			type: Type.received,
			username: 'Chatty Bot',
			message: `Go to ${location}`,
			timestamp: new Date().getTime()
		},
		{
			id: '08',
			type: Type.received,
			username: 'Chatty Bot',
			message: 'And chat away!',
			timestamp: new Date().getTime()
		},
		{
			id: '09',
			type: Type.sent,
			username: `${browser.name} ${browser.version}`,
			message: '...',
			timestamp: new Date().getTime()
		}
	]
};

export const chatReducer = (state = INITIAL_STATE, action: ChatActionTypes): ChatState => {
	switch (action.type) {
		case ADD_MESSAGE:
			const messages = [...state.messages, action.payload];
			return { ...state, messages };

		default:
			return state;
	}
};
