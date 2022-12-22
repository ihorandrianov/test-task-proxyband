import { FC } from 'react';
import { Post } from '../types/Post';

interface Props {
  post: Post;
  author: string;
}

export const PostsCard: FC<Props> = ({ post, author }) => {
  const { userId, id, title, body } = post;
  return (
    <article className="flex flex-col gap-2 m-5">
      <h1 className="font-semibold">{title}</h1>
      <p className="font-light border border-gray-100 rounded p-3">{body}</p>
      <p className="self-end italic">{`by ${author}`}</p>
    </article>
  );
};
