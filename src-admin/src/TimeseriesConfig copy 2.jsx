// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Theme } from '@iobroker/gui-components';
import { ConfigGeneric } from '@iobroker/json-config';

// import TimeseriesList from './TimeseriesList';
// import { TimeseriesProvider } from './TimeseriesProvider';
// import { NavStateProvider } from './TimeseriesNavProvider';

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
        return <span>test</span>;
    }
}

export default TimeseriesConfig;
