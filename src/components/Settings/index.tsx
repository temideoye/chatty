import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemSecondaryAction,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	IconButton,
	Switch,
	Divider,
	Button,
	Avatar,
	TextField,
	Select,
	Typography
} from '@material-ui/core';
import {
	AccountIcon,
	EditIcon,
	InterfaceIcon,
	ClockIcon,
	KeyboardIcon,
	SoundIcon
} from '../../icons';
import { Theme, Clock } from '../../store/types/settings';
import { AppState } from '../../store/reducers';
import * as actions from '../../store/actions/settings';

const mapState = (state: AppState) => {
	const { username, theme, clockFormat, ctrlsend, sound } = state.settings;
	return { username, theme, clockFormat, ctrlsend, sound };
};

const mapDispatch = {
	updateUsername: actions.updateUsername,
	updateTheme: actions.updateTheme,
	updateClockFormat: actions.updateClockFormat,
	updateCtrlSend: actions.updateCtrlSend,
	updateSound: actions.updateSound,
	restoreDefaults: actions.restoreDefaults
};

interface SettingsProps {
	username: string;
	theme: string;
	clockFormat: string;
	ctrlsend: boolean;
	sound: boolean;
	updateUsername: typeof actions.updateUsername;
	updateTheme: typeof actions.updateTheme;
	updateClockFormat: typeof actions.updateClockFormat;
	updateCtrlSend: typeof actions.updateCtrlSend;
	updateSound: typeof actions.updateSound;
	restoreDefaults: typeof actions.restoreDefaults;
}

interface SettingsState {
	dialogOpen: boolean;
	username: string;
}

class Settings extends React.Component<SettingsProps, SettingsState> {
	public state: SettingsState = {
		dialogOpen: false,
		username: this.props.username
	};

	public handleDialogClick = (save?: boolean) => {
		const { dialogOpen, username } = this.state;
		const { username: oldUsername, updateUsername } = this.props;
		this.setState({ dialogOpen: !dialogOpen });
		if (save && username.length > 0 && username !== oldUsername) {
			updateUsername(username);
		}
	};

	public handleUsernameChange = (event: React.BaseSyntheticEvent) => {
		this.setState({ username: event.target.value });
	};

	public handleChange = (event: React.BaseSyntheticEvent) => {
		const {
			theme,
			updateTheme,
			clockFormat,
			ctrlsend,
			sound,
			updateClockFormat,
			updateCtrlSend,
			updateSound,
			restoreDefaults
		} = this.props;

		switch (event.currentTarget.name) {
			case 'theme': {
				updateTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
				break;
			}

			case 'clockFormat': {
				updateClockFormat(clockFormat === Clock.Twelve ? Clock.TwentyFour : Clock.Twelve);
				break;
			}

			case 'ctrlsend': {
				updateCtrlSend(ctrlsend !== true);
				break;
			}

			case 'sounds': {
				updateSound(sound !== true);
				break;
			}

			case 'reset': {
				restoreDefaults();
				break;
			}

			default:
		}
	};

	public render() {
		const { username, theme, clockFormat, ctrlsend, sound } = this.props;
		return (
			<div className="settings-container">
				<List>
					<ListItem>
						<Avatar>
							<AccountIcon />
						</Avatar>
						<ListItemText primary="Username" secondary={username} />
						<ListItemSecondaryAction>
							<IconButton aria-label="Edit Username" onClick={() => this.handleDialogClick()}>
								<EditIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
				<Dialog open={this.state.dialogOpen} aria-labelledby="form-dialog-title" maxWidth="xs">
					<DialogContent>
						<DialogContentText>Update your username.</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="username"
							defaultValue={this.state.username}
							label="Username"
							type="text"
							onChange={this.handleUsernameChange}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.handleDialogClick(false)} color="primary">
							Cancel
						</Button>
						<Button onClick={() => this.handleDialogClick(true)} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>

				<Divider />

				<List>
					<ListItem>
						<ListItemIcon>
							<InterfaceIcon />
						</ListItemIcon>
						<ListItemText primary={theme} secondary="Interface Color" />
						<ListItemSecondaryAction>
							<Switch name="theme" onChange={this.handleChange} checked={theme === Theme.Light} />
						</ListItemSecondaryAction>
					</ListItem>

					<Divider variant="inset" />

					<ListItem>
						<ListItemIcon>
							<ClockIcon />
						</ListItemIcon>
						<ListItemText primary={clockFormat} secondary="Clock Display" />
						<ListItemSecondaryAction>
							<Switch
								name="clockFormat"
								onChange={this.handleChange}
								checked={clockFormat === Clock.Twelve}
							/>
						</ListItemSecondaryAction>
					</ListItem>

					<Divider variant="inset" />

					<ListItem>
						<ListItemIcon>
							<SoundIcon />
						</ListItemIcon>
						<ListItemText primary="Sound" secondary={sound ? 'Enabled' : 'Disabled'} />
						<ListItemSecondaryAction>
							<Switch name="sounds" onChange={this.handleChange} checked={sound} />
						</ListItemSecondaryAction>
					</ListItem>

					<Divider variant="inset" />

					<ListItem>
						<ListItemIcon>
							<KeyboardIcon />
						</ListItemIcon>
						<ListItemText
							primary="Send with CTRL + ENTER"
							secondary={ctrlsend ? 'Enabled' : 'Disabled'}
						/>
						<ListItemSecondaryAction>
							<Switch onChange={this.handleChange} checked={ctrlsend} name="ctrlsend" />
						</ListItemSecondaryAction>
					</ListItem>
				</List>

				<Divider />

				<div style={{ padding: 15 }}>
					<Typography color="textSecondary" variant="subtitle1">
						Language
					</Typography>

					<Select native value={0} onChange={this.handleChange}>
						<option value="" disabled>
							Change your Language
						</option>
						<option value={0}>English</option>
					</Select>
				</div>

				<div style={{ marginTop: 60, marginBottom: 20 }}>
					<Button
						variant="contained"
						name="reset"
						color="primary"
						fullWidth
						onClick={this.handleChange}
					>
						Reset to defaults
					</Button>
				</div>
			</div>
		);
	}
}

export default compose(
	connect(
		mapState,
		mapDispatch
	)
)(Settings);
