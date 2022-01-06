import React from 'react';

import * as StyledSidebar from "./styled";

export default function Sidebar({ children, ...props}) {
    return (
        <StyledSidebar.Sidebar {...props}>
            {children}
        </StyledSidebar.Sidebar>
    )
};

export function SidebarSections({ children, ...props}) {
    return (
        <StyledSidebar.Sections {...props}>
            {children}
        </StyledSidebar.Sections>
    )
};

export function SidebarSection({ children, ...props}) {
    return (
        <StyledSidebar.Section {...props}>
            {children}
        </StyledSidebar.Section >
    )
};

export function SidebarSectionTitle({ children, ...props}) {
    return (
        <StyledSidebar.SectionTitle {...props}>
            {children}
        </StyledSidebar.SectionTitle>
    )
};

export function SidebarSectionChoices({ children, ...props}) {
    return (
        <StyledSidebar.SectionChoices {...props}>
            {children}
        </StyledSidebar.SectionChoices>
    )
};

export function SidebarSectionChoice({ children, ...props}) {
    return (
        <StyledSidebar.SectionChoice {...props}>
            {children}
        </StyledSidebar.SectionChoice>
    )
};