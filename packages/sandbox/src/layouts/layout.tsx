import React from 'react';

interface LayoutProps {
    home?: boolean;
    pageTitle?: string;
}

export const Layout: React.FC<LayoutProps & { children?: React.ReactNode }> = ({ children, home, pageTitle }) => {
    return <div>{children}</div>;
};
