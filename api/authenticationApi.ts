import { queryFn } from '@/util/axios';

export const getUserApi = {
    queryKey: ['userData'],
    queryFn: () => queryFn('/user'),
};

//======USAGE=======//

// const { data, error, isLoading } = useQuery(loginApi);

// const mutation = useMutation(getUserApi);
