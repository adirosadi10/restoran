import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Back from "./pages/back/Back";
import Front from "./pages/front/Front";
import Login from "./pages/login/Login";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Front} exact />
          <Route path="/home" component={Front} />
          <Route path="/admin" component={Back}  />
          <Route path="/login" component={Login}  />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
