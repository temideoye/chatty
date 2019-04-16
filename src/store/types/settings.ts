export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_THEME = 'UPDATE_THEME';
export const UPDATE_CLOCK_FORMAT = 'UPDATE_CLOCK_FORMAT';
export const UPDATE_CTRL_SEND = 'UPDATE_CTRL_SEND';
export const UPDATE_UNREAD = 'UPDATE_UNREAD_COUNT';
export const UPDATE_SOUND = 'UPDATE_SOUND';
export const RESTORE_DEFAULTS = 'RESTORE_DEFAULTS';

export enum Theme {
	Light = 'Light',
	Dark = 'Dark'
}

export enum Clock {
	TwentyFour = '24-hour clock',
	Twelve = '12-hour clock'
}

export interface SettingsState {
	username: string;
	theme: Theme;
	clockFormat: Clock;
	ctrlsend: boolean;
	unread: number;
	sound: boolean;
}

interface UpdateUsernameAction {
	type: typeof UPDATE_USERNAME;
	payload: string;
}

interface UpdateThemeAction {
	type: typeof UPDATE_THEME;
	payload: Theme;
}

interface UpdateClockFormatAction {
	type: typeof UPDATE_CLOCK_FORMAT;
	payload: Clock;
}

interface UpdateCtrlSendAction {
	type: typeof UPDATE_CTRL_SEND;
	payload: boolean;
}

interface UpdateUnreadAction {
	type: typeof UPDATE_UNREAD;
	payload: number;
}

interface UpdateNotificationAction {
	type: typeof UPDATE_SOUND;
	payload: boolean;
}

interface RestoreDefaultsAction {
	type: typeof RESTORE_DEFAULTS;
}

export type SettingsActionTypes =
	| UpdateUsernameAction
	| UpdateThemeAction
	| UpdateClockFormatAction
	| UpdateCtrlSendAction
	| UpdateUnreadAction
	| UpdateNotificationAction
	| RestoreDefaultsAction;
