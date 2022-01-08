import React from 'react'

import AuthenticationLogin from '../../utils/authentication/login';

import AuthenticationForm, { AuthenticationButton, AuthenticationFormHeader, AuthenticationFormHeaderIcon, AuthenticationInput, AuthenticationNavigation, AuthenticationResponse } from '../../components/authentication';

import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [status, setStatus] = React.useState('');

    const navigator = useNavigate();

    function submitLogin() {
        AuthenticationLogin(username, password).then((user) => {
            if (user.Id) {
                setStatus("success");
                setMessage(`Welcome back Mr. ${user.Username}`);

                setTimeout(() => {
                    navigator("/authentication/verify");
                }, (3 * 1000));
            } else {
                setStatus("warning");
                setMessage("Unable to authenticate at this moment");
            };
        }).catch((error) => {
            if (error?.message?.length) {
                setStatus("danger");
                setMessage(error.message);
            } else {
                setStatus("warning");
                setMessage("Unable to authenticate at this moment");
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
                <AuthenticationInput type="text" placeholder='Username'  onKeyUp={(event) => setUsername(event.target.value)} />
                <AuthenticationInput type="password" placeholder='Password'  onKeyUp={(event) => setPassword(event.target.value)} />
                <AuthenticationButton disabled={!username?.length || !password.length} onClick={submitLogin}>Login</AuthenticationButton>
                <AuthenticationNavigation onClick={() => navigator("/authentication/register")}>No account? Register now!</AuthenticationNavigation>
            </AuthenticationForm>
        </>
    )
};