const requestWeatherForecastsType = 'REQUEST_WEATHER_FORECASTS';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = { forecasts: [], isLoading: false };

export const actionCreators = {
    requestWeatherForecasts: publishDate => async (dispatch, getState) => {

        dispatch({ type: requestWeatherForecastsType, publishDate });

        const url = `api/RelatedPages/getTitlesForTheDay?publishDate=${publishDate}`;
        console.log(url);
        const response = await fetch(url);
        const forecasts = await response.json();

        dispatch({ type: receiveWeatherForecastsType, publishDate, forecasts });
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
