import React from 'react'

import { useNavigate } from "react-router-dom";

import AuthenticationRegister from '../../utils/authentication/register';

import AuthenticationForm, { AuthenticationButton, AuthenticationFormHeader, AuthenticationFormHeaderIcon, AuthenticationInput, AuthenticationNavigation, AuthenticationResponse } from '../../components/authentication';

export default function Register() {
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [status, setStatus] = React.useState('');

    const navigator = useNavigate();
    
    function submitRegister() {
        AuthenticationRegister(email, username, password).then((user) => {
            setStatus("success");
            setMessage(`Congratulations, your account has been successfully created. Please Check your email for further instructions.`);

            setTimeout(() => {
                navigator("/authentication/login")
            }, (5 * 1000));
        }).catch((error) => {
            if (error?.message?.length) {
                setStatus("danger");
                setMessage(error.message);
            } else {
                setStatus("warning");
                setMessage("Unable to register at this moment");
            };
        });
    };
    
    return (
        <>
            <AuthenticationForm>
                <AuthenticationFormHeader>
                    <AuthenticationFormHeaderIcon icon={"/favicon.ico"} />
                </AuthenticationFormHeader>
                {message?.length ? <AuthenticationResponse status={status}>{message}</AuthenticationResponse> : <></>}
                <AuthenticationInput type="email" placeholder='Email' onKeyUp={(event) => setEmail(event.target.value)} />
                <AuthenticationInput type="text" placeholder='Username' onKeyUp={(event) => setUsername(event.target.value)} />
                <AuthenticationInput type="password" placeholder='Password' onKeyUp={(event) => setPassword(event.target.value)} />
                <AuthenticationButton disabled={!username?.length || !password.length || !email.length} onClick={submitRegister}>Register</AuthenticationButton>
                <AuthenticationNavigation onClick={() => navigator("/authentication/login")}>Already have a account? Login now!</AuthenticationNavigation>
            </AuthenticationForm>
        </>
    )
}
