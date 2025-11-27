import { createContext, useContext } from 'react';

export const NavStateContext = createContext(null);
export const NavStateDispatchContext = createContext(null);

export function useNavState() {
    return useContext(NavStateContext);
}

export function useNavStateDispatch() {
    return useContext(NavStateDispatchContext);
}
