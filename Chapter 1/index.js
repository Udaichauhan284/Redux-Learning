//this is old example
import { createStore, applyMiddleware, combineReducers} from "redux";

//importing axios to work on API json server
import axios from "axios";

//now i am importing MiddleWare Logger
import logger from "redux-logger";

//now i am importing Middleware Redux-thunk
import { thunk } from "redux-thunk";

//here while using Action, still i am passing that "increment string, so what you do,
//Make Action Name Constants
const inc = "account/increment";
const dec = "account/decrement";
const incByAmount = "account/incrementByAmount";
const getAccUserPending = 'account/getUserAccount/pending';
const getAccUserFulfilled = 'account/getUserAccount/fulfilled';
const getAccUserRejected = 'account/getUserAccount/rejected';
const incBonus = 'bonus/increment;'

//Action Name
//const init = "account/init";

//store
const store = createStore(combineReducers({
  account : accountReducer,
  bouns : bounsReducer
}), applyMiddleware(logger.default, thunk));

function accountReducer(state = { amount: 1 }, action) {
  //if(action.type === 'increment'){ //here i am using String
  // if(action.type === inc){ //here i am using Const
  //   //immutability
  //   return {amount: state.amount+1} //so this is new object, copy of old state. Here history also maintaining.

  //   //not a good way
  //   //state.amount = state.amount+1;
  // }
  // if(action.type === dec){
  //   return {amount: state.amount - 1}
  // }
  // if(action.type === incByAmount){
  //   return {amount: state.amount + action.playload};
  // }

  //Using Switch
  switch (action.type) {
    // case init:
    //   return { amount: action.playload };
    case getAccUserFulfilled:
      return {amount: action.playload, pending: false};
    case getAccUserRejected:
      return {...state, error:action.error, pending: false};
    case getAccUserPending:
      return {...state, pending: true};
    case inc:
      return { amount: state.amount + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incByAmount:
      return { amount: state.amount + action.playload };
    default:
      return state;
  }
}

//Bonus Reducer
function bounsReducer(state= {points: 0}, action){
  switch(action.type){
    case incBonus:
      return {points: state.points + 1};
    default:
      return state;
  }
}

//global state
//console.log(store.getState());
//action {type:"increment"} this is way

//API Call
// async function getUser(){
//   const {data} = await axios.get("http://localhost:3000/accounts/1");
//   console.log(data);
// }
// getUser();

//Action Creators
// function initUser(value){
//   return {type: init, playload:value}
// }

//Action Creators init using thunk
// async function initUser(dispatch, getState) {
//   const { data } = await axios.get("http://localhost:3000/accounts/1");
//   dispatch({ type: init, playload: data.amount });
// }

//now change above to getUser
function getUserAccount(id) {
  return async (dispatch, getState) => {
    try{
      const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
      dispatch(getAccountUserFulfilled(data.amount));
    } catch(error){
      dispatch(getAccountUserRejected(error.message));
    }
  };
}
//now create initUser
// function initUser(value) {
//   return { type: init, playload: value };
// }
function getAccountUserFulfilled(value){
  return {type: getAccUserFulfilled, playload: value};
}
function getAccountUserRejected(error){
  return {type: getAccUserRejected, error: error};
}
function getAccountUserPending(){
  return {type: getAccUserPending};
}
function increment() {
  return { type: inc };
}
function decrement() {
  return { type: dec };
}
function incrementByAmount(value) {
  return { type: incByAmount, playload: value };
}
function incrementBonus(value){
  return {type: incBonus};
}
//dispatch
// setInterval(()=>{
//  // store.dispatch({type:"increment"});
//  //store.dispatch({type : 'incrementByAmount',playload: 3});

//  //store.dispatch(decrement());
// //  store.dispatch(incrementByAmount(4));

// },1000);

//Dispatch using thunk
setTimeout(() => {
  store.dispatch(getUserAccount(2));
  //store.dispatch(increment());
  //store.dispatch(incrementBonus());
}, 1000);
//console.log(store.getState())
