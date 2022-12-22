import { createBrowserRouter } from 'react-router-dom';
import { PostsList } from './components/PostsList';
import { UserList } from './components/UserList';
import { Layout } from './pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <UserList />,
      },
      {
        path: '/users/:id/posts',
        element: <PostsList />,
      },
    ],
  },
]);

export default router;
