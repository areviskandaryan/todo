import React, {useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  ToDo  from "./components/ToDo/ToDo";
import { Router, Switch,Route, Redirect} from "react-router-dom";
import About from "./components/pages/About/About";
import NotFound from "./components/pages/NotFound/NotFound";
import Contact from "./components/pages/Contact/Contact";
import NavMenu from "./components/NavMenu/NavMenu";
import SingleTask from "./components/pages/SingleTask/SingleTask";
import { connect } from "react-redux";
import Spinner from "./components/Spinner/Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {history} from "./helpers/history"

const toastProps = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
};

function App(props) {
    useEffect(()=>{
        if (props.successMessage){
            toast.success(props.successMessage,toastProps)
        }
        if (props.errorMessage){
            toast.error(props.errorMessage,toastProps)
        }



    },[props.successMessage,props.errorMessage])

  return (
    <div >
        <Router history = {history}>
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
        <ToastContainer/>
    </div>
  );
}
const mapStateToProps = (state)=>{
    return {
        loading:state.loading,
        successMessage: state.successMessage,
        errorMessage:state.errorMessage,
    }
}

export default connect(mapStateToProps, null)(App);
