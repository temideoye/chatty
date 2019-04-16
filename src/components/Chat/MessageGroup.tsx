import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { Typography } from '@material-ui/core';
import Bubble from './Bubble';
import { AppState } from '../../store/reducers';
import { Clock } from '../../store/types/settings';
import { Message } from '../../store/types/chat';

const mapState = (state: AppState) => {
	const { clockFormat } = state.settings;
	const momentFormat = clockFormat === Clock.Twelve ? 'hh:mm a' : 'HH:mm';
	return { momentFormat };
};

interface MessageGroupProps {
	messages: Message[];
	momentFormat: string;
}

const MessageGroup: React.FunctionComponent<MessageGroupProps> = props => {
	const { messages, momentFormat } = props;
	const { type, username, timestamp } = messages[messages.length - 1];

	const messageNodes = messages.map((message, i: any) => <Bubble key={i} message={message} />);

	const time = moment(timestamp).format(momentFormat);
	const metaText = type === 'SENT' ? time : `${username}, ${time}`;
	let metaTextClass = 'message-group-meta';

	if (type === 'SENT') metaTextClass += ' float-right';

	return (
		<div className="message-group-wrapper">
			<Typography className={metaTextClass}>{metaText}</Typography>
			{messageNodes}
		</div>
	);
};

export default compose(connect(mapState))(MessageGroup);
