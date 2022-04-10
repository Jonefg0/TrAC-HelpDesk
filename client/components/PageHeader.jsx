import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Link } from "react-router-dom";
import { baseConfig } from "./baseConfig";
import SupportIcon from "@material-ui/icons/ContactSupport"

const useStyles = makeStyles((theme) => ({
  appBarStyle:{
    background: theme.palette.primary.main
  },
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(),
  },
  addButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2)
  },
  ticketButton: {
    backgroundColor: theme.palette.secondary.main,
    color:"white"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PageHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBarStyle}>
        <Toolbar>
        <SupportIcon/>
          <Typography variant="h6" className={classes.title}>
            {baseConfig.PAGE_HEADER}
          </Typography>
          <Link to="/InputForm">
            <Button color="secondary" variant="contained" startIcon={<AddCircleIcon />} className={classes.ticketButton} autoFocus>
              {baseConfig.CREATE_TICKET_LABEL}
            </Button>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={baseConfig.SEARCH_PLACEHOLDER}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => props.setSearchText(e.target.value)}
            />
          </div>
          <AccountCircle color="inherit" />
        </Toolbar>
      </AppBar>
    </div>
  );
}
