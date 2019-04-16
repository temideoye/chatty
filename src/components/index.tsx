import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppBar, Tabs, Tab, Badge } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SwipeableTabs from 'react-swipeable-views';
import { Theme } from '../store/types/settings';
import { AppState } from '../store/reducers';
import * as actions from '../store/actions/settings';
import Chat from './Chat';
import Settings from './Settings';
import { SettingsIcon, ChatIcon } from '../icons';
import Sound from '../sounds';

const lightTheme = createMuiTheme({
	palette: { type: 'light', primary: { main: '#1f3240' }, secondary: { main: '#ff3d00' } }
});

const darkTheme = createMuiTheme({
	palette: { type: 'dark', primary: { main: '#BDBDBD' }, secondary: { main: '#E1F5FE' } }
});

const mapState = (state: AppState) => {
	const { theme, unread } = state.settings;
	return { theme, unread };
};

const mapDispatch = {
	updateUnread: actions.updateUnread
};

interface RootProps {
	theme: Theme;
	unread: number;
	updateUnread: typeof actions.updateUnread;
}

interface RootState {
	tab: number;
}

class Root extends React.Component<RootProps, RootState> {
	public state: RootState = {
		tab: 0
	};

	public componentDidMount() {
		const { unread, updateUnread } = this.props;
		if (unread > 0) updateUnread(0);
	}

	public handleLinkChange = (event: any, value: number) => {
		const { unread, updateUnread } = this.props;
		const { tab } = this.state;
		if (tab === 1 && value === 0 && unread > 0) updateUnread(0);
		this.setState({ tab: value });
	};

	public render() {
		const { tab } = this.state;
		const { theme, unread } = this.props;
		const chatting: boolean = tab === 0;

		return (
			<MuiThemeProvider theme={theme === Theme.Light ? lightTheme : darkTheme}>
				<div className={`box ${theme}`}>
					<AppBar position="static">
						<Tabs value={tab} onChange={this.handleLinkChange} variant="fullWidth">
							<Tab
								icon={<ChatIcon />}
								label={
									<Badge color="secondary" badgeContent={unread}>
										CHAT
									</Badge>
								}
							/>
							<Tab icon={<SettingsIcon />} label="SETTINGS" />
						</Tabs>
					</AppBar>
					<div style={{ padding: 10, paddingTop: 5 }}>
						<SwipeableTabs index={tab} onChangeIndex={this.handleLinkChange}>
							<Chat visible={chatting} />
							<Settings />
						</SwipeableTabs>
					</div>
					<audio id="sent_notifier" src={Sound.sent} />
					<audio id="received_notifier" src={Sound.received} />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default compose(
	connect(
		mapState,
		mapDispatch
	)
)(Root);
