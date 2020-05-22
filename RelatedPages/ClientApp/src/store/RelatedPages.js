const requestType = 'REQUEST';
const receiveTitlesType = 'RECEIVE_TITLES';
const receivePagesType = 'RECEIVE_PAGES';
const initialState = { titles: [], pages: [], isLoading: false };

export const actionCreators = {
    requestTitlesForTheDate: publishDate => async (dispatch, getState) => {

        dispatch({ type: requestType, publishDate });

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
