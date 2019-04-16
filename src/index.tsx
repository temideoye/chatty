import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Root from './components';
import { persistor, store } from './store';

import 'emoji-mart/css/emoji-mart.css';
import './css/main.css';

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Root />
			</PersistGate>
		</Provider>
	);
};

ReactDOM.render(<App />, document.querySelector('.root'));
