import React, {FC, useState} from "react";
import {createUser, loginData, loginFormType, loginUser} from "../api/userApi";
import LoginForm from "./LoginForm";
import CreatePreferencesView from "./CreatePreferencesView";
import CreateUserView from "./CreateUserView";

const LoginScreen: FC<{ setAuth: (data: loginData) => void }> = ({setAuth}) => {

    const [loggingIn, setLoggingIn] = useState<boolean>(true)

    return (
        <div className=" container mt-5  text-center form-signin login-form">
            {loggingIn &&
            <div>
                <LoginForm setAuth={setAuth}/>
                <button type="button" onClick={() => setLoggingIn(false)} className="btn mt-2 btn-link">create account
                </button>

            </div>

            }
            {!loggingIn &&
            <div>
                <CreateUserView loggingIn={(isLogginIn => setLoggingIn(isLogginIn))}/>
                <button type="button" onClick={() => setLoggingIn(true)} className="btn mt-2 btn-link">login</button>
            </div>
            }


            {/*<p className="mt-5 mb-3 text-muted">create account</p>*/}
        </div>
    );
};

export default LoginScreen;
