import StyledComponents from "styled-components";

export const Form = StyledComponents.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    background-color: var(--colors-backgrounds-dark);
    box-shadow: 0px 0px 0px 1.5rem 0px var(--colors-backgrounds-dark);
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
    padding: 0.5rem;
    padding-top: 7rem;
    width: 340px;
    left: 50%;
    top: 50%;
`;

export const FormHeader = StyledComponents.div`
    display: flex;
    position: absolute;
    border-radius: 0.5rem;
    background-color: var(--colors-main);
    transform: translate(-0.25rem, -6.75rem);
    width: calc(340px - 0.5rem);
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

export const FormHeaderIcon = StyledComponents.div`
    display: flex;
    position: absolute;
    background-size: cover;
    background-color: var(--colors-backgrounds-main);
    background-image: url(${(props) => props.icon ? props.icon : "/favicon.ico"});
    box-shadow: 0px 0px 0px 0.25rem var(--colors-backgrounds-dark);
    transform: translate(0, 1.5rem);
    border-radius: 50%;
    padding: 2.5rem;
`;

export const Response = StyledComponents.div`
    display: flex;
    background-color: var(--colors-others-${(props) => props.status || "warning"});
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0.5rem;
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

export const Button = StyledComponents.button`
    transition: all 0.3s ease-in-out 0s, visibility 0s linear 0s, z-index 0s linear 0.3s;
    background-color: var(--colors-main);
    border: 1px solid var(--colors-main);
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

export const Navigation = StyledComponents.a`
    color: var(--colors-texts-main);
    letter-spacing: 0.55px;
    text-decoration: none;
    width: fit-content;
    margin: 0.5rem;
`;