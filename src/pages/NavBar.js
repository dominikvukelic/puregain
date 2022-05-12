import React from 'react';
import './NavBar.css';
import MainMenu from './MainMenu';

export default function NavBar() {
    return (
        <div>
            console.log(logo);
            <div className="navbar">
                <div>
                    <a class="navbar-logo" href="/">
                        <img src="./images/logo.jpg" alt="app logo" className="img-fluid" />
                    </a>
                </div>
                <a className="app-name" href="/">
                    PureGain
                </a>
                <div className="float-right">
                    <MainMenu />
                </div>
            </div>
        </div>
    );
}
