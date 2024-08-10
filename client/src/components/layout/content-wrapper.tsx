import Navbar from './navbar';

interface ContentWrapperProps {
  title: string;
  children: React.ReactNode;
}

export default function ContentWrapper({
  title,
  children,
}: ContentWrapperProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
