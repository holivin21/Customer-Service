"use client";

import AuthHeader from "@components/header";
import { kbar } from "@components/offLayoutArea";
import { Authenticated } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/mui";

export default function ProtectedLayout({children,}: {children: React.ReactNode;}) {
    return (
        <Authenticated redirectOnFail="/login">
            <ThemedLayoutV2 OffLayoutArea={kbar} Header={() => <AuthHeader sticky />}>
                {children}
            </ThemedLayoutV2>
        </Authenticated>
    );
}
