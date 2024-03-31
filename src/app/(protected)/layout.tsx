"use client";
import { CustomHeader } from "@components/custom-header";
import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/chakra-ui";

export default function ProtectedLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <ThemedLayoutV2 Header={() => <CustomHeader/>}>
            {children}
        </ThemedLayoutV2>
    );
}