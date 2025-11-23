import { useContext } from 'react';
import * as validatejs from 'validate.js';

import { TimeseriesContext } from './TimeseriesContext';
import { NavStateContext, useNavStateDispatch } from './TimeseriesNavContext';

export default function TimeseriesValidator() {
    const timeseries = useContext(TimeseriesContext);
    const navState = useContext(NavStateContext);
    const navStateDispatch = useNavStateDispatch();
    const timeserie = navState.selectedTimeseriesID
        ? timeseries.find(item => item.id === navState.selectedTimeseriesID)
        : null;
    const rule =
        navState.selectedRuleID && timeserie ? timeserie.rules.find(item => item.id === navState.selectedRuleID) : null;
    function validateTimeseriesNeu(ts) {
        const constraints = {
            tsname: {
                presence: true,
                uniqueRulename: true,
                length: { minimum: 1, tooShort: '^tsValidLength' },
            },
            tsduration: {
                presence: true,
                numericality: {
                    strict: false,
                    onlyInteger: true,
                    greaterThan: 0,
                    lessThan: 1000,
                    notValid: '^tsValidNotValid',
                    notInteger: '^tsValidNotInteger',
                    notGreaterThan: '^tsValidNotGreaterThan0',
                    notLessThan: '^tsValidNotLessThan1000',
                },
            },
        };
        validatejs.validators.uniqueRulename = (value, options, key, attributes) =>
            timeseries.reduce((acc, cur) => (cur.tsname === value && cur.id !== attributes.id ? acc + 1 : acc), 0) > 0
                ? '^tsValidUniqueTimeseriesName'
                : null;

        return validatejs.validate(ts, constraints);
    }
    function isPresent(value) {
        return value !== null && value !== undefined;
    }
    function isNumber(value) {
        return typeof value === 'number';
    }
    function sanitizeRule(field, value) {
        value = value || '';
        switch (field) {
            case 'bysetpos':
            case 'bymonthday':
            case 'byyearday':
            case 'byweekno': {
                if (!Array.isArray(value)) {
                    value = value.split(/[,\s]+/);
                }
                value = value.filter(v => v);
                value = value.map(n => parseInt(n, 10));
                break;
            }
            default: {
                break;
            }
        }
        return value;
    }
    function validateRuleNeu(r) {
        const constraints = {
            name: {
                presence: true,
                uniqueRulename: true,
                length: { minimum: 1, tooShort: '^tsValidLength' },
            },
            bysetpos: {
                rangeRuleNot0: {
                    range: [
                        [-366, -1],
                        [1, 366],
                    ],
                    /*                     msg: "- must be between -366 and -1 or between 1 and 366",  */
                    msg: '^tsValidRange366',
                },
            },
            bymonthday: {
                rangeRuleNot0: {
                    range: [
                        [-31, -1],
                        [1, 31],
                    ],
                    // msg: "- must be between -31 and -1 or between 1 and 31",
                    msg: '^tsValidRange31',
                },
            },
            byyearday: {
                rangeRuleNot0: {
                    range: [
                        [-366, -1],
                        [1, 366],
                    ],
                    // msg: "- must be between -366 and -1 or between 1 and 366",
                    msg: '^tsValidRange366',
                },
            },
            byweekno: {
                rangeRuleNot0: {
                    range: [
                        [-53, -1],
                        [1, 53],
                    ],
                    // msg: "- must be between -53 and -1 or between 1 and 53",
                    msg: '^tsValidRange53',
                },
            },
            byhour: {
                numericality: {
                    strict: true,
                    onlyInteger: true,
                    lessThan: 1000000,
                    greaterThan: -1000000,
                    notValid: '^tsValidNotValid',
                    notInteger: '^tsValidNotInteger',
                    notGreaterThan: '^tsValidNotGreaterThan1000000',
                    notLessThan: '^tsValidNotLessThan',
                },
            },
            byminute: {
                numericality: {
                    strict: true,
                    onlyInteger: true,
                    greaterThan: -1000000,
                    lessThan: 1000000,
                    notValid: '^tsValidNotValid',
                    notInteger: '^tsValidNotInteger',
                    notGreaterThan: '^tsValidNotGreaterThan1000000',
                    notLessThan: '^tsValidNotLessThan',
                },
            },
            bysecond: {
                numericality: {
                    strict: true,
                    onlyInteger: true,
                    greaterThan: -1000000,
                    lessThan: 1000000,
                    notValid: '^tsValidNotValid',
                    notInteger: '^tsValidNotInteger',
                    notGreaterThan: '^tsValidNotGreaterThan1000000',
                    notLessThan: '^tsValidNotLessThan',
                },
            },
            interval: {
                numericality: {
                    strict: false,
                    onlyInteger: true,
                    greaterThan: 0,
                    lessThan: 1000,
                    notValid: '^tsValidNotValid',
                    notInteger: '^tsValidNotInteger',
                    notGreaterThan: '^tsValidNotGreaterThan0',
                    notLessThan: '^tsValidNotLessThan',
                },
            },
            count: {
                numericality: {
                    strict: true,
                    onlyInteger: true,
                    greaterThan: 0,
                    lessThan: 1000,
                    notValid: '^tsValidNotValid',
                    notInteger: '^tsValidNotInteger',
                    notGreaterThan: '^tsValidNotGreaterThan0',
                    notLessThan: '^tsValidNotLessThan',
                },
            },
        };
        validatejs.validators.uniqueRulename = (value, options, key, attributes) =>
            timeserie.rules.reduce((acc, cur) => (cur.name === value && cur.id !== attributes.id ? acc + 1 : acc), 0) >
            0
                ? '^tsValidUniqueRulename'
                : null;

        validatejs.validators.rangeRuleNot0 = (value, options, key) => {
            value = sanitizeRule(key, value);
            if (isPresent(value)) {
                if (isNumber(value)) {
                    value = [value];
                }
                for (let i = 0; i < value.length; i++) {
                    const v = parseInt(value[i]) || 0;
                    if (v === 0 || !options.range.some(([low, high]) => v >= low && v <= high)) return options.msg;
                }
            } else {
                return null;
            }
            return null;
        };
        return validatejs.validate(r, constraints);
    }
    function validateDatesNeu(r) {
        const constraints = {
            name: {
                presence: true,
                uniqueRulename: true,
                length: { minimum: 1, tooShort: '^tsValidLength' },
            },
            dates: {
                presence: true,
                length: { minimum: 1, tooShort: '^tsValidArrayLength' },
            },
        };
        validatejs.validators.uniqueRulename = (value, options, key, attributes) =>
            timeserie.rules.reduce((acc, cur) => (cur.name === value && cur.id !== attributes.id ? acc + 1 : acc), 0) >
            0
                ? '^tsValidUniqueRulename'
                : null;

        return validatejs.validate(r, constraints);
    }
    function validate() {
        let ruleErrors = null;
        let timeseriesErrors = null;
        let datesErrors = null;
        timeseriesErrors = validateTimeseriesNeu(timeserie);
        if (navState.isRuleEditing) ruleErrors = validateRuleNeu(rule);
        if (navState.isDateEditing) datesErrors = validateDatesNeu(rule);
        navStateDispatch({
            type: 'errors',
            value: {
                ...{
                    timeseries: timeseriesErrors,
                    rule: ruleErrors,
                    date: datesErrors,
                },
            },
        });
    }
    return validate;
}
