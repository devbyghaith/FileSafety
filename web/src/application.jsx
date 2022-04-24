import React from 'react';

import { UserProvider } from './providers/userProvider';

import FILESAFETY from './filesafety';

export default function Application() {
    return (
        <>
            <UserProvider>
                <FILESAFETY />
            </UserProvider>
        </>
    )
};