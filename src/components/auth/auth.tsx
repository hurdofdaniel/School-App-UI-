import React from 'react';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';

function fetchTokens(codeResponse: CodeResponse) {
    return fetch('/api/auth/credential/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: codeResponse.code
        })
    })
        .then(response => response.json())
        .then(json => {
            return json;
        });
}

function Auth(props: any) {
    const handleLogin = async (codeResponse: CodeResponse) => {
        let loginData = await fetchTokens(codeResponse);

        props.setTokens(loginData.tokens);
        props.setData(loginData.data);
        props.setSheetId(loginData.fileId);
        props.setLoggedIn(true);
    }

    const login = useGoogleLogin({
        onSuccess: codeResponse => handleLogin(codeResponse),
        flow: 'auth-code',
        redirect_uri: 'postmessage',
        scope: 'email profile https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/documents'
    });

    return (
        <div>
            <h1>Auth</h1>
            <button onClick={() => login()}>Sign in with Google</button>
        </div>
    );
}

export default Auth;