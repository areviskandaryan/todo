import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import styles from "./NavMenu.module.css";
import {logout} from "../../helpers/Auth/logout";
import {getUserInfo} from "../../store/actions";

function NavMenu({isAuthenticated, user, getUserInfo}) {

    useEffect(() => {
        if (isAuthenticated) {
            getUserInfo();

        }
    }, [isAuthenticated, getUserInfo])


    return (
        <nav>
            <ul className={styles.container}>
                {isAuthenticated &&
                <li className={styles.containerItem}>
                    <NavLink
                        exact
                        to="/home"
                        activeClassName={styles.active}
                        className={styles.link}
                    >
                        Home
                    </NavLink>
                </li>
                }
                <li className={styles.containerItem}>
                    <NavLink
                        exact
                        to="/about"
                        activeClassName={styles.active}
                        className={styles.link}
                    >
                        About us
                    </NavLink>
                </li>
                <li className={styles.containerItem}>
                    <NavLink
                        exact
                        to="contact"
                        activeClassName={styles.active}
                        className={styles.link}
                    >
                        Contact
                    </NavLink>
                </li>
                {user &&
                <li className={`${styles.containerItem} ${styles.userInfo}`}>
                    {`${user.name} ${user.surname}`}
                </li>
                }
                {isAuthenticated ?
                    <Button variant="light"
                            className={styles.button}
                            onClick={() => logout()}
                    >
                        Log out
                    </Button>
                    :
                    <>
                        <li className={styles.containerItem}>
                            <NavLink
                                exact
                                to="/register"
                                activeClassName={styles.active}
                                className={styles.link}
                            >
                                Register
                            </NavLink>
                        </li>
                        <li className={styles.containerItem}>
                            <NavLink
                                exact
                                to="/login"
                                activeClassName={styles.active}
                                className={styles.link}
                            >
                                Login
                            </NavLink>
                        </li>
                    </>
                }
            </ul>
        </nav>

    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
    }
}
const mapDispatchToProps = {
    getUserInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);

