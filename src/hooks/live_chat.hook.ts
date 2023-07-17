import { create } from 'zustand'
interface ISwitchOnline {
    isOnline: boolean;
    switchOnline: (online: boolean) => void
}
export const useSwitchOnlie = create<ISwitchOnline>()((set) => {
    return {
        isOnline: false,
        switchOnline: (online) => set((state) => ({ isOnline: online })),
    };
});
interface ICountDown {
    count: number;
    decrement: () => void;
    resetCount: () => void;
}
export const useCountDownRefresh = create<ICountDown>()((set) => {
    return {
        count: 60,
        decrement: () => set((state) => ({ count: state.count - 1 })),
        resetCount: () => set((state) => ({ count: 60 }))
    }
})