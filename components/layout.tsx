import type { FC, ReactNode } from 'react';

type Props = {
	children: ReactNode;
};
const Layout: FC<Props> = ({ children }) => {
	return <div>{children}</div>;
};
export default Layout;
