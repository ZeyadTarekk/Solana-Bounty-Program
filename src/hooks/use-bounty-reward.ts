import { fetcher } from 'lib/fetcher';
import useSWR from 'swr';

export const useBountyReward = (id: number) => {
    const { data, error } = useSWR<number>(
        `/api/bounties/${id}/reward`,
        fetcher,
    );

    return {
        reward: data,
        isError: error,
        isLoading: !error && !data,
    };
};
