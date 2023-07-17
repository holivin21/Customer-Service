"use client";

import CustomThemeLayout from "@components/customThemeLayout";
import { ErrorComponent } from "@refinedev/mui";


export default function NotFound() {
    return (
        <CustomThemeLayout showSideBar>
            <ErrorComponent />
        </CustomThemeLayout>
    );
}
