import { IUser, IUserToken } from 'src/interfaces';
import { supabaseClientAuth } from 'src/utility';
import { create } from 'zustand'
interface IRABC {
    listUser: any;
    error: string | null;
    loading: boolean;
    fetchListUser: () => void,
    deleteUser: (id: string) => void
}
export const useGetUser = create<IRABC>()((set) => {
    return {
        listUser: null,
        error: null,
        loading: false,
        fetchListUser: async () => {
            set({ loading: true })
            const { data, error } = await supabaseClientAuth.auth.admin.listUsers();
            set({ listUser: data, error: error?.name, loading: false })
        },
        deleteUser: async (id: string) => {
            set({ loading: true })
            const { data, error } = await supabaseClientAuth.auth.admin.deleteUser(id)
            set({ error: error?.name, loading: false })
        }
    };
});