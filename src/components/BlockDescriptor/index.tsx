import React from 'react';
import cl from 'classnames';

interface IBlockDescriptor {
  title: string,
  description: string,
  className?: string
}

export const BlockDescriptor: React.FC<React.PropsWithChildren<IBlockDescriptor>> = ({ children, title, description, className }) => (
  <>
    <h2 className={cl('text-3xl my-5 font-[900] mt-20 uppercase', className)}>&#47;&#47; {title}</h2>
    <p className='text-md md:text-xl text-justify my-5'>{description}</p>
    {children}
  </>
);
