import { FC } from 'react';
import { useGetAllUsersQuery } from '../services/users';
import { User } from '../types/User';
import { UserCard } from './UserCard';

export const UserList: FC = () => {
  const { data: users, error, isLoading } = useGetAllUsersQuery('');

  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mx-5 xl:mx-12 mb-12">
      {users && users.map((user) => <UserCard user={user} key={user.id} />)}
    </div>
  );
};
