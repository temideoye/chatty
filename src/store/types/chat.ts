export const ADD_MESSAGE = 'ADD_MESSAGE';

export enum Type {
	sent = 'SENT',
	received = 'RECEIVED'
}

export interface Message {
	id: string;
	type: Type;
	message: string;
	username: string;
	timestamp: number;
}

export interface ChatState {
	messages: Message[];
}

interface AddMessageAction {
	type: typeof ADD_MESSAGE;
	payload: Message;
}

export type ChatActionTypes = AddMessageAction;
