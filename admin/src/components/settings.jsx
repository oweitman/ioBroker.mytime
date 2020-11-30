import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';


import I18n from "@iobroker/adapter-react/i18n";
import CountdownSettings from "./countdownsettings";


/**
 * @type {() => Record<string, import("@material-ui/core/styles/withStyles").CreateCSSProperties>}
 */
 
const styles = () => ({
	root: {
		color: "black",
	},
    input: {
        marginTop: 0,
        minWidth: 400,
    },
    button: {
        marginRight: 20,
    },
    card: {
        maxWidth: 345,
        textAlign: "center",
    },
    media: {
        height: 180,
    },
    column: {
        display: "inline-block",
        verticalAlign: "top",
        marginRight: 20,
    },
    columnLogo: {
        width: 350,
        marginRight: 0,
    },
    columnSettings: {
        width: "calc(100% - 370px)",
    },
    controlElement: {
        //background: "#d2d2d2",
        marginBottom: 5,
    },
});

/**
 * @typedef {object} SettingsProps
 * @property {Record<string, string>} classes
 * @property {Record<string, any>} native
 * @property {(attr: string, value: any) => void} onChange
 */

/**
 * @typedef {object} SettingsState
 * @property {undefined} [dummy] Delete this and add your own state properties here
 */

/**
 * @extends {React.Component<SettingsProps, SettingsState>}
 */

	function TabPanel(props) {
	  const { children, value, index, ...other } = props;
	const divStyle = {
	  overflowY: 'scroll',
	  height: 'calc( 100% - 150px )',
	};
	  return (
		<div
		  role="tabpanel"
		  hidden={value !== index}
		  id={`simple-tabpanel-${index}`}
		  aria-labelledby={`simple-tab-${index}`}
		  style={divStyle}
		  {...other}
		>
		  {value === index && (
			<Box p={3}>
			  {children}
			</Box>
		  )}
		</div>
	  );
	}

	TabPanel.propTypes = {
	  children: PropTypes.node,
	  index: PropTypes.any.isRequired,
	  value: PropTypes.any.isRequired,
	};
	
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			counter:props.counter
		};
		this.state.tab = 0;
    }




	
	a11yProps(index) {
	  return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	  };
	}	
	
	
	
	render(props) {
		const { classes } = this.props;
		const value = this.state.tab;
		
    	const handleChange = (event, newValue) => {
			this.setState(state => ({
			  tab: newValue
			}));
	    };
		
		const StyledTabs = withStyles({
			scroller: {
				"background-color": '#2196f3',
			},
		})(Tabs);
		const StyledTab = withStyles({
			root: {
//				"background-color": '#64b5f6',
			},
			selected: {
				color: "black",
				"background-color": 'white',
			},
		})(Tab);

		return (
			<div>
			  <AppBar position="static">
				<StyledTabs value={value} onChange={handleChange.bind(this)} aria-label="simple tabs example">
				  <StyledTab label={I18n.t("tabcountdown")} {...this.a11yProps(0)} />
				  { /*<StyledTab label={I18n.t("tabtimeseries")} {...this.a11yProps(1)} /> */}
				</StyledTabs>
			  </AppBar>
			  <TabPanel value={value} index={0}>
				<CountdownSettings 
					counter={this.props.native["counter"]||{}}
					onChange={(value) => this.props.onChange("counter", value)}
					context={this.props.context}
					changed={this.props.changed}
				/>
			  </TabPanel>
			  <TabPanel value={value} index={1}>
				mytime timeseries settings
			  </TabPanel>
			</div>
		);
	}	
}

export default withStyles(styles)(Settings);
