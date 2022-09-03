import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react'

import { useUser } from '../../providers/userProvider'

import AuthenticationLogout from '../../utils/authentication/logout';

import Dashboard, { DashboardFooter, DashboardFooterNavigation, DashboardSection, DashboardSectionHeader, DashboardSectionHeaderSection, DashboardSections, DashboardSectionSpliter, DashboardSectionTitle, DashboardStatistics, DashboardStatisticsSection, DashboardStatisticsText, DashboardStatisticsTitle, DashboardStatisticsValue, DashboardTable, DashboardTableData, DashboardTableHeader, DashboardTableRow } from '../../components/dashboard';
import Sidebar, { SidebarSections, SidebarSection, SidebarSectionTitle, SidebarSectionChoices, SidebarSectionChoice } from '../../components/sidebar';

export default function Logs() {
    const user = useUser();
    const navigate = useNavigate();

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("https://api.filesafety.co/authentication/@me/logs", {
            method: "GET",
            credentials: "include",
        }).then((response) => response.json()).then((response) => {
            if (response.error) return;
            else return setLogs(response.data);
        }).catch((error) => {});
    }, []);

    return (
        <>
            <Sidebar>
                <SidebarSections>
                    <SidebarSection>
                        <SidebarSectionTitle>Main</SidebarSectionTitle>
                        <SidebarSectionChoices>
                            <SidebarSectionChoice onClick={() => navigate("/")}>Overview</SidebarSectionChoice>
                        </SidebarSectionChoices>
                    </SidebarSection>
                    <SidebarSection>
                        <SidebarSectionTitle>Management</SidebarSectionTitle>
                        <SidebarSectionChoices>
                            <SidebarSectionChoice onClick={() => navigate("/activations")}>Activations</SidebarSectionChoice>
                            <SidebarSectionChoice onClick={() => navigate("/products")}>Products</SidebarSectionChoice>
                        </SidebarSectionChoices>
                    </SidebarSection>
                    <SidebarSection>
                        <SidebarSectionTitle>Others</SidebarSectionTitle>
                        <SidebarSectionChoices>
                            <SidebarSectionChoice onClick={() => navigate("/logs")}>Logs</SidebarSectionChoice>
                        </SidebarSectionChoices>
                    </SidebarSection>
                </SidebarSections>
                <SidebarSection isLast>
                    <SidebarSectionTitle>AUTHENTICATION</SidebarSectionTitle>
                    <SidebarSectionChoices>
                        <SidebarSectionChoice onClick={(event) => AuthenticationLogout().then(() => window.location.reload()).catch(() => {})}>Logout</SidebarSectionChoice>
                    </SidebarSectionChoices>
                </SidebarSection>
            </Sidebar>
            <Dashboard>
                <DashboardStatisticsSection>
                    <DashboardStatistics>
                        <div>
                            <DashboardStatisticsTitle>Total Logs</DashboardStatisticsTitle>
                            <DashboardStatisticsText>Amount of actions taken</DashboardStatisticsText>
                        </div>
                        <DashboardStatisticsValue>{user?.Logs?.length || 0}</DashboardStatisticsValue>
                    </DashboardStatistics>
                    {user?.Subscription?.EndsAt
                    ? <>
                        <DashboardStatistics>
                            <div>
                                <DashboardStatisticsTitle>Subscription Expiration Date</DashboardStatisticsTitle>
                                <DashboardStatisticsText>The day your subscription will expire on</DashboardStatisticsText>
                            </div>
                            <DashboardStatisticsValue>{new Date(user?.Subscription?.EndsAt || Date.now()).toLocaleDateString()}</DashboardStatisticsValue>
                        </DashboardStatistics>
                    </> : <></>}
                </DashboardStatisticsSection>
                <DashboardSections>
                    <DashboardSection>
                        <DashboardSectionHeader>
                            <DashboardSectionHeaderSection>
                                <DashboardSectionTitle>Your Logs</DashboardSectionTitle>
                            </DashboardSectionHeaderSection>
                        </DashboardSectionHeader>
                        <DashboardSectionSpliter />
                        <DashboardTable>
                            <DashboardTableRow>
                                <DashboardTableHeader>#</DashboardTableHeader>
                                <DashboardTableHeader>Action</DashboardTableHeader>
                                <DashboardTableHeader>Data</DashboardTableHeader>
                                <DashboardTableHeader>Date</DashboardTableHeader>
                            </DashboardTableRow>
                            {logs?.map?.((log, index) => {
                                return (
                                    <DashboardTableRow key={`0x${index + 1}`}>
                                        <DashboardTableData>{index + 1}</DashboardTableData>
                                        <DashboardTableData>{log.Action}</DashboardTableData>
                                        <DashboardTableData isNull={!log.Data}>{log.Data || "(NULL)"}</DashboardTableData>
                                        <DashboardTableData>{new Date(log.Date || Date.now()).toLocaleDateString()}</DashboardTableData>
                                    </DashboardTableRow>
                                )
                            })}
                        </DashboardTable>
                    </DashboardSection>
                </DashboardSections>
                <DashboardFooter>
                    <DashboardFooterNavigation href="https://discord.filesafety.co/">Our Discord</DashboardFooterNavigation>
                    |
                    <DashboardFooterNavigation href="https://filesafety.net/">FILESAFETY V2</DashboardFooterNavigation>
                </DashboardFooter>
            </Dashboard>
        </>
    )
};