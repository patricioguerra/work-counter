import React from 'react';
type Props = {};

export default function Header({}: Props) {
  return (
    <div>
      <h1 className="text-4xl font-medium tracking-wide">Work timer</h1>
      <div className="text-2xl tracking-wide">Running</div>
    </div>
  );
}
