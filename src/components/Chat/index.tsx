import * as React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { compose } from 'redux';
import uuid from 'uuid/v4';
import { NimblePicker as EmojiPicker, Emoji } from 'emoji-mart';
import EmojiData from 'emoji-mart/data/twitter.json';
import { TextField, Button } from '@material-ui/core';
import { Theme } from '../../store/types/settings';
import { SendIcon } from '../../icons';
import { AppState } from '../../store/reducers';
import * as chatActions from '../../store/actions/chat';
import * as settingsActions from '../../store/actions/settings';
import { Type, Message } from '../../store/types/chat';
import Feed from './Feed';

const socket = io.connect('localhost:8080');

const mapState = (state: AppState) => {
	const { messages } = state.chat;
	const { ctrlsend, username, theme, unread, sound } = state.settings;
	return { messages, username, theme, ctrlsend, unread, sound };
};

const mapDispatch = {
	addMessage: chatActions.addMessage,
	updateUnread: settingsActions.updateUnread
};

interface ChatProps {
	messages: Message[];
	username: string;
	ctrlsend: boolean;
	theme: Theme;
	unread: number;
	visible: boolean;
	sound: boolean;
	addMessage: typeof chatActions.addMessage;
	updateUnread: typeof settingsActions.updateUnread;
}

interface ChatState {
	message: string;
	showEmoticon: boolean;
}

class Chat extends React.Component<ChatProps, ChatState> {
	public state: ChatState = { message: '', showEmoticon: false };

	public componentDidMount() {
		socket.on('NEW_MESSAGE', (data: Message) => this.handleNewMessage(data));
	}

	public handleNewMessage = (data: Message) => {
		if (data.username === this.props.username) {
			data.type = Type.sent;
		} else {
			const notifier = document.getElementById('received_notifier') as HTMLAudioElement;
			if (notifier && this.props.sound) notifier.play();

			const { visible, unread, updateUnread } = this.props;
			if (!visible) updateUnread(unread + 1);
		}

		this.props.addMessage(data);
	};

	public handleSubmit = () => {
		const { message } = this.state;
		if (message.trim().length === 0) return;
		const { username, sound, addMessage } = this.props;

		const payload: Message = {
			id: uuid(),
			type: Type.sent,
			timestamp: new Date().getTime(),
			message,
			username
		};

		addMessage(payload);

		const notifier = document.getElementById('sent_notifier') as HTMLAudioElement;
		if (notifier && sound) notifier.play();

		socket.emit('SEND_MESSAGE', payload);

		this.setState({ message: '' });
	};

	public handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'Enter') {
			event.preventDefault();
			const { ctrlsend } = this.props;
			if (!ctrlsend) return;
			this.handleSubmit();
		} else if (event.key === 'Enter') {
			event.preventDefault();
			this.handleSubmit();
		}
	};

	public toggleEmoticon = (toggle?: boolean) => {
		if (toggle === undefined) {
			const { showEmoticon } = this.state;
			this.setState({ showEmoticon: !showEmoticon });
		} else {
			this.setState({ showEmoticon: toggle });
		}
	};

	public handleEmoji = (emoji: any) => {
		const { message } = this.state;
		this.setState({ message: message + emoji.native });
		this.toggleEmoticon(false);
	};

	public render() {
		const { messages, theme, ctrlsend } = this.props;
		const { message, showEmoticon } = this.state;
		return (
			<div className={theme} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
				<div style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
					<Feed messages={messages} />
				</div>
				{showEmoticon && (
					<EmojiPicker
						set="twitter"
						data={EmojiData}
						autoFocus
						showPreview={false}
						showSkinTones={false}
						emojiTooltip
						onSelect={this.handleEmoji}
					/>
				)}

				<div style={{ display: 'flex', marginBottom: 20 }}>
					<Button style={{ padding: 0 }} onClick={() => this.toggleEmoticon()}>
						<Emoji emoji="wink" set="twitter" size={24} />
					</Button>
					<TextField
						style={{ flex: 1, margin: 0 }}
						id="chat-message"
						label="What's on your mind?"
						value={message}
						autoFocus
						helperText={`CTRL + ENTER ${ctrlsend ? 'Enabled' : 'Disabled'}`}
						margin="normal"
						onChange={e => this.setState({ message: e.target.value })}
						onKeyDown={this.handleKeyPress}
						onFocus={showEmoticon ? () => this.toggleEmoticon(false) : () => null}
					/>
					<Button aria-label="Submit" type="submit" onClick={this.handleSubmit}>
						<SendIcon />
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
)(Chat);
