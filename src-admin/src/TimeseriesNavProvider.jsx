import { useReducer } from 'react';
import { NavStateContext, NavStateDispatchContext } from './TimeseriesNavContext';

function navStateReducer(navState, action) {
    switch (action.type) {
        case 'isTimeserieNew':
        case 'isTimeserieEditing':
        case 'isRuleEditing':
        case 'isDateEditing':
        case 'isRuleNew':
        case 'selectedTimeseriesID':
        case 'selectedRuleID':
        case 'origTimeserie':
        case 'origRule':
        case 'errors':
        case 'isBack':
            return { ...navState, [action.type]: action.value };
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
}

export function NavStateProvider({ initialNavState, children }) {
    const [navState, navStateDispatch] = useReducer(navStateReducer, initialNavState);

    return (
        <NavStateContext.Provider value={navState}>
            <NavStateDispatchContext.Provider value={navStateDispatch}>{children}</NavStateDispatchContext.Provider>
        </NavStateContext.Provider>
    );
}
