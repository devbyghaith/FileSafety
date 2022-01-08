import React from 'react'

import * as StyledDashboard from "./styled";

export default function Dashboard({ children, ...props }) {
    return (
        <>
            <StyledDashboard.Dashboard {...props}>
                {children}
            </StyledDashboard.Dashboard>
        </>
    )
};

export function DashboardStatisticsSection({ children, ...props }) {
    return (
        <>
            <StyledDashboard.StatisticsSection {...props}>
                {children}
            </StyledDashboard.StatisticsSection>
        </>
    )
};

export function DashboardStatistics({ children, ...props }) {
    return (
        <>
            <StyledDashboard.Statistics {...props}>
                {children}
            </StyledDashboard.Statistics>
        </>
    )
};

export function DashboardChartsStatistics({ children, ...props }) {
    return (
        <>
            <StyledDashboard.ChartsStatistics {...props}>
                {children}
            </StyledDashboard.ChartsStatistics>
        </>
    )
};

export function DashboardStatisticsTitle({ children, ...props }) {
    return (
        <>
            <StyledDashboard.StatisticsTitle {...props}>
                {children}
            </StyledDashboard.StatisticsTitle>
        </>
    )
};

export function DashboardStatisticsText({ children, ...props }) {
    return (
        <>
            <StyledDashboard.StatisticsText {...props}>
                {children}
            </StyledDashboard.StatisticsText>
        </>
    )
};

export function DashboardStatisticsValue({ children, ...props }) { 
    return (
        <>
            <StyledDashboard.StatisticsValue {...props}>
                {children}
            </StyledDashboard.StatisticsValue>
        </>
    )
};

export function DashboardSections({ children, ...props }) {
    return (
        <>
            <StyledDashboard.Sections {...props}>
                {children}
            </StyledDashboard.Sections>
        </>
    )
};

export function DashboardSection({ children, ...props }) {
    return (
        <>
            <StyledDashboard.Section {...props}>
                {children}
            </StyledDashboard.Section>
        </>
    )
};

export function DashboardSectionSpliter({ children, ...props }) {
    return (
        <>
            <StyledDashboard.SectionSpliter {...props}>
                {children}
            </StyledDashboard.SectionSpliter>
        </>
    )
};

export function DashboardSectionTitle({ children, ...props }) {
    return (
        <>
            <StyledDashboard.SectionTitle {...props}>
                {children}
            </StyledDashboard.SectionTitle>
        </>
    )
}

export function DashboardSectionHeader({ children, ...props }) {
    return (
        <>
            <StyledDashboard.SectionHeader {...props}>
                {children}
            </StyledDashboard.SectionHeader>
        </>
    )
}

export function DashboardSectionHeaderSection({ children, ...props }) {
    return (
        <>
            <StyledDashboard.SectionHeaderSection {...props}>
                {children}
            </StyledDashboard.SectionHeaderSection>
        </>
    )
}

export function DashboardTable({ children, ...props }) {
    return (
        <>
            <StyledDashboard.Table {...props}>
                {children}
            </StyledDashboard.Table>
        </>
    )
};

export function DashboardTableRow({ children, ...props }) {
    return (
        <>
            <StyledDashboard.TableRow {...props}>
                {children}
            </StyledDashboard.TableRow>
        </>
    )
};

export function DashboardTableHeader({ children, ...props }) {
    return (
        <>
            <StyledDashboard.TableHeaderRow {...props}>
                {children}
            </StyledDashboard.TableHeaderRow>
        </>
    )
};

export function DashboardTableData({ children, ...props }) {
    return (
        <>
            <StyledDashboard.TableDataRow {...props}>
                {children}
            </StyledDashboard.TableDataRow>
        </>
    )
};

export function DashboardFooter({ children, ...props }) {
    return (
        <>
            <StyledDashboard.Footer {...props}>
                {children}
            </StyledDashboard.Footer>
        </>
    )
};

export function DashboardFooterNavigation({ children, ...props }) {
    return (
        <>
            <StyledDashboard.FooterNavigation {...props}>
                {children}
            </StyledDashboard.FooterNavigation>
        </>
    )
}