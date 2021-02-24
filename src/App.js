import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  ToDo  from "./components/ToDo/ToDo";
import {BrowserRouter as Router, Switch,Route, Redirect} from "react-router-dom";
import About from "./components/pages/About/About";
import NotFound from "./components/pages/NotFound/NotFound";
import Contact from "./components/pages/Contact/Contact";
import NavMenu from "./components/NavMenu/NavMenu";
import SingleTask from "./components/pages/SingleTask/SingleTask";
import { connect } from "react-redux";
import Spinner from "./components/Spinner/Spinner";


function App(props) {
  return (
    <div >
        <Router>
            <NavMenu />
            <Switch>
                <Route exact path="/">
                    <ToDo />
                </Route>
                <Route exact path="/home">
                    <ToDo />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/contact">
                    <Contact />
                </Route>
                <Route exact path="/not-found">
                    <NotFound />
                </Route>
                <Route exact path = "/task/:taskId" component = { SingleTask } />
                <Redirect to="/not-found"/>

            </Switch>

        </Router>
        {props.loading && <Spinner/>}
    </div>
  );
}
const mapStateToProps = (state)=>{
    return {
        loading:state.loading,
    }
}

export default connect(mapStateToProps, null)(App);
