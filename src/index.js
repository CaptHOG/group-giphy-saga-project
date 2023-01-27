import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put }from 'redux-saga/effects'
import axios from 'axios';



function* fetchGifs () {
    try{
        const response = yield  axios({
            method:  'GET',
            url: '/api/favorite'
        })
     yield put ({
        type: 'SET_STATE',
        payload: response.data
        })
    }catch (error){
        console.log(`fetch gif broke GET saga index`, error);
    }
}

function* fetchSearch () {
    try{
        const response = yield  axios({
            method:  'GET',
            url: '/api/favorite/search'
        })
     yield put ({
        type: 'SET_SEARCH',
        payload: response.data
        })
    }catch (error){
        console.log(`fetch search broke GET saga index`, error);
    }
} 

const favorites = (state = [], action) => {
    switch (action.type) {
        case 'SET_STATE':
            return action.payload;
        default:
            return state;
    }
}

const results = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            console.log("this is the:", action.payload.data);
            return action.payload.data;
        default:
            return state;
    }
} 

// Creates generator 
function* rootSaga(){
    yield  takeEvery('SAGA_FETCH_GIFS', fetchGifs)
    yield  takeEvery('SAGA_FETCH_SEARCH', fetchSearch)

}
// middleware for saga
const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
    combineReducers({
        favorites,
        results
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);


sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
