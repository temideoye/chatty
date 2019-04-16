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
	SettingsActionTypes
} from '../types/settings';

export const updateUsername = (username: string): SettingsActionTypes => ({
	type: UPDATE_USERNAME,
	payload: username
});

export const updateTheme = (theme: Theme): SettingsActionTypes => ({
	type: UPDATE_THEME,
	payload: theme
});

export const updateClockFormat = (clock: Clock): SettingsActionTypes => ({
	type: UPDATE_CLOCK_FORMAT,
	payload: clock
});

export const updateCtrlSend = (ctrlsend: boolean): SettingsActionTypes => ({
	type: UPDATE_CTRL_SEND,
	payload: ctrlsend
});

export const updateUnread = (count: number): SettingsActionTypes => ({
	type: UPDATE_UNREAD,
	payload: count
});

export const updateSound = (sound: boolean): SettingsActionTypes => ({
	type: UPDATE_SOUND,
	payload: sound
});

export const restoreDefaults = (): SettingsActionTypes => ({
	type: RESTORE_DEFAULTS
});
