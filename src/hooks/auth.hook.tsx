import { IUserToken } from 'src/interfaces';
import { create } from 'zustand'
interface IAuth {
    user: IUserToken | null;
    setUserToken: (user: IUserToken) => void
}
export const setUserToken = create<IAuth>()((set) => {
    return {
        user: null,
        setUserToken: (user) => set((state) => ({ user: user })),
    };
});