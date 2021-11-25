export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_API = 'REQUEST_API';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const actionLogin = (payload) => ({
  type: LOGIN,
  payload,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const fecthCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  delete result.USDT;
  dispatch(getCurrencies(result));
};
