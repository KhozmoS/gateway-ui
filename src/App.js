import './App.css';
import 'antd/dist/antd.css';
import GatewaysLayout from "./layouts/GatewaysLayout";
import DevicesLayout from "./layouts/DevicesLayout";
import PageNotFound from "./layouts/PageNotFound";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/gateway/:serialNumber/devices">
            <DevicesLayout />
          </Route>
          <Route exact path="/gateway">
            <GatewaysLayout />
          </Route>
          <Route exact path="/">
            <Redirect to="/gateway" />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
