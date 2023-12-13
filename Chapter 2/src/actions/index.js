import axios from "axios";
export const inc = 'account/increment';
export const dec = 'account/decrement';
export const incByAmt = 'account/incrementByAmount';
export const getAccUserPending = 'account/getUserAccount/pending';
export const getAccUserFulfilled = 'account/getUserAccount/fulfilled';
export const getAccUserRejected = 'account/getUserAccount/rejected';
export const incBonus = 'bonus/increment;';

export function getUserAccount(id){
  return async (dispatch) =>{
    try{
      dispatch(getAccountUserPending());
      const {data} = await axios.get(`http://localhost:8080/accounts/${id}`);
      dispatch(getAccountUserFulfilled(data.amount));
    }catch(error){
      dispatch(getAccountUserRejected(error.message));
    }
  }
}

export function getAccountUserFulfilled(value){
  return {type: getAccUserFulfilled, payload: value};
}
export function getAccountUserRejected(error){
  return {type: getAccUserRejected, error: error};
}
export function getAccountUserPending(){
  return {type: getAccUserPending};
}
export function increment(){
  return {type: inc};
}
export function decrement(){
  return {type: dec};
}
export function incrementByAmount(value){
  return {type: incByAmt, payload: value};
}
export function incrementBonus(){
  return {type: incBonus};
}