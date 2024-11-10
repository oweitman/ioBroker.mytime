// this file used only for simulation and not used in end build

import React from "react";
/* import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles"; */

import withStyles from "@mui/styles/withStyles";

import GenericApp from "@iobroker/adapter-react-v5/GenericApp";
import { I18n, Loader } from "@iobroker/adapter-react-v5";

import { styled, useTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import TimeseriesConfig from "./TimeseriesConfig";
import Placeholder from "./Components/Placeholder";

const drawerWidth = 150;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

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
                    name: "aaa",
                    days: "1",
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    behavior: "timer",
                },
            ],
            timeseries: [
                {
                    id: 1,
                    tsname: "timeseries1",
                    tsduration: "1",
                    rules: [
                        {
                            id: 1,
                            name: "ts1,rule1",
                            mode: "rule-add",
                            freq: 3,
                            interval: 1,
                            count: 10,
                        },
                        {
                            id: 2,
                            name: "ts1,rule2",
                            mode: "rule-del",
                        },
                        {
                            id: 3,
                            name: "ts1,rule3",
                            mode: "rule-add",
                            freq: 4,
                            interval: 1,
                            count: 10,
                        },
                        {
                            id: 4,
                            name: "ts1,rule4",
                            mode: "date-add",
                            dates: [
                                "2024-11-02T14:03:37.542Z",
                                "2024-11-03T14:03:37.542Z",
                                "2024-11-04T14:03:37.542Z",
                                "2024-11-05T14:03:37.542Z",
                                "2024-11-06T14:03:37.542Z",
                                "2024-11-07T14:03:37.542Z",
                                "2024-11-08T14:03:37.542Z",
                                "2024-11-09T14:03:37.542Z",
                                "2024-11-10T14:03:37.542Z",
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    tsname: "timeseries2",
                    tsduration: "2",
                    rules: [
                        {
                            id: 2,
                            name: "ts2,rule1",
                            mode: "rule-add",
                            dtstart: "2024-01-01T00:00:00.000Z",
                            until: "2025-01-02T00:00:00.000Z",
                            freq: 4,
                            count: 10,
                            interval: 1,
                        },
                    ],
                },
                {
                    id: 3,
                    tsname: "timeseries3",
                    tsduration: "3",
                    rules: [],
                },
            ],
        },
        /*                  theme: this.createTheme("dark"),  */
        theme,
        themeName: "dark",
        themeType: "dark",
    };
    const translations = {
        en: require("./i18n/en"),
        de: require("./i18n/de"),
        ru: require("./i18n/ru"),
        pt: require("./i18n/pt"),
        nl: require("./i18n/nl"),
        fr: require("./i18n/fr"),
        it: require("./i18n/it"),
        es: require("./i18n/es"),
        pl: require("./i18n/pl"),
        uk: require("./i18n/uk"),
        "zh-cn": require("./i18n/zh-cn"),
    };

    I18n.setTranslations(translations);
    I18n.setLanguage("de");
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={state.theme}>
                        <div
                            style={{
                                width: "100%",
                                backgroundColor: state.themeType ? "#000" : "#FFF",
                                color: state.themeType ? "#FFF" : "#000",
                            }}
                        >
                            <Placeholder text="header1" />
                            <div style={{ width: "100%" }}>
                                <TimeseriesConfig
                                    alive
                                    socket={{} /* socket */}
                                    theme={state.theme}
                                    themeType={state.themeType || "light"}
                                    themeName={state.themeName || state.themeType || "light"}
                                    attr="myCustomAttribute"
                                    data={state.data}
                                    onError={() => {}}
                                    instance={0}
                                    schema={{
                                        name: "ConfigCustomJavascriptSet/Components/TimeseriesConfig",
                                        type: "custom",
                                    }}
                                    onChange={(data) => {
                                        console.log({ data });
                                    }}
                                    adapterName="mytime"
                                    /*                                     common={this.common} */
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </StyledEngineProvider>
            </Main>
        </Box>
    );
}

const styles = (theme) => ({
    app: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        xheight: "100%",
    },
    item: {
        padding: 50,
        width: 400,
    },
});

class App extends GenericApp {
    constructor(props) {
        const extendedProps = { ...props };
        super(props, extendedProps);
    }

    render() {
        if (!this.state.loaded) {
            return (
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={this.state.theme}>
                        <Loader theme={this.state.themeType} />
                    </ThemeProvider>
                </StyledEngineProvider>
            );
        }

        return <PersistentDrawerLeft> </PersistentDrawerLeft>;
    }
}

export default withStyles(styles)(App);
