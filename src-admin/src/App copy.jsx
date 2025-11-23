// this file used only for simulation and not used in end build
import React from 'react';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { useTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

// Rest of your code...s
import { GenericApp, I18n, Loader } from '@iobroker/adapter-react-v5';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import TimeseriesConfig from './TimeseriesConfig';
import Placeholder from './Components/Placeholder';

import enLocal from './i18n/en.json';
import deLocal from './i18n/de.json';
import ruLocal from './i18n/ru.json';
import ptLocal from './i18n/pt.json';
import nlLocal from './i18n/nl.json';
import frLocal from './i18n/fr.json';
import itLocal from './i18n/it.json';
import esLocal from './i18n/es.json';
import plLocal from './i18n/pl.json';
import ukLocal from './i18n/uk.json';
import zhCNLocal from './i18n/zh-cn.json';

const styles = {
    app: theme => ({
        //backgroundColor: theme.palette.background.default,
        //color: theme.palette.text.primary,
        height: '100%',
    }),
    item: {
        padding: 50,
        width: 400,
    },
};
//-----------------------------
const drawerWidth = 150;

function Main({ open, children }) {
    return (
        <Box
            component="main"
            sx={theme => {
                const easing = open ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp;
                const duration = open
                    ? theme.transitions.duration.enteringScreen
                    : theme.transitions.duration.leavingScreen;
                return {
                    '--drawer-w': `${drawerWidth}px`,
                    flexGrow: 1,
                    p: 3,
                    ml: `calc(-1 * var(--drawer-w))`,
                    transition: theme.transitions.create('margin-left', { easing, duration }),
                    ...(open && { ml: 0 }),
                    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                };
            }}
        >
            {children}
        </Box>
    );
}

function AppBar({ open, children, inProps }) {
    return (
        <MuiAppBar
        /*             position="fixed"
            sx={theme => {
                const easing = open ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp;
                const duration = open
                    ? theme.transitions.duration.enteringScreen
                    : theme.transitions.duration.leavingScreen;

                return {
                    zIndex: theme.zIndex.drawer + 1,
                    transition: theme.transitions.create(['margin-left', 'width'], { easing, duration }),
                    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
                    ml: open ? `${drawerWidth}px` : 0,
                    '@media (prefers-reduced-motion: reduce)': {
                        transition: 'none',
                    },
                };
            }} */
        >
            {children}
        </MuiAppBar>
    );
}

const DrawerHeader = ({ children }) => {
    return (
        <Box
            sx={theme => ({
                display: 'flex',
                alignItems: 'center',
                padding: theme.spacing(0, 1),
                justifyContent: 'flex-end',
                ...theme.mixins.toolbar, // sorgt für korrekte Höhe unterhalb der AppBar
            })}
        >
            {children}
        </Box>
    );
};
function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const state = {
        data: {
            countdowns: [
                {
                    name: 'aaa',
                    days: '1',
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    behavior: 'timer',
                },
            ],
            timeseries: [
                {
                    id: 1,
                    tsname: 'timeseries1',
                    tsduration: '1',
                    rules: [
                        {
                            id: 1,
                            name: 'ts1,rule1',
                            mode: 'rule-add',
                            freq: 3,
                            interval: 1,
                            count: 10,
                        },
                        {
                            id: 2,
                            name: 'ts1,rule2',
                            mode: 'rule-del',
                        },
                        {
                            id: 3,
                            name: 'ts1,rule3',
                            mode: 'rule-add',
                            freq: 4,
                            interval: 1,
                            count: 10,
                        },
                        {
                            id: 4,
                            name: 'ts1,rule4',
                            mode: 'date-add',
                            dates: [
                                '2024-11-02T14:03:37.542Z',
                                '2024-11-03T14:03:37.542Z',
                                '2024-11-04T14:03:37.542Z',
                                '2024-11-05T14:03:37.542Z',
                                '2024-11-06T14:03:37.542Z',
                                '2024-11-07T14:03:37.542Z',
                                '2024-11-08T14:03:37.542Z',
                                '2024-11-09T14:03:37.542Z',
                                '2024-11-10T14:03:37.542Z',
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    tsname: 'timeseries2',
                    tsduration: '2',
                    rules: [
                        {
                            id: 2,
                            name: 'ts2,rule1',
                            mode: 'rule-add',
                            dtstart: '2024-01-01T00:00:00.000Z',
                            until: '2025-01-02T00:00:00.000Z',
                            freq: 4,
                            count: 10,
                            interval: 1,
                        },
                    ],
                },
                {
                    id: 3,
                    tsname: 'timeseries3',
                    tsduration: '3',
                    rules: [],
                },
            ],
        },
        /*                  theme: this.createTheme("dark"),  */
        theme,
        themeName: 'dark',
        themeType: 'dark',
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem
                            key={text}
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem
                            key={text}
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader>{null}</DrawerHeader>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={state.theme}>
                        <div
                            style={{
                                width: '100%',
                                // backgroundColor: state.themeType ? '#000' : '#FFF',
                                // color: state.themeType ? '#FFF' : '#000',
                            }}
                        >
                            <Placeholder text="header1" />
                            <div style={{ width: '100%' }}>
                                <TimeseriesConfig
                                    alive
                                    socket={{}}
                                    theme={state.theme}
                                    themeType={state.themeType || 'light'}
                                    themeName={state.themeName || state.themeType || 'light'}
                                    attr="myCustomAttribute"
                                    data={state.data}
                                    onError={() => {}}
                                    instance={0}
                                    schema={{
                                        url: '',
                                        i18n: true,
                                        name: 'ConfigCustomMytimeSet/Components/TimeseriesConfig',
                                        type: 'custom',
                                    }}
                                    onChange={data => {
                                        console.log({ data });
                                    }}
                                    adapterName="mytime"
                                    /* common={this.common} */
                                    oContext={{
                                        adapterName: 'mytime',
                                        socket: this.socket,
                                        instance: 0,
                                        themeType: this.state.theme.palette.mode,
                                        isFloatComma: true,
                                        dateFormat: '',
                                        forceUpdate: () => {},
                                        systemConfig: {},
                                        theme: this.state.theme,
                                        _themeName: this.state.themeName,
                                        onCommandRunning: _commandRunning => {},
                                    }}
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </StyledEngineProvider>
            </Main>
        </Box>
    );
}

class App extends GenericApp {
    constructor(props) {
        const extendedProps = { ...props };
        super(props, extendedProps);

        this.state = {
            ...this.state,
            data: { myCustomAttribute: 'red' },
            originalData: { myCustomAttribute: 'red' },
            // theme: this.createTheme(),
        };
        const translations = {
            en: enLocal,
            de: deLocal,
            ru: ruLocal,
            pt: ptLocal,
            nl: nlLocal,
            fr: frLocal,
            it: itLocal,
            es: esLocal,
            pl: plLocal,
            uk: ukLocal,
            'zh-cn': zhCNLocal,
        };

        I18n.setTranslations(translations);
        // @ts-expect-error userLanguage could exist
        I18n.setLanguage((navigator.language || navigator.userLanguage || 'en').substring(0, 2).toLowerCase());
    }

    render() {
        if (!this.state.loaded) {
            return (
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={this.state.theme}>
                        <Loader themeType={this.state.themeType} />
                    </ThemeProvider>
                </StyledEngineProvider>
            );
        }

        return (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={this.state.theme}>
                    <Box sx={styles.app}>
                        <div style={styles.item}>
                            <PersistentDrawerLeft
                                {...this.props}
                                oContext={{
                                    adapterName: 'mytime',
                                    socket: this.socket,
                                    instance: 0,
                                    themeType: this.state.theme.palette.mode,
                                    isFloatComma: true,
                                    dateFormat: '',
                                    forceUpdate: () => {},
                                    systemConfig: {},
                                    theme: this.state.theme,
                                    _themeName: this.state.themeName,
                                    onCommandRunning: _commandRunning => {},
                                }}
                                alive
                                changed={JSON.stringify(this.state.originalData) !== JSON.stringify(this.state.data)}
                                themeName={this.state.theme.palette.mode}
                                common={{}}
                                attr="myCustomAttribute"
                                data={this.state.data}
                                originalData={this.state.originalData}
                                onError={() => {}}
                                schema={{
                                    url: '',
                                    i18n: true,
                                    name: 'ConfigCustomMytimeSet/Components/TimeseriesConfig',
                                    type: 'custom',
                                }}
                                onChange={data => this.setState({ data: data })}
                            />
                        </div>
                    </Box>
                </ThemeProvider>
            </StyledEngineProvider>
        );

        return <PersistentDrawerLeft> </PersistentDrawerLeft>;
    }
}

export default App;
