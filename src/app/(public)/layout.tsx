"use client"
import { CustomHeader } from "@components/custom-header";
import { Header, ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2 } from "@refinedev/chakra-ui";
import { CanAccess } from "@refinedev/core";

export default function Layout({ children, }: { children: React.ReactNode; }) {
    return (
        <>
            <ThemedLayoutV2 Header={()=><CustomHeader/>}   >
                hello
            </ThemedLayoutV2>
        </>
    )
}