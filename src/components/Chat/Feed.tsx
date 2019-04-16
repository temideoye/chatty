import * as React from 'react';
import MessageGroup from './MessageGroup';
import Bubble from './Bubble';
import { Type, Message } from '../../store/types/chat';

interface FeedProps {
	messages: Message[];
	isTyping?: boolean;
}

interface Viewport {
	scrollHeight: number;
	clientHeight: number;
	scrollTop: number;
}

export default class Feed extends React.Component<FeedProps> {
	public static viewport: Viewport;

	public componentDidMount() {
		this.scrollToBottom();
	}

	public componentDidUpdate() {
		this.scrollToBottom();
	}

	public scrollToBottom() {
		const { scrollHeight, clientHeight } = Feed.viewport;
		Feed.viewport.scrollTop = scrollHeight > clientHeight ? scrollHeight - clientHeight : 0;
	}

	public renderMessages(messages: Message[]) {
		const { isTyping } = this.props;

		let collector: any = [];

		const messageNodes = messages.map((message, index) => {
			collector.push(message);
			const next = index + 1;
			if (!messages[next] || messages[next].type !== message.type) {
				const messageGroup = collector;
				collector = [];
				return <MessageGroup key={index} messages={messageGroup} />;
			}

			return null;
		});

		if (isTyping) {
			// while recipient is typing
			const timestamp = new Date().getTime();
			const typing = { id: '00', type: Type.received, message: '...', username: '', timestamp };
			messageNodes.push(
				<div className="message-group-wrapper" key="isTyping">
					<Bubble message={typing} />
				</div>
			);
		}

		return messageNodes.filter(e => e !== null);
	}

	public render() {
		return (
			<div
				className="chat-feed"
				ref={el => {
					if (el) Feed.viewport = el;
				}}
			>
				{this.renderMessages(this.props.messages)}
			</div>
		);
	}
}
