import { handleActions } from 'redux-actions';

import { ActionTypes } from 'src/store/constants';

export const initialState = {
  loading: false,
  converting: false,
  currencies: [],
  history: [],
};

export default {
  currencies: handleActions(
    {
      [ActionTypes.GET_CURRENCIES]: (state) => {
        return {
          ...state,
          loading: true,
        };
      },
      [ActionTypes.GET_CURRENCIES_SUCCESS]: (state, { payload }) => {
        return {
          ...state,
          loading: false,
          currencies: Object.entries(payload).reduce((acc, [key, value]) => {
            return [
              ...acc,
              {
                key,
                value,
              },
            ];
          }, []),
        };
      },
      [ActionTypes.CONVERT_CURRENCY]: (state) => {
        return {
          ...state,
          converting: true,
        };
      },
      [ActionTypes.CONVERT_CURRENCY_SUCCESS]: (state, { payload }) => {
        console.log(payload);
        return {
          ...state,
          history: [
            {
              date: payload.date,
              rate: payload.info.rate,
              query: payload.query,
              result: payload.result,
            },
            ...state.history,
          ],
          converting: false,
        };
      },
    },
    initialState
  ),
};