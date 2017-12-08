import storage from 'redux-persist/es/storage'
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist'; // add new import
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

const config = {
    key: 'root',
    storage
};

const reducer = persistCombineReducers(config, reducers);

export default function configureStore() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    const persistor = persistStore(store);
    return { persistor, store };
}