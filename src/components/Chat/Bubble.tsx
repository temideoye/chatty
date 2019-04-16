import * as React from 'react';
import { Typography } from '@material-ui/core';
import { Message } from '../../store/types/chat';

const Bubble: React.FunctionComponent<{ message: Message }> = props => {
	const { type, message } = props.message;

	let bubbleClass = 'chat-bubble';
	if (type === 'RECEIVED') bubbleClass += ' chat-bubble-alt';

	const bubbleTextClass = type === 'SENT' ? 'text-white m-0' : 'text-dark m-0';

	return (
		<div className="chat-bubble-container">
			<div className={bubbleClass}>
				<Typography className={bubbleTextClass}>{message}</Typography>
			</div>
		</div>
	);
};

export default Bubble;
