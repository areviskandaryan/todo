import React, {useEffect} from "react";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import ToDo from "./components/pages/ToDo/ToDo";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import About from "./components/pages/About/About";
import NotFound from "./components/pages/NotFound/NotFound";
import Contact from "./components/pages/Contact/Contact";
import NavMenu from "./components/NavMenu/NavMenu";
import SingleTask from "./components/pages/SingleTask/SingleTask";
import Spinner from "./components/Spinner/Spinner";
import {history} from "./helpers/history";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import Footer from "./components/Footer/Footer";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./App.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const toastProps = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
};


function App(props) {
    useEffect(() => {
        if (props.successMessage) {
            toast.success(props.successMessage, toastProps);
        }
        if (props.errorMessage) {
            toast.error(props.errorMessage, toastProps);
        }
    }, [props.successMessage, props.errorMessage]);

    return (
        <div className={styles.container}>
            <Router history={history}>
                <NavMenu/>
                <Switch>
                    <AuthRoute exact path="/register" component={Register} type="public"/>
                    <AuthRoute exact path="/login" component={Login} type="public"/>
                    <AuthRoute exact path="/" component={ToDo} type="private"/>
                    <AuthRoute exact path="/home" component={ToDo} type="private"/>
                    <Route exact path="/about">
                        <About/>
                    </Route>
                    <Route exact path="/contact">
                        <Contact/>
                    </Route>
                    <Route exact path="/not-found">
                        <NotFound/>
                    </Route>
                    <AuthRoute exact path="/task/:taskId" component={SingleTask} type="private"/>
                    <Redirect to="/not-found"/>
                </Switch>
            </Router>
            {props.loading && <Spinner/>}
            <ToastContainer/>
            <Footer/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        successMessage: state.successMessage,
        errorMessage: state.errorMessage
    }
}

export default connect(mapStateToProps, null)(App);
