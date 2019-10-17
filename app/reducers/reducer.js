

export const FETCHING = 'FETCHING';
export const GET_FETCH_SUCCESS = 'GET_FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const POST_FETCH_SUCCESS = 'POST_FETCH_SUCCESS';
export const API_SUCCESS = 'API_SUCCESS';

const initialState = {
    students: [],
    isFetching: false,
    fetch_completed: true,
    error: false,
    login:{
        id:'prateek',
        password:'prateek',
    },
    results: {}

}

export default function reducer(state = initialState, action) {

    switch(action.type) {
        case FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case GET_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                fetch_completed: true,
                students: action.data
            }
        case POST_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                results: action.data
            }
        case API_SUCCESS:
            return {
                ...state,
                isFetching: false,
                results: action.data
            }    

        case FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}

function startFetching() {
    console.log('start fetchin')
    return {
        type: FETCHING
    }
}

function getfetchSuccess(data) {
    console.log('fetch success')
    console.log(data)
    return {
        type: GET_FETCH_SUCCESS,
        data
    }
}

function postfetchSuccess(data) {

    return {
        type: POST_FETCH_SUCCESS,
        data
    }
}


function fetchFailure(data) {
    console.log('fetch failed')
    return {
        type: FETCH_FAILURE,
        data
    }
}

function apiSuccess(data) {
    console.log('fetch succedd')
    return {
        type: API_SUCCESS,
        data
    }
}


export function getAPI(method) {
    console.log('getApi')

    return (dispatch) => {
        dispatch(startFetching())
        const requestOptions = {
            method: method
          };
        
        return(fetch(`http://localhost:3001/students`,requestOptions))
        .then(res => res.json())
        .then(json => {

            return(dispatch(getfetchSuccess(json)))
        })
        .catch(err => dispatch(fetchFailure(err)))
    }
}

export function API(method,id) {
    console.log('dleteApi')

    return (dispatch) => {
        dispatch(startFetching())
        const requestOptions = {
            method: method
          };
        
        return(fetch(`http://localhost:3001/students/${id}`,requestOptions))
        .then(res => res.json())
        .then(json => {

            return(dispatch(apiSuccess(json)))
        })
        .catch(err => dispatch(fetchFailure(err)))
    }
}

export function postAPI(details) {

    return (dispatch) => {
        dispatch(startFetching())
        
        return(fetch('https://api.myjson.com/bins/fz62x',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              first_name: details.first_name,
              last_name: details.last_name,
              dob: details.dob,
              address: details.address,
              specialization: details.specialization,
              education: details.education
            })}
        ))
        .then(res => res.json())
        .then(json => {

            return(dispatch(postfetchSuccess(json)))
        })
        .catch(err => dispatch(fetchFailure(err)))
    }
}