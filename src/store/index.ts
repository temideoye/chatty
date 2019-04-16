import { createStore, applyMiddleware, compose } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { offline, createOffline } from '@redux-offline/redux-offline';
import config from '@redux-offline/redux-offline/lib/defaults';
import { rootReducer } from './reducers';

const persistConfig = {
	key: 'root',
	storage
};

const { enhanceReducer } = createOffline(config);

const persistedReducer = persistReducer(persistConfig, enhanceReducer(rootReducer));

export const store = createStore(
	persistedReducer,
	compose(
		applyMiddleware(thunk),
		offline(config)
	)
);

export const persistor = persistStore(store);
