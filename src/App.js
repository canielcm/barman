import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/index";
import NotFound from "./pages/NotFound";
import Addnew from "./pages/addnew";
import RegisterPage from "./pages/RegisterPage";
import DrinkInfo from "./pages/DrinkInfo";
import Menu from "./pages/menu";
import Cart from "./pages/Cart";
import { AuthProvider } from "./context/AuthContext";
import { DrinkMethodsProvider } from "./context/DrinkMethodsContext";
function App() {
  return (
    <AuthProvider>
      <DrinkMethodsProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={Addnew} />
            <Route exact path="/register" component={RegisterPage}></Route>
            <Route exact path="/drink/:id" component={DrinkInfo}></Route>
            <Route exact path="/menu" component={Menu}></Route>
            <Route exact path="/menu/:id" component={Menu}></Route>
            <Route exact path="/cart" component={Cart}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </BrowserRouter>
      </DrinkMethodsProvider>
    </AuthProvider>
  );
}
export default App;
