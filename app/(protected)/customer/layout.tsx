"use client";

import CustomThemeLayout from "@components/customThemeLayout";
import AuthHeader from "@components/header";
import { kbar } from "@components/offLayoutArea";
import { Authenticated } from "@refinedev/core";
import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/mui";

export default function ProtectedLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <Authenticated redirectOnFail="/login">
            <CustomThemeLayout showSideBar={true}>
                {children}
            </CustomThemeLayout>
        </Authenticated>
    );
}
