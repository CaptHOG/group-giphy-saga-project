import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put }from 'redux-saga/effects'
import axios from 'axios';
import { response } from 'express';


function* fetchGifs () {
    try{
        const response = yield  axios({
            method:  'GET',
            url: '/fruits'
        })
     yield put ({
        type: 'SET_STATE',
        payload: response.data
        })
    }catch (error){
        console.log(`fetch gif broke GET saga index`, error);
    }
}   

// Creates generator 
function* rootSaga(){
    yield  takeEvery('SAGA_FETCH_GIFS', fetchGifs)
}
// middleware for saga
const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.run(rootSaga);

ReactDOM.render(<App />, document.getElementById('root'));
