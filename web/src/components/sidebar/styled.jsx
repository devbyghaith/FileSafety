import StyledComponents from "styled-components";

export const Sidebar = StyledComponents.div`
    display: flex;
    flex-direction: column;
    background-color: var(--colors-backgrounds-dark);
    padding: 0.5rem;
    width: 240px;
    height: 100%;
`;

export const Sections = StyledComponents.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Section = StyledComponents.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${(props) => props.isLast ? "0px" : "1rem"};;
    margin-top: ${(props) => props.isLast ? "auto" : "0px"};
`;

export const SectionTitle = StyledComponents.h3`
    color: var(--colors-main);
    text-transform: uppercase;
    font-weight: bold;
`;

export const SectionChoices = StyledComponents.div`
    display: grid;
    grid-template-columns: auto;
    gap: 0.5rem;
`;

export const SectionChoice = StyledComponents.div`
    display: flex;
    transition: all 0.3s ease-in-out 0s, visibility 0s linear 0s, z-index 0s linear 0.3s;
    background-color: var(--colors-backgrounds-muted);
    border-radius: 0.25rem;
    padding: 0.25rem;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 0px 1.5rem 0px var(--colors-backgrounds-dark);
        background-color: var(--colors-main);
        transform: scale(1.05);
    }
`;