import { createContext, useContext, useReducer /* , useEffect */ } from "react";

export const NavStateContext = createContext(null);
export const NavStateDispatchContext = createContext(null);

function navStateReducer(navState, action) {
    switch (action.type) {
        case "isTimeserieNew": {
            navState[action.type] = action.value;
            return { ...navState };
        }
        case "isTimeserieEditing": {
            navState[action.type] = action.value;
            return { ...navState };
        }
        case "isRuleEditing": {
            navState[action.type] = action.value;
            return { ...navState };
        }
        case "isDateEditing": {
            navState[action.type] = action.value;
            return { ...navState };
        }
        case "isRuleNew": {
            navState[action.type] = action.value;
            return { ...navState };
        }
        case "selectedTimeseriesID": {
            navState[action.type] = action.value;
            return { ...navState };
        }
        case "selectedRuleID": {
            navState[action.type] = action.value;
            return { ...navState };
        }
        case "origTimeserie": {
            navState[action.type] = action.value;
            return { ...navState };
        }
        case "origRule": {
            navState[action.type] = action.value;
            return { ...navState };
        }
        case "errors": {
            navState[action.type] = action.value;
            return { ...navState };
        }
        case "isBack": {
            navState[action.type] = action.value;
            return { ...navState };
        }
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
}

export function NavStateProvider({ initialNavState, /* onChange,  */ children }) {
    const [navState, navStatedispatch] = useReducer(navStateReducer, initialNavState);
    /*     useEffect(() => {
        onChange({ navState });
    }, [navState]); */
    return (
        <NavStateContext.Provider value={navState}>
            <NavStateDispatchContext.Provider value={navStatedispatch}>{children}</NavStateDispatchContext.Provider>
        </NavStateContext.Provider>
    );
}
export function useNavState() {
    return useContext(NavStateContext);
}
export function useNavStateDispatch() {
    return useContext(NavStateDispatchContext);
}
