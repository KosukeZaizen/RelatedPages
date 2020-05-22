const requestWeatherForecastsType = 'REQUEST_WEATHER_FORECASTS';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = { forecasts: [], isLoading: false };

export const actionCreators = {
    requestWeatherForecasts: startDateIndex => async (dispatch, getState) => {
        if (startDateIndex === getState().weatherForecasts.startDateIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestWeatherForecastsType, startDateIndex });

        const url = `api/RelatedPages/getTitlesForTheDay?startDateIndex=${startDateIndex}`;
        const response = await fetch(url);
        const forecasts = await response.json();

        dispatch({ type: receiveWeatherForecastsType, startDateIndex, forecasts });
    },
    requestPagesForTheTitle: titleId => async (dispatch, getState) => {

        const url = `api/RelatedPages/getPagesForTitle?titleId=${titleId}`;
        const response = await fetch(url);
        const forecasts = await response.json();

        dispatch({ type: receiveWeatherForecastsType, titleId, forecasts });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestWeatherForecastsType) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            isLoading: true
        };
    }

    if (action.type === receiveWeatherForecastsType) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            forecasts: action.forecasts,
            isLoading: false
        };
    }

    return state;
};
