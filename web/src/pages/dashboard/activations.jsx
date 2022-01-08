import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react'

import * as Recharts from "recharts";

import { useUser } from '../../providers/userProvider'

import AuthenticationLogout from '../../utils/authentication/logout';

import Dashboard, { DashboardChartsStatistics, DashboardFooter, DashboardFooterNavigation, DashboardSection, DashboardSectionHeader, DashboardSectionHeaderSection, DashboardSections, DashboardSectionSpliter, DashboardSectionTitle, DashboardStatistics, DashboardStatisticsSection, DashboardStatisticsText, DashboardStatisticsTitle, DashboardStatisticsValue, DashboardTable, DashboardTableData, DashboardTableHeader, DashboardTableRow } from '../../components/dashboard';
import Sidebar, { SidebarSections, SidebarSection, SidebarSectionTitle, SidebarSectionChoices, SidebarSectionChoice } from '../../components/sidebar';
import { AlertButton, DangerButton, SuccessButton } from '../../components/buttons';
import { AnimatePresence } from 'framer-motion';

import UpdateModal from '../../components/modals/dashboard/activations/update';
import ActivateModal from '../../components/modals/dashboard/activations/activate';
import DeactivateModal from '../../components/modals/dashboard/activations/deactivate';
import GetDaysBetweenDates from '../../utils/getDaysBetweenDates';

export default function Activations() {
    const user = useUser();
    const navigate = useNavigate();

    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [activationsChartData, setActivationsChartData] = useState([]);

    useEffect(() => {
        let daysInTwoWeeks = GetDaysBetweenDates((new Date(Date.now() - (1209600000)) ), new Date());
        let activationsData = [];

        for (let index = 0; index < daysInTwoWeeks.length; index++) {
            let date = daysInTwoWeeks[index];
            let activations = user?.Activations?.filter?.((activation) => new Date(activation.ActivatedAt).toLocaleDateString() == date);
            let activationsLength = activations?.length;

            activationsData.push({ Date: date, Activations: activationsLength });
        };

        setActivationsChartData(activationsData);
    }, []);

    return (
        <>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
            >
                {isUpdateModalOpen && <UpdateModal handleClose={() => setIsUpdateModalOpen(false)} />}
                {isDeactivateModalOpen && <DeactivateModal handleClose={() => setIsDeactivateModalOpen(false)} />}
                {isActivateModalOpen && <ActivateModal handleClose={() => setIsActivateModalOpen(false)} />}
            </AnimatePresence>
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
                        <DashboardStatisticsTitle>ACTIVATIONS STATISTICS</DashboardStatisticsTitle>
                        <Recharts.ResponsiveContainer width={"100%"} height={400}>
                            <Recharts.AreaChart data={activationsChartData}>
                                <defs>
                                    <linearGradient id="color" x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
                                        <stop offset={"0%"} stopColor={'var(--colors-main)'} stopOpacity={0.4} ></stop>
                                        <stop offset={"75%"} stopColor={'var(--colors-main)'} stopOpacity={0.05} ></stop>
                                    </linearGradient>
                                </defs>
                                <Recharts.Area dataKey={"Activations"} stroke={'var(--colors-main)'} fill={'url(#color)'} type="monotone" />
                                <Recharts.YAxis dataKey={"Activations"} axisLine={false} tickLine={false} />
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
                            <DashboardSectionHeaderSection>
                                <DashboardSectionTitle>Your Activations</DashboardSectionTitle>
                            </DashboardSectionHeaderSection>
                            <DashboardSectionHeaderSection>
                                <DangerButton disabled={isDeactivateModalOpen} onClick={() => setIsDeactivateModalOpen(!isDeactivateModalOpen)}>DEACTIVATE</DangerButton>
                                <AlertButton disabled={isUpdateModalOpen} onClick={() => setIsUpdateModalOpen(!isUpdateModalOpen)}>UPDATE</AlertButton>
                                <SuccessButton disabled={isActivateModalOpen} onClick={() => setIsActivateModalOpen(!isActivateModalOpen)}>ACTIVATE</SuccessButton>
                            </DashboardSectionHeaderSection>
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
                                    <DashboardTableRow key={`0x${index}`}>
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
