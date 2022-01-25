import React from 'react';
import Style from './Header.module.css';

export default function Header() {
  return (
  <div className={Style.container}>
      <h1 className={Style.headLine}><i className="fas fa-headphones"></i> BeSound</h1>
      <div className={Style.img}></div>
  </div>
  );
}
