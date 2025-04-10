import React, { useState, useEffect } from "react";
import getState from "./flux.js";
export const Context = React.createContext(null);
const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState(prevState => ({
                        store: { ...prevState.store, ...updatedStore },
                        actions: { ...prevState.actions }
                    }))
            })
        );
        useEffect(() => {
            state.actions.getProfile();
        }, []);
        return (
            <Context.Provider value={{ store: state.store, actions: state.actions }}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};
export default injectContext;