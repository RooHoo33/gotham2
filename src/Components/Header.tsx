import React, {FC} from "react"
import {loginData} from "../api/userApi";

export const Header:FC<{setAuth: (authInfo: loginData) => void}> = ({setAuth}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Theta Xi</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Chores <span className="sr-only">(current)</span></a>
                    </li>
                </ul>
                <button className="btn btn-secondary my-2 my-sm-0" onClick={(event =>setAuth({jwt: "", success:false} ))}>Log out</button>

            </div>
        </nav>
    )
}
