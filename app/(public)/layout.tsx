"use client"
import CustomThemeLayout from "@components/customThemeLayout";
import { CanAccess } from "@refinedev/core";

export default function Layout({ children, }: { children: React.ReactNode; }) {
    return (
        <>
            <CustomThemeLayout showSideBar={true}>
                {children}
            </CustomThemeLayout>
        </>
    )
}