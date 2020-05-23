const requestType = 'REQUEST';
const receiveDatesType = 'RECEIVE_DATES';
const receiveTitlesType = 'RECEIVE_TITLES';
const receivePagesType = 'RECEIVE_PAGES';
const initialState = { dates: [], titles: [], pages: [], isLoading: false };

export const actionCreators = {
    requestAllDates: () => async (dispatch, getState) => {

        dispatch({ type: requestType });

        const url = `api/RelatedPages/getAllDates`;
        const response = await fetch(url);
        const dates = await response.json();

        dispatch({ type: receiveDatesType, dates });
    },
    requestTitlesForTheDate: publishDate => async (dispatch, getState) => {

        dispatch({ type: requestType });

        const url = `api/RelatedPages/getTitlesForTheDay?publishDate=${publishDate}`;
        const response = await fetch(url);
        const titles = await response.json();

        dispatch({ type: receiveTitlesType, titles });
    },
    requestPagesForTheTitle: titleId => async (dispatch, getState) => {

        const url = `api/RelatedPages/getPagesForTitle?titleId=${titleId}`;
        const response = await fetch(url);
        const pages = await response.json();

        dispatch({ type: receivePagesType, pages });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveDatesType) {
        return {
            ...state,
            dates: action.dates,
            isLoading: false
        };
    }

    if (action.type === receiveTitlesType) {
        return {
            ...state,
            titles: action.titles,
            isLoading: false
        };
    }

    if (action.type === receivePagesType) {
        return {
            ...state,
            pages: action.pages,
            isLoading: false
        };
    }

    return state;
};
