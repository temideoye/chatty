import { Message, ADD_MESSAGE, ChatActionTypes } from '../types/chat';

export const addMessage = (message: Message): ChatActionTypes => ({
	type: ADD_MESSAGE,
	payload: message
});
