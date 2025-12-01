import { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';

// import { RRule } from "rrule";
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// import WebWorker from "./WebWorker";
// import webworkerrrule from "./worker.js";
// import { I18n } from "@iobroker/adapter-react-v5";
import { RRule } from 'rrule';
import { default as SunCalc } from 'suncalc3';
import { I18n } from '@iobroker/adapter-react-v5';
import { TimeseriesContext } from './TimeseriesContext';
import { NavStateContext } from './TimeseriesNavContext';
import MyHeader from './Components/Header';

function caldDates(timeserie) {
    let datelistadd = [];
    let datelistdel = [];
    if (timeserie.rules.length === 0) return [];
    for (let i = 0; i < timeserie.rules.length; i++) {
        const r = timeserie.rules[i] || {};
        if (Object.keys(r).length === 0) continue;
        const [type, mode] = r.mode.split('-');
        if (type === 'date') {
            const dates = r.dates.map(el => ({ rule: r.name, date: el }));
            if (mode === 'add') {
                datelistadd = datelistadd.concat(dates);
            }
            if (mode === 'del') {
                datelistdel = datelistdel.concat(dates);
            }
        }
        if (type === 'rule') {
            let options = {};
            function convertByValues(value) {
                if (value === undefined || value === null) {
                    return undefined;
                }

                const str = String(value).trim();
                if (str === '') return undefined;

                // Wenn Kommasepariert → Liste verarbeiten
                if (str.includes(',')) {
                    const nums = str
                        .split(',')
                        .map(el => el.trim())
                        .filter(n => n !== '' || n !== '0')
                        // Nur gültige Integer erlauben
                        .map(el => Number(el))
                        .filter(n => Number.isInteger(n));

                    return nums;
                }

                // Einzelner Wert
                const n = Number(str);
                if (n === 0) return undefined;
                if (Number.isInteger(n)) return n;

                return undefined;
            }
            options = {
                ...options,
                ...(r.dtstart !== undefined && { dtstart: new Date(r.dtstart) }),
                ...(r.until !== undefined && { until: new Date(r.until) }),
                ...(r.count !== undefined && { count: r.count }),
                ...(r.interval !== undefined && { interval: parseInt(r.interval) }),
                ...(r.freq !== undefined && { freq: r.freq }),
                ...(r.weekstart !== undefined && { wkst: r.weekstart }),
                ...(r.byweekday !== undefined && { byweekday: convertByValues(r.byweekday) }),
                ...(r.bymonth !== undefined && { bymonth: convertByValues(r.bymonth) }),
                ...(r.bysetpos !== undefined && { bysetpos: convertByValues(r.bysetpos) }),
                ...(r.bymonthday !== undefined && { bymonthday: convertByValues(r.bymonthday) }),
                ...(r.byyearday !== undefined && { byyearday: convertByValues(r.byyearday) }),
                ...(r.byweekno !== undefined && { byweekno: convertByValues(r.byweekno) }),
                ...(r.byhour !== undefined && { byhour: convertByValues(r.byhour) }),
                ...(r.byminute !== undefined && { byminute: convertByValues(r.byminute) }),
            };
            const max = 100;
            let dates = new RRule(options)
                .all((date, c) => c < max)
                .map(el => ({ rule: r.name, date: el.toISOString() }));
            if (
                // check if suntimes is defined and has entries and if longitude and latitude has valid values and in range

                r.freq <= RRule.DAILY &&
                r.latitude !== undefined &&
                r.longitude !== undefined &&
                r.latitude !== '' &&
                r.longitude !== '' &&
                !isNaN(r.latitude) &&
                !isNaN(r.longitude) &&
                r.latitude >= -90 &&
                r.latitude <= 90 &&
                r.longitude >= -180 &&
                r.longitude <= 180 &&
                ((r.suntimes && r.suntimes.length > 0) || (r.moontimes && r.moontimes.length > 0))
            ) {
                const suntimes = [];
                const moontimes = [];
                if (r.suntimes && r.suntimes.length > 0) {
                    // calculate astro dates for each entry in the generated dates
                    dates.forEach(dateEntry => {
                        const times = SunCalc.getSunTimes(new Date(dateEntry.date), r.latitude, r.longitude);
                        r.suntimes.forEach(suntime => {
                            if (times[suntime] === undefined) return;
                            const astrodate = times[suntime];
                            suntimes.push({ rule: r.name, date: astrodate.value.toISOString(), type: 'sun' });
                        });
                    });
                }
                if (r.moontimes && r.moontimes.length > 0) {
                    // calculate astro dates for each entry in the generated dates
                    dates.forEach(dateEntry => {
                        const times = SunCalc.getMoonTimes(new Date(dateEntry.date), r.latitude, r.longitude);
                        r.moontimes.forEach(moontime => {
                            let key;
                            switch (moontime) {
                                case 'moonrise':
                                    key = 'rise';
                                    break;
                                case 'moonset':
                                    key = 'set';
                                    break;
                                case 'moonhigh':
                                    key = 'highest';
                                    break;
                                default:
                                    return '';
                            }
                            if (times[key] === undefined) return;
                            const astrodate = times[key];
                            moontimes.push({ rule: r.name, date: astrodate.toISOString(), type: 'moon' });
                        });
                    });
                }

                dates = suntimes.concat(moontimes);
                dates = dates.sort(compareDates);
            }
            // limit dates array to the number of r.count if defined
            if (r.count !== undefined && r.count > 0) {
                dates = dates.slice(0, r.count);
            }
            if (mode === 'add') {
                datelistadd = datelistadd.concat(dates);
            }
            if (mode === 'del') {
                datelistdel = datelistdel.concat(dates);
            }
        }
    }
    function compareDates(a, b) {
        return dayjs(a.date).valueOf() - dayjs(b.date).valueOf();
    }
    datelistadd = [...new Set(datelistadd)];
    datelistdel = [...new Set(datelistdel)]; // remove duplicates
    let datelist = datelistadd.filter(el => !datelistdel.includes(el));
    datelist = datelist.sort(compareDates);
    return datelist;
}

export default function TimeseriesCalcedDateList() {
    const [datelist, setDatelist] = useState([]);
    const timeseries = useContext(TimeseriesContext);
    const navState = useContext(NavStateContext);
    const timeserie = navState.selectedTimeseriesID
        ? timeseries.find(item => item.id === navState.selectedTimeseriesID)
        : null;
    useEffect(() => {
        setDatelist(caldDates(timeserie));
    }, [timeserie.rules]);
    const style = {
        table: {
            width: 'inherit',
        },
        tableContainer: {
            maxHeight: 430,
            width: 'inherit',
        },
        padding: {
            padding: '0px 10px',
        },
    };
    const dateoptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    return (
        <>
            <MyHeader
                size={3}
                text="tsDatelist"
            />
            <Box sx={{ ...style.padding }}>
                {I18n.t('tsActualDates')}:
                <TableContainer sx={{ ...style.tableContainer }}>
                    <Table
                        sx={{ ...style.table }}
                        size="small"
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>{I18n.t('tsDate')}</TableCell>
                                <TableCell>{I18n.t('tsRule')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datelist.length > 0 &&
                                datelist.map((item, key) => (
                                    <TableRow key={key}>
                                        <TableCell>{`000${key + 1}`.slice(-3)}</TableCell>
                                        <TableCell>
                                            {new Date(item.date).toLocaleString(undefined, dateoptions)}
                                        </TableCell>
                                        <TableCell>{item.rule}</TableCell>
                                    </TableRow>
                                ))}
                            {datelist.length === 0 && (
                                <TableRow>
                                    <TableCell>{I18n.t('tsTableListEmpty')}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
