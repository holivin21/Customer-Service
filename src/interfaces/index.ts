export enum MasterCaseStatus {
    Open = "OPEN",
    Close = "CLOSE",
    Progress = "PROGRESS",
    Reject = "REJECT"
}
export enum MasterCaseType {
    LiveChat = "LIVE_CHAT"
}
export enum UserRole {
    Guest = "GUEST",
    Agent = "AGENT",
    Admin = "ADMIN",
    Customer = "CUSTOMER"
}
export enum MasterRouteName {
    Home = "home",
    AgentLiveChat = "agent-live-chat",
    AgentChat = "agent-chat",
    CustomerLiveChat = "customer-live-chat",
    CustomerChat = "customer-chat",
    AgentDashboard = "dashboard-chat"
}
export interface IMasterCase {
    id: string
    start_time: Date
    end_time: Date | null
    is_deleted: boolean
    status: MasterCaseStatus
    title: string | null
    type: MasterCaseType
    updated_at: Date
    updated_by: string | null,
    agent_id: string | null,
    customer_id: string
    description: string | null
    agent_message: string | null
    Customer: IUser | null
    Agent: IUser | null
    waiting_number: number | null
}
export interface IDialog {
    id: string
    updated_at: Date
    updated_by: string
    is_deleted: boolean
    case_id: string
    message: string
    status: string
    user_id: string
    Users: IUser
}
export interface IUser {
    id: string,
    role: string,
    last_sign_in_at: Date | null,
    updated_at: Date | null,
    updated_by: String | null,
    phone: string | null,
    avatar: string | null
    full_name: string | null
    email: string
}
export interface IUserToken {
    access_token: string | null
    token_type: string | null
    expires_in: number | null
    refresh_token: string | null
    user: IUser
    expires_at: number | null
}

