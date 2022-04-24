import React from 'react'

import * as StyledAuthentication from "./styled";

export default function AuthenticationForm({ children, ...props }) {
    return (
        <>
            <StyledAuthentication.Form {...props}>
                {children}
            </StyledAuthentication.Form>
        </>
    )
};

export function AuthenticationFormHeader({ children, ...props }) {
    return (
        <>
            <StyledAuthentication.FormHeader {...props}>
                {children}
            </StyledAuthentication.FormHeader>
        </>
    )
}

export function AuthenticationFormHeaderIcon({ children, ...props }) {
    return (
        <>
            <StyledAuthentication.FormHeaderIcon {...props}>
                {children}
            </StyledAuthentication.FormHeaderIcon>
        </>
    )
};

export function AuthenticationResponse({ children, ...props }) {
    return (
        <>
            <StyledAuthentication.Response {...props}>
                {children}
            </StyledAuthentication.Response>
        </>
    )
}

export function AuthenticationInput({ children, ...props }) {
    return (
        <>
            <StyledAuthentication.Input {...props}>
                {children}
            </StyledAuthentication.Input>
        </>
    )
};

export function AuthenticationText({ children, ...props }) {
    return (
        <>
            <StyledAuthentication.Text {...props}>
                {children}
            </StyledAuthentication.Text>
        </>
    )
};

export function AuthenticationButton({ children, ...props }) {
    return (
        <>
            <StyledAuthentication.Button {...props}>
                {children}
            </StyledAuthentication.Button>
        </>
    )
}

export function AuthenticationNavigation({ children, ...props }) {
    return (
        <>
            <StyledAuthentication.Navigation {...props}>
                {children}
            </StyledAuthentication.Navigation>
        </>
    )
};