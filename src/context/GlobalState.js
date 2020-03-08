import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    transactions: [
        { id: 1, text: 'Floor', amount: -20 },
        { id: 2, text: 'Floor', amount: 300 },
        { id: 3, text: 'Floor', amount: -10 },
        { id: 4, text: 'Floor', amount: 150 }
    ]
};

// Create context
export const GlobalContext = createContext(initialState);

// provider compoment

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    // delet action reducer
    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }

    // delet action reducer
    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        });
    }

    return (
        <GlobalContext.Provider value={ {
            transactions: state.transactions,
            deleteTransaction,
            addTransaction
            }}>
            {children}
        </GlobalContext.Provider>
    );
};