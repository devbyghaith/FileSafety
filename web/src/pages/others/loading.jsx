import StyledComponents from 'styled-components'
import React from 'react'
import { PulseLoader } from 'react-spinners';

const LoadingPage = StyledComponents.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    background-color: var(--colors-backgrounds-main);
    height: 100%;
    width: 100%;
    left: 0%;
    top: 0%;
`;

export default function Loading() {
    return (
        <LoadingPage>
            <PulseLoader color={"var(--colors-main)"} margin={"0.35rem"} size={"1.25rem"} />
        </LoadingPage>
    )
}
