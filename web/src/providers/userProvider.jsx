import React, { createContext, useContext, useEffect, useState } from 'react';

import Pages from '../pages';

const UserContext = createContext();
const UserUpdateContext = createContext();

export function useUser() {
    return useContext(UserContext);
};

export function useUserUpdate() {
    return useContext(UserUpdateContext);
};

export function UserProvider({ children, ...props }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("https://api.filesafety.co/authentication/@me", {
            method: "GET",
            credentials: "include",
        }).then((response) => response.json()).then((response) => {
            setLoading(false);
            if (response.error) return;
            else setUser(response.data);
        }).catch((error) => {});
    }, []);

    function updateUser() {
        fetch("https://api.filesafety.co/authentication/@me", {
            method: "GET",
            credentials: "include",
        }).then((response) => response.json()).then((response) => {
            if (response.error) return;
            else setUser(response.data);
        }).catch((error) => {});
    };

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={updateUser}>
                <>
                    {loading ? <Pages.Others.Loading /> : children}
                </>
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
};