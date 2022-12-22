import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useGetUserPostsQuery } from '../services/users';
import { PostsCard } from './PostsCard';

export const PostsList = () => {
  const { id } = useParams();
  const { data: posts, isLoading, error } = useGetUserPostsQuery(id!);
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByIdQuery(id!);

  if (isLoading || userLoading) {
    return <p>Loading</p>;
  }
  return (
    <div className="flex flex-col">
      <h1 className="self-center text-2xl">{`Posts by: ${user?.name}`}</h1>
      <ul className="grid grid-cols-1 xl:grid-cols-2 items-start justify-items-center gap-5">
        {posts &&
          posts.map((post) => (
            <li className="">
              <PostsCard post={post} author={user!.username} />
            </li>
          ))}
      </ul>
    </div>
  );
};
