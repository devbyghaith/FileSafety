import { useNavigate } from 'react-router-dom';

import * as Recharts from "recharts";

import React, { useState, useEffect } from 'react';

import { useUser } from '../../providers/userProvider'

import AuthenticationLogout from '../../utils/authentication/logout';

import Dashboard, { DashboardChartsStatistics, DashboardFooter, DashboardFooterNavigation, DashboardSection, DashboardSectionHeader, DashboardSections, DashboardSectionSpliter, DashboardSectionTitle, DashboardStatistics, DashboardStatisticsSection, DashboardStatisticsText, DashboardStatisticsTitle, DashboardStatisticsValue, DashboardTable, DashboardTableData, DashboardTableHeader, DashboardTableRow } from '../../components/dashboard';
import Sidebar, { SidebarSections, SidebarSection, SidebarSectionTitle, SidebarSectionChoices, SidebarSectionChoice } from '../../components/sidebar';

import GetDaysBetweenDates from '../../utils/getDaysBetweenDates';

export default function Overview() {
    const user = useUser();
    const navigate = useNavigate();

    const [requestsChartData, setRequestsChartData] = useState([]);

    useEffect(() => {
        let daysInTwoWeeks = GetDaysBetweenDates((new Date(Date.now() - (1209600000)) ), new Date());
        let requestsData = [];

        for (let index = 0; index < daysInTwoWeeks.length; index++) {
            let date = daysInTwoWeeks[index];
            let requests = user?.Requests?.filter?.((request) => new Date(request.MadeAt).toLocaleDateString() == date);
            let requestsLength = requests?.length;

            requestsData.push({ Date: date, Requests: requestsLength });
        };

        setRequestsChartData(requestsData);
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
                            <DashboardStatisticsTitle>Total Products</DashboardStatisticsTitle>
                            <DashboardStatisticsText>Amount of products you have created</DashboardStatisticsText>
                        </div>
                        <DashboardStatisticsValue>{user?.Products?.length || 0}</DashboardStatisticsValue>
                    </DashboardStatistics>
                    <DashboardStatistics>
                        <div>
                            <DashboardStatisticsTitle>Total Activations</DashboardStatisticsTitle>
                            <DashboardStatisticsText>Amount of users you have activated</DashboardStatisticsText>
                        </div>
                        <DashboardStatisticsValue>{user?.Activations?.length || 0}</DashboardStatisticsValue>
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
                <DashboardStatisticsSection>
                    <DashboardChartsStatistics>
                        <DashboardStatisticsTitle>REQUESTS STATISTICS</DashboardStatisticsTitle>
                        <Recharts.ResponsiveContainer width={"100%"} height={400}>
                            <Recharts.AreaChart data={requestsChartData}>
                                <defs>
                                    <linearGradient id="color" x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
                                        <stop offset={"0%"} stopColor={'var(--colors-main)'} stopOpacity={0.4} ></stop>
                                        <stop offset={"75%"} stopColor={'var(--colors-main)'} stopOpacity={0.05} ></stop>
                                    </linearGradient>
                                </defs>
                                <Recharts.Area dataKey={"Requests"} stroke={'var(--colors-main)'} fill={'url(#color)'} type="monotone" />
                                <Recharts.YAxis dataKey={"Requests"} axisLine={false} tickLine={false} />
                                <Recharts.XAxis dataKey={"Date"} />
                                <Recharts.Tooltip />
                                <Recharts.CartesianGrid opacity={0.025} vertical={false} />
                            </Recharts.AreaChart>
                        </Recharts.ResponsiveContainer>
                    </DashboardChartsStatistics>
                </DashboardStatisticsSection>
                <DashboardSections>
                    <DashboardSection>
                        <DashboardSectionHeader>
                            <DashboardSectionTitle>Your Products</DashboardSectionTitle>
                        </DashboardSectionHeader>
                        <DashboardSectionSpliter />
                        <DashboardTable>
                            <DashboardTableRow>
                                <DashboardTableHeader>#</DashboardTableHeader>
                                <DashboardTableHeader>Product</DashboardTableHeader>
                                <DashboardTableHeader>Created at</DashboardTableHeader>
                            </DashboardTableRow>
                            {user?.Products?.map?.((product, index) => {
                                return (
                                    <DashboardTableRow key={`0x${index + 1}`}>
                                        <DashboardTableData>{index + 1}</DashboardTableData>
                                        <DashboardTableData>{product.Product}</DashboardTableData>
                                        <DashboardTableData>{new Date(product.CreatedAt).toLocaleDateString()}</DashboardTableData>
                                    </DashboardTableRow>
                                )
                            })}
                        </DashboardTable>
                    </DashboardSection>
                    <DashboardSection>
                        <DashboardSectionHeader>
                            <DashboardSectionTitle>Your Activations</DashboardSectionTitle>
                        </DashboardSectionHeader>
                        <DashboardSectionSpliter />
                        <DashboardTable>
                            <DashboardTableRow>
                                <DashboardTableHeader>#</DashboardTableHeader>
                                <DashboardTableHeader>Product</DashboardTableHeader>
                                <DashboardTableHeader>Address</DashboardTableHeader>
                                <DashboardTableHeader>Key</DashboardTableHeader>
                                <DashboardTableHeader>Activated at</DashboardTableHeader>
                                <DashboardTableHeader>Expires at</DashboardTableHeader>
                            </DashboardTableRow>
                            {user?.Activations?.map?.((activation, index) => {
                                return (
                                    <DashboardTableRow key={`0x${index + 1}`}>
                                        <DashboardTableData>{index + 1}</DashboardTableData>
                                        <DashboardTableData>{user?.Products?.find?.((product) => product.Id == activation.Product)?.Product || "Unknown"}</DashboardTableData>
                                        <DashboardTableData>{activation?.Address}</DashboardTableData>
                                        <DashboardTableData isNull={!activation.Key}>{activation.Key || "(NULL)"}</DashboardTableData>
                                        <DashboardTableData>{new Date(activation?.ActivatedAt).toLocaleDateString()}</DashboardTableData>
                                        <DashboardTableData isNull={!activation.ExpiresAt}>{activation.ExpiresAt ? new Date(activation.ExpiresAt).toLocaleDateString() : "(NULL)"}</DashboardTableData>
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
}
