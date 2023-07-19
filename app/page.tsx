"use client";

import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router/app";
import { MasterRouteName } from "src/interfaces";

export default function IndexPage() {
    return (
        <Authenticated redirectOnFail="/home" appendCurrentPathToQuery={false}>
            <NavigateToResource resource={MasterRouteName.Home} />
        </Authenticated>
    );
}
