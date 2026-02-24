import React from 'react';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='bg-red-500'>{children}</div>;
}
