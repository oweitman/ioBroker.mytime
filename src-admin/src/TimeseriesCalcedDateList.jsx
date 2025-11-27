import { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';

// import { RRule } from "rrule";
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// import WebWorker from "./WebWorker";
// import webworkerrrule from "./worker.js";
// import { I18n } from "@iobroker/adapter-react-v5";
import { RRule } from 'rrule';
import { I18n } from '@iobroker/adapter-react-v5';
import { TimeseriesContext } from './TimeseriesContext';
import { NavStateContext } from './TimeseriesNavContext';
import MyHeader from './Components/Header';

function compareDates(a, b) {
    return dayjs(a.date).valueOf() - dayjs(b.date).valueOf();
}

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
            options = {
                ...options,
                ...(r.dtstart !== undefined && { dtstart: new Date(r.dtstart) }),
                ...(r.until !== undefined && { until: new Date(r.until) }),
                ...(r.count !== undefined && { count: r.count }),
                ...(r.interval !== undefined && { interval: parseInt(r.interval) }),
                ...(r.freq !== undefined && { freq: r.freq }),
                ...(r.weekstart !== undefined && { wkst: r.weekstart }),
                ...(r.byweekday !== undefined && { byweekday: r.byweekday }),
                ...(r.byweekday !== undefined && { bymonth: r.bymonth }),
                ...(r.bysetpos !== undefined && { bysetpos: r.bysetpos }),
                ...(r.bymonthday !== undefined && { bymonthday: r.bymonthday }),
                ...(r.byyearday !== undefined && { byyearday: r.byyearday }),
                ...(r.byweekno !== undefined && { byweekno: r.byweekno }),
                ...(r.byhour !== undefined && { byhour: r.byhour }),
                ...(r.byminute !== undefined && { byminute: r.byminute }),
            };
            const max = 100;
            const dates = new RRule(options)
                .all((date, c) => c < max)
                .map(el => ({ rule: r.name, date: el.toISOString() }));
            if (mode === 'add') {
                datelistadd = datelistadd.concat(dates);
            }
            if (mode === 'del') {
                datelistdel = datelistdel.concat(dates);
            }
        }
    }
    console.log('owtest: redner calced dates render');

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
                text={I18n.t('tsDatelist')}
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
