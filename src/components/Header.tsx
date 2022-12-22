import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="h-24 bg-slate-400 flex justify-center items-center mb-12">
      <Link to="/" className="text-2xl">
        Users
      </Link>
    </header>
  );
};
