import React, { useEffect, useState, useContext } from "react";
import PageHeader from "./PageHeader";
import NavBar from "./navBar";
import { useHistory } from "react-router-dom";
import TicketsList from "./TicketsList";
import { AuthContext } from "./contexts/Auth";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "grid",
    placeItems: "center",
  },
}));

function Dashboard() {
  window.addEventListener('message', function(event){
    console.log("data dashboard:",event.data)
  },false)
  const classes = useStyles();
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  const [login, setLogin] = useState();
  const [error, setError] = useState(false);

  const signInHandler = (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        history.push({
          pathname: `/`,
        });
      })
      .catch((err) => setError(true));
  };

  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <div className={classes.div}>
        <NavBar />
      </div>
      <PageHeader searchText={searchText} setSearchText={setSearchText} />
      <TicketsList searchText={searchText} />
    </div>
  );
}

export default Dashboard;
