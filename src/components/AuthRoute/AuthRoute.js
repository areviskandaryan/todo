import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";


function AuthRoute({path, type,isAuthenticated, component: Component}) {

    return (
        <Route
            exact
            path={path}
            render={(props) => {
                if (type === "private" && !isAuthenticated) {
                    return <Redirect to="/login"/>
                }
                if (type === "public" && isAuthenticated) {
                    return <Redirect to="/"/>
                }
                return <Component {...props}/>
            }
            }
        />
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,
    }
}
export default connect(mapStateToProps)(AuthRoute);