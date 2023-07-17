import { AccessControlProvider, CanParams, CanReturnType } from "@refinedev/core";
import { newEnforcer, newModel, StringAdapter } from "casbin";
import { IUser, UserRole } from "src/interfaces";
import { authProvider } from "./authProvider";
const accessControl = (): AccessControlProvider => {
    return {
        can: async ({ resource, action, params, }: CanParams): Promise<CanReturnType> => {
            const data = await authProvider().getIdentity?.() as IUser | null;
            console.log(data?.role, resource, action, params)
            const enforcer = await newEnforcer(model, adapter);
            return {
                can: await enforcer.enforce(
                    data?.role,
                    resource,
                    action,
                ),
            };
        },
        options: {
            buttons: {
                enableAccessControl: true,
                // hide action buttons if not authorized.
                hideIfUnauthorized: true,
            },
        },
    }
}
export default accessControl;

export const model = newModel(`
[request_definition]
r = sub,  obj,act

[policy_definition]
p = sub,  obj,act


[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = r.sub == p.sub  && r.obj == p.obj && regexMatch(p.act, r.act)
`);

export const adapter = new StringAdapter(`
p, AGENT, home,(list)|(show)|(create)
p, AGENT, agent-live-chat,(list)|(show)|(create)
p, AGENT, agent-chat,(show)

p, CUSTOMER, home,(list)|(show)|(create)
p, CUSTOMER, customer-live-chat,(list)|(show)|(create)
p, CUSTOMER, customer-chat,(show)

p, GUEST, home,list

`);
