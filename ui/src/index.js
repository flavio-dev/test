import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import filterReducers from './components/SidebarContainer/reducers'
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';
import { combineReducers } from 'redux'

const middlewares = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const rootReducer = combineReducers({
    reducer,
    filters: filterReducers
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
