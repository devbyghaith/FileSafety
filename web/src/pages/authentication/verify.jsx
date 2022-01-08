import React from 'react'

import AuthenticationLogout from '../../utils/authentication/logout';
import AuthenticationVerify from '../../utils/authentication/verify';

import AuthenticationForm, { AuthenticationButton, AuthenticationFormHeader, AuthenticationFormHeaderIcon, AuthenticationInput, AuthenticationNavigation, AuthenticationResponse, AuthenticationText } from '../../components/authentication';
import { useUser } from '../../providers/userProvider';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const user = useUser();

    const [code, setCode] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [status, setStatus] = React.useState('');
    
    const navigator = useNavigate();

    function submitVerification() {
        AuthenticationVerify(code).then(() => {
            setStatus("success");
            setMessage("Verification Completed. Redirecting...");
            
            setTimeout(() => {
                navigator("/");
            }, (3 * 1000));
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
                <AuthenticationText>Welcome Mr. {user?.Username}. You need to verify your account in order to access your dashboard</AuthenticationText>
                <AuthenticationInput type="text" placeholder='Verification Code' onKeyUp={(event) => setCode(event.target.value)} />
                <AuthenticationButton disabled={!code?.length} onClick={submitVerification}>Verify</AuthenticationButton>
                <AuthenticationButton onClick={(event) => AuthenticationLogout().then(() => window.location.reload()).catch(() => {})}>Logout</AuthenticationButton>
            </AuthenticationForm>
        </>
    )
}
