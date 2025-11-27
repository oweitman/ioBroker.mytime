// TimeseriesContext.js
import { createContext, useContext } from 'react';

export const TimeseriesContext = createContext(null);
export const TimeseriesDispatchContext = createContext(null);

export function timeserieTemplate(timeseries) {
    return {
        id:
            timeseries.reduce((a, b) => ({ id: Math.max(a.id, b.id) }), {
                id: Number.MIN_VALUE,
            }).id + 1,
        tsname: '',
        tsduration: '1',
        rules: [],
    };
}

export function ruleTemplate(rules) {
    return {
        id:
            rules.reduce((a, b) => ({ id: Math.max(a.id, b.id) }), {
                id: Number.MIN_VALUE,
            }).id + 1,
        name: '',
        interval: 1,
        count: 10,
        freq: 3,
    };
}

export function dateTemplate(rules) {
    return {
        id:
            rules.reduce((a, b) => ({ id: Math.max(a.id, b.id) }), {
                id: Number.MIN_VALUE,
            }).id + 1,
        name: '',
        dates: [],
    };
}

export function useTimeseries() {
    return useContext(TimeseriesContext);
}

export function useTimeseriesDispatch() {
    return useContext(TimeseriesDispatchContext);
}
