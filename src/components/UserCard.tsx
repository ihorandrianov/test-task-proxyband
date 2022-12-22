import { animated, useSpring } from '@react-spring/web';
import { isPending } from '@reduxjs/toolkit';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetUserAlbumsQuery } from '../services/users';
import { Album } from '../types/Album';
import { User } from '../types/User';
import { AlbumCard } from './AlbumCard';

interface Props {
  user: User;
}

export const UserCard: FC<Props> = ({ user }) => {
  const { name, username, email, phone, website, company, id } = user;
  const { data, error, isLoading } = useGetUserAlbumsQuery(id.toString());
  const [isOpened, setIsOpened] = useState(false);
  const animation = useSpring({
    width: '80vw',
    height: isOpened ? '80vh' : '0vh',
    top: isOpened ? '10vh' : '0vh',
    left: '10vw',
    opacity: isOpened ? 1 : 0,
  });
  const bg = useSpring({
    width: '100vw',
    height: isOpened ? '100vh' : '0vh',
    opacity: isOpened ? 1 : 0,
  });
  const [fixed, api] = useSpring(() => ({
    from: {
      top: 0,
    },
  }));
  useEffect(() => {
    api.start({
      to: {
        top: window.scrollY,
      },
    });
    document.body.style.overflow = isOpened ? 'hidden' : 'unset';
  }, [isOpened]);
  const toogle = () => setIsOpened(!isOpened);
  return (
    <div className=" border rounded-md shadow-md flex flex-col justify-around p-3 overflow-x-auto">
      {isOpened && (
        <animated.div
          className="absolute overflow-y-hidden h-full top-0 left-0 w-[100vw] bg-slate-500/50"
          style={{ ...bg, ...fixed }}
        >
          <animated.div
            className="absolute bg-white rounded-md overflow-y-auto"
            style={{ ...animation }}
          >
            <button
              onClick={toogle}
              className="absolute right-5 top-5 w-8 h-8 rounded-[50%] border flex justify-center items-center hover:border-gray-800 duration-300"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z" />
              </svg>
            </button>
            {isLoading && <p>Loading</p>}
            <h1 className="text-center mt-16 xl:mt-10">{`Albums of ${name}`}</h1>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-5 m-5 justify-items-start mt-12">
              {data && data.map((album: Album) => <AlbumCard album={album} />)}
            </div>
          </animated.div>
        </animated.div>
      )}
      <div className="flex flex-col xl:flex-row gap-2 xl:gap-5">
        <div className="w-32 h-32 hidden xl:block rounded-md bg-green-500 flex-shrink-0"></div>
        <ul className="flex flex-col gap-5">
          <li>
            <p className="font-semibold text-sm">Username:</p>
            <p className="ml-2">{username}</p>
          </li>
          <li>
            <p className="font-semibold text-sm">Name:</p>
            <p className="ml-2">{name}</p>
          </li>
          <li>
            <p className="font-semibold text-sm">Email:</p>
            <a className="ml-2" href={`mailto:${email}`}>
              {email}
            </a>
          </li>
        </ul>
        <div className="mb-5">
          <ul className="flex flex-col gap-5">
            <li>
              <p className="font-semibold text-sm">Company:</p>
              <p className="ml-2">{company.name}</p>
            </li>
            <li>
              <p className="font-semibold text-sm">Field:</p>
              <p className="ml-2">{company.bs}</p>
            </li>
            <li>
              <p className="font-semibold text-sm">Catch phrase:</p>
              <p className="ml-2">{company.catchPhrase}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-evenly">
        <Link
          className="p-2 text-blue-700 hover:text-blue-300 duration-300"
          to={`/users/${id}/posts`}
        >
          Browse posts
        </Link>
        <button
          onClick={toogle}
          className="border border-gray-300 p-2 rounded-xl hover:border-gray-800 duration-300"
        >
          Show albums
        </button>
      </div>
    </div>
  );
};
