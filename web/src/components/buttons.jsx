import StyledComponents from "styled-components";

export const MainButton = StyledComponents.button`
    color: var(--colors-texts-main);
    background-color: var(--colors-main);
    border-radius: 0.25rem;
    margin-left: 0.5rem;
    padding: 0.25rem;
    cursor: pointer;
    border: none;
`;

export const DangerButton = StyledComponents.button`
    color: var(--colors-texts-main);
    background-color: var(--colors-others-danger);
    border-radius: 0.25rem;
    margin-left: 0.5rem;
    padding: 0.25rem;
    cursor: pointer;
    border: none;
`;

export const AlertButton = StyledComponents.button`
    color: var(--colors-texts-main);
    background-color: var(--colors-others-warning);
    border-radius: 0.25rem;
    margin-left: 0.5rem;
    padding: 0.25rem;
    cursor: pointer;
    border: none;
`;

export const SuccessButton = StyledComponents.button`
    color: var(--colors-texts-main);
    background-color: var(--colors-others-success);
    border-radius: 0.25rem;
    margin-left: 0.5rem;
    padding: 0.25rem;
    cursor: pointer;
    border: none;
`;