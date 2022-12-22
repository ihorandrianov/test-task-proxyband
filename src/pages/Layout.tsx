import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const Layout: FC = () => {
  return (
    <main className="relative w-[calc(100vw_-_15px)]">
      <Header />
      <Outlet />
    </main>
  );
};
