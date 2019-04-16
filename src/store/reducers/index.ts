import { combineReducers } from 'redux';
import { chatReducer } from './chat';
import { settingsReducer } from './settings';

export const rootReducer = combineReducers({
	chat: chatReducer,
	settings: settingsReducer
});

export type AppState = ReturnType<typeof rootReducer>;
