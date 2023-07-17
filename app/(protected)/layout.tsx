"use client"
import { CanAccess } from "@refinedev/core";

export default function Layout({ children, }: { children: React.ReactNode; }) {
    return (
        <CanAccess fallback={<>no have access</>}>
            {children}
        </CanAccess>
    )
}