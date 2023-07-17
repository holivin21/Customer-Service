import { supabaseClientPublic } from 'src/utility';
import { create } from 'zustand'
interface IBucketChat {
    count: number;
    error: string | null;
    loading: boolean;
    fetchBucketChatCount: (chat_id: string) => void,
}
export const useGetBucket = create<IBucketChat>()((set) => {
    return {
        count: 0,
        error: null,
        loading: false,
        fetchBucketChatCount: async (chat_id: string) => {
            set({ loading: true })
            const { data, error } = await supabaseClientPublic.rpc("function_bucket_live_chat_count", { "chat_id": chat_id })
            set({ count: data, error: error?.message, loading: false })
        },
    };
});