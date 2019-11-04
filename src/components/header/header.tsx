import React, { MouseEvent } from 'react'
import { connect } from 'react-redux';
import MonkeyIcon from '../../meta/components/monkey-icon'

import * as actions from '../../store/actions';

type InputPropsType = {
    clearUser: Function;
    clearDeck: (event: MouseEvent) => { type: "CLEAR" };
    signed_in: boolean;
}

function getCookies() {
    console.log('cookies ', document.cookie);
}

function removeCookies(clearUser: Function): void {
    document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    clearUser();
}

function Login(props: InputPropsType): any {
    console.log("props from header", props);
    if (props.signed_in) {
        return (
            <header>
                <section>
                    <h1>Card Monkey </h1>
                    <MonkeyIcon width="15%" />
                </section>

                <h2>Flash Card App</h2>
                <nav>
                    <ul>
                        <li>
                            <span onClick={() => removeCookies(props.clearUser)}>Log Out</span>
                        </li>
                        <li>
                            <span onClick={props.clearDeck}>
                                Dashboard
                            </span>
                        </li>
                        <li id="search">
                            <form>
                                <label htmlFor="search-box">Search: </label>
                                <input id="search-box/" />
                            </form>
                        </li>
                    </ul>
                </nav>
                {/* <button onClick={() => getCookies()}>log cookies</button> */}
            </header >
        )
    }
    else {
        return (
            <header>
                <section>
                    <h1>Card Monkey </h1>
                    <MonkeyIcon width="15%" />
                </section>

                <h2>Flash Card App</h2>
                <nav>
                    <ul>
                        <li>
                            <a href="/.netlify/functions/auth">Sign In</a>
                        </li>
                        <li id="search">
                            <form>
                                <label htmlFor="search-box">Search: </label>
                                <input id="search-box/" />
                            </form>
                        </li>
                    </ul>
                </nav>
                {/* <button onClick={() => getCookies()}>log cookies</button> */}
            </header>
        )
    }
}

const mapDispatchToProps = (dispatch: any, getState: any) => ({
    clearUser: () => dispatch(actions.clearUserData()),
    clearDeck: (e: any) => dispatch(actions.clearDeck(e)),
})

export default connect(
    null,
    mapDispatchToProps
)(Login);
