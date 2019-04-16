import Bowser from 'bowser';
import {
	Theme,
	Clock,
	UPDATE_USERNAME,
	UPDATE_THEME,
	UPDATE_CLOCK_FORMAT,
	UPDATE_CTRL_SEND,
	UPDATE_UNREAD,
	UPDATE_SOUND,
	RESTORE_DEFAULTS,
	SettingsState,
	SettingsActionTypes
} from '../types/settings';

const browser = Bowser.getParser(window.navigator.userAgent).getBrowser();

const INITIAL_STATE: SettingsState = {
	username: `${browser.name} ${browser.version}`,
	theme: Theme.Light,
	clockFormat: Clock.Twelve,
	ctrlsend: false,
	unread: 0,
	sound: true
};

export const settingsReducer = (
	state = INITIAL_STATE,
	action: SettingsActionTypes
): SettingsState => {
	switch (action.type) {
		case UPDATE_USERNAME:
			const username = action.payload;
			return { ...state, username };

		case UPDATE_THEME:
			const theme = action.payload;
			return { ...state, theme };

		case UPDATE_CLOCK_FORMAT:
			const clockFormat = action.payload;
			return { ...state, clockFormat };

		case UPDATE_CTRL_SEND:
			const ctrlsend = action.payload;
			return { ...state, ctrlsend };

		case UPDATE_UNREAD:
			const unread = action.payload;
			return { ...state, unread };

		case UPDATE_SOUND:
			const sound = action.payload;
			return { ...state, sound };

		case RESTORE_DEFAULTS:
			return INITIAL_STATE;

		default:
			return state;
	}
};
