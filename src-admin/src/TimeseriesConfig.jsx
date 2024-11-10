import React from "react";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ThemeProvider } from "@mui/material/styles";

import {
    fr as frLocale,
    ru as ruLocale,
    enUS as enLocale,
    es as esLocale,
    pl as plLocale,
    pt as ptLocale,
    it as itLocale,
    zhCN as cnLocale,
    ptBR as brLocale,
    de as deLocale,
    uk as ukLocale,
    nl as nlLocale,
} from "date-fns/locale";

import { Theme } from "@iobroker/adapter-react-v5";
import { ConfigGeneric } from "@iobroker/json-config";

import "./index.css";
import TimeseriesList from "./TimeseriesList";
import { TimeseriesProvider } from "./TimeseriesContext";
import { NavStateProvider } from "./TimeseriesNavContext";

export const localeMap = {
    en: enLocale,
    fr: frLocale,
    ru: ruLocale,
    de: deLocale,
    es: esLocale,
    br: brLocale,
    nl: nlLocale,
    it: itLocale,
    pt: ptLocale,
    pl: plLocale,
    uk: ukLocale,
    "zh-cn": cnLocale,
};

class TimeseriesConfig extends ConfigGeneric {
    constructor(props) {
        super(props);
        this.state.theme = Theme(props.themeName);
    }

    async componentDidMount() {
        super.componentDidMount();
        /*         const newState = {
            ...this.props.data,
            edit: false,
        }; */

        // this.setState(newState);
    }

    // eslint-disable-next-line class-methods-use-this
    onChange() {}

    renderItem() {
        return (
            <ThemeProvider theme={this.state.theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeseriesProvider initialTimeseries={this.props.data} onChange={this.props.onChange}>
                        <NavStateProvider
                            initialNavState={{
                                isTimeserieSelected: null,
                                isRuleEditing: null,
                                isDateEditing: null,
                                isTimeserieNew: null,
                                isRuleNew: null,
                                selectedTimeseriesID: null,
                                selectedRuleID: null,
                                origTimeserie: null,
                                origRule: null,
                                errors: null,
                                isBack: null,
                            }}
                        >
                            <div style={{ margin: "10px 10px", width: "100%" }}>
                                <TimeseriesList />
                            </div>
                        </NavStateProvider>
                    </TimeseriesProvider>
                </LocalizationProvider>
            </ThemeProvider>
        );
    }
}

TimeseriesConfig.propTypes = {
    socket: PropTypes.object.isRequired,
    themeType: PropTypes.string,
    themeName: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    data: PropTypes.object.isRequired,
    attr: PropTypes.string,
    schema: PropTypes.object,
    onError: PropTypes.func,
    onChange: PropTypes.func,
};

export default TimeseriesConfig;
