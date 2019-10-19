import React from 'react'
import { connect } from 'react-redux';

import MonkeyIcon from '../../meta/components/monkey-icon'

import * as actions from '../../store/actions';

type InputType = {
    clearUser: Function;
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

function Login({ clearUser }: InputType): any {
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

                    <li>
                        <span onClick={() => removeCookies(clearUser)}>Log Out</span>
                    </li>

                    <li>
                        <span onClick={() => console.log("view decks")}>View Decks</span>
                    </li>
                    <li>
                        <span onClick={() => console.log("dashboar")}>
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
        </header>
    )
}

const mapDispatchToProps = (dispatch: any, getState: any) => ({
    clearUser: () => dispatch(actions.clearUserData())
})

export default connect(
    null,
    mapDispatchToProps
)(Login);
