import React, {FC} from "react"
import {loginData} from "../api/userApi";

export const Header:FC<{setAuth: (authInfo: loginData) => void}> = ({setAuth}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Theta Xi</a>
                <button className="btn btn-secondary my-2 my-sm-0" onClick={(event =>setAuth({jwt: "", success:false} ))}>Log out</button>
        </nav>
    )
}
