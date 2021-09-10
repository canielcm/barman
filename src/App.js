import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/index";
import NotFound from "./pages/NotFound";
import Addnew from "./pages/addnew";
import RegisterPage from "./pages/RegisterPage";
import DrinkInfo from "./pages/DrinkInfo";
import Menu from "./pages/menu";
import Cart from "./pages/Cart";
import User from "./pages/User";
import AdminApi from "./pages/AdminApi";
import { AuthProvider } from "./context/AuthContext";
import { DrinkMethodsProvider } from "./context/DrinkMethodsContext";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DrinkMethodsProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={Addnew} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/drink/:id" component={DrinkInfo} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/menu/:id" component={Menu} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/user" component={User} />
            <Route exact path="/admin_api" component={AdminApi} />
            <Route component={NotFound}></Route>
          </Switch>
        </DrinkMethodsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
