import React from 'react';
import PropTypes from 'prop-types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Theme } from '@iobroker/adapter-react-v5';
import { ConfigGeneric } from '@iobroker/json-config';

//import './index.css';
import TimeseriesList from './TimeseriesList';
import { TimeseriesProvider } from './TimeseriesProvider';
import { NavStateProvider } from './TimeseriesNavProvider';

class TimeseriesConfig extends ConfigGeneric {
    constructor(props) {
        super(props);
        this.state.theme = Theme(props.themeName);
    }

    async componentDidMount() {
        super.componentDidMount();
    }

    // eslint-disable-next-line class-methods-use-this
    onChange() {}

    renderItem() {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimeseriesProvider
                    initialTimeseries={this.props.data}
                    onChange={this.props.onChange}
                >
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
                        <div style={{ margin: '10px 10px', width: '100%' }}>
                            <TimeseriesList />
                        </div>
                    </NavStateProvider>
                </TimeseriesProvider>
            </LocalizationProvider>
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
