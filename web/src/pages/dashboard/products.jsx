import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import React, { useState } from 'react'

import { useUser } from '../../providers/userProvider'

import AuthenticationLogout from '../../utils/authentication/logout';

import Dashboard, { DashboardFooter, DashboardFooterNavigation, DashboardSection, DashboardSectionHeader, DashboardSectionHeaderSection, DashboardSections, DashboardSectionSpliter, DashboardSectionTitle, DashboardStatistics, DashboardStatisticsSection, DashboardStatisticsText, DashboardStatisticsTitle, DashboardStatisticsValue, DashboardTable, DashboardTableData, DashboardTableHeader, DashboardTableRow } from '../../components/dashboard';
import Sidebar, { SidebarSections, SidebarSection, SidebarSectionTitle, SidebarSectionChoices, SidebarSectionChoice } from '../../components/sidebar';
import { AlertButton, DangerButton, SuccessButton } from '../../components/buttons';

import CreateProductModal from '../../components/modals/dashboard/products/create';
import DeleteProductModal from '../../components/modals/dashboard/products/delete';

export default function Products() {
    const user = useUser();
    const navigate = useNavigate();

    const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
    const [isDeletePrdocutModalOpen, setIsDeleteProductModalOpen] = useState(false);

    return (
        <>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
            >
                {isCreateProductModalOpen && <CreateProductModal handleClose={() => setIsCreateProductModalOpen(false)} />}
                {isDeletePrdocutModalOpen && <DeleteProductModal handleClose={() => setIsDeleteProductModalOpen(false)} />}
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
                            <DashboardStatisticsTitle>Total Products</DashboardStatisticsTitle>
                            <DashboardStatisticsText>Amount of products you have created</DashboardStatisticsText>
                        </div>
                        <DashboardStatisticsValue>{user?.Products?.length || 0}</DashboardStatisticsValue>
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
                                <DashboardSectionTitle>Your Products</DashboardSectionTitle>
                            </DashboardSectionHeaderSection>
                            <DashboardSectionHeaderSection>
                                <DangerButton disabled={isDeletePrdocutModalOpen} onClick={() => setIsDeleteProductModalOpen(!isDeletePrdocutModalOpen)}>DELETE PRODUCT</DangerButton>
                                <SuccessButton disabled={isCreateProductModalOpen} onClick={() => setIsCreateProductModalOpen(!isCreateProductModalOpen)}>CREATE PRODUCT</SuccessButton>
                            </DashboardSectionHeaderSection>
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
