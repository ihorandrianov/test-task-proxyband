import { FC } from 'react';
import { Album } from '../types/Album';

interface Props {
  album: Album;
}

export const AlbumCard: FC<Props> = ({ album }) => {
  return (
    <div className="">
      <h1>{`Title: ${album.title}`}</h1>
    </div>
  );
};
