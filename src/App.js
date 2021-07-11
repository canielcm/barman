import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/index";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
