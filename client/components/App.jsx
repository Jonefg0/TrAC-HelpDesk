import InputForm from "./InputForm.jsx";
import { Container } from "@material-ui/core";
import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { AuthContext } from "./contexts/Auth";
import "../style.scss";

function App() {
  window.addEventListener('message', function(event){
    console.log("data :",event.data)
  },false)
  const [user, setUser] = useState(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div>
      <Router>
        <AuthContext.Provider value={providerUser}>
          <Switch>
            <Route component={Dashboard} exact path="/" />
            <Route component={InputForm} exact path="/inputform" />
          </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
