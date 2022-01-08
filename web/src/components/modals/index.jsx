import StyledComponents from "styled-components";
import { motion } from "framer-motion";

export const Modal = StyledComponents(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: ${(props) => props.align ? "center" : "none"};
    color: var(--colors-texts-main);
    background-color: var(--colors-backgrounds-dark);
    border-radius: 0.25rem;
    min-width: 340px;
    padding: 0.5rem;
    z-index: 1000;
`;

export const Text = StyledComponents.div`
    letter-spacing: 0.55px;
    margin: 0.5rem;
`;

export const Input = StyledComponents.input`
    transition: all 0.3s ease-in-out 0s, visibility 0s linear 0s, z-index 0s linear 0.3s;
    background-color: var(--colors-backgrounds-muted);
    border: 1px solid var(--colors-backgrounds-muted);
    color: var(--colors-texts-main);
    border-radius: 0.25rem;
    padding: 0.5rem;
    margin: 0.5rem;

    &:not(:placeholder-shown) {
        border: 1px solid var(--colors-main);
    }

    &:focus {
        outline: none;
    }
`;

export const Menu = StyledComponents.select`
    color: var(--colors-texts-main);
    background-color: var(--colors-backgrounds-muted);
    border-radius: 0.25rem;
    padding: 0.5rem;
    margin: 0.5rem;
    outline: none;
    border: none;
`;

export const MenuItem = StyledComponents.option`

`;

export const Button = StyledComponents.button`
    transition: all 0.3s ease-in-out 0s, visibility 0s linear 0s, z-index 0s linear 0.3s;
    background-color: ${(props) => props.buttonType ? `var(--colors-others-${props.buttonType})` : "var(--colors-main)"};
    border: 1px solid ${(props) => props.buttonType ? `var(--colors-others-${props.buttonType})` : "var(--colors-main)"};
    color: var(--colors-texts-main);
    border-radius: 0.25rem;
    cursor: pointer;
    padding: 0.5rem;
    margin: 0.5rem;

    &:disabled {
        cursor: not-allowed;
        background-color: var(--colors-backgrounds-muted);
        border: 1px solid var(--colors-backgrounds-muted);
    }
`;