import StyledComponents from "styled-components";

export const Dashboard = StyledComponents.div`
    display: flex;
    flex-direction: column;
    width: calc(100vw - 240px);
    max-height: 100vh;
    overflow: auto;
    padding: 1rem;
`;

export const StatisticsSection = StyledComponents.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

export const Statistics = StyledComponents.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--colors-backgrounds-dark);
    border-radius: 0.5rem;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    width: 100%;

    &:first-child {
        margin-left: 0rem;
    }
`;

export const ChartsStatistics = StyledComponents.div`
    background-color: var(--colors-backgrounds-dark);
    border-radius: 0.5rem;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    width: 100%;

    &:first-child {
        margin-left: 0rem;
    }
`;

export const StatisticsTitle = StyledComponents.h3`
    color: var(--colors-main);
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bold;
`;

export const StatisticsText = StyledComponents.div`
    color: var(--colors-texts-muted);
`;

export const StatisticsValue = StyledComponents.h1`
    color: var(--colors-main);
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2rem;
`;

export const Sections = StyledComponents.div`
    display: grid;
    grid-template-columns: auto;
    gap: 1rem;
`;

export const Section = StyledComponents.div`
    display: flex;
    flex-direction: column;
    background-color: var(--colors-backgrounds-dark);
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 100%;
`;

export const SectionSpliter = StyledComponents.hr`
    width: 100%;
`;

export const SectionTitle = StyledComponents.h2`
    text-transform: uppercase;
    font-weight: bold;
`;

export const SectionHeaderSection = StyledComponents.div`
    display: flex;
    align-items: center;
`;

export const SectionHeader = StyledComponents.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Table = StyledComponents.table`
    width: 100%;
`;

export const TableRow = StyledComponents.tr`
    background-color: var(--colors-backgrounds-muted);
    text-align: center;
`;

export const TableHeaderRow = StyledComponents.th`
    color: var(--colors-main);
    text-transform: uppercase;
    font-weight: bold;
`;

export const TableDataRow = StyledComponents.td`
    color: ${(props) => props.isNull ? "var(--colors-texts-muted)" : "var(--colors-texts-main)"};
`;

export const Footer = StyledComponents.div`
    display: flex;
    background-color: var(--colors-backgrounds-dark);
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-top: 1rem;
`;

export const FooterNavigation = StyledComponents.a`
    color: var(--colors-main);
    text-transform: uppercase;
    letter-spacing: 0.55px;
    text-decoration: none;
    margin: 0px 0.5rem;

    &:first-child {
        margin-left: 0rem;
    }
`;