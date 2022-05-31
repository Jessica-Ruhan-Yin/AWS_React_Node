import React from "react";
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {isAuth, logout} from "../helpers/auth";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Layout = ({children}) => {
  const head = () => (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
        crossOrigin="anonymous"
      />

      <link rel="stylesheet" href="/static/css/styles.css"/>
    </React.Fragment>
  );

  const nav = () => (
    <ul className="nav nav-tabs bg-light">
      <li className="nav-item">
        <Link href="/">
          <a className="nav-link">Home</a>
        </Link>
      </li>


      {!isAuth() && (
        <React.Fragment>
          <li className="nav-item">
            <Link href="/login">
              <a className="nav-link">Login</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/register">
              <a className="nav-link">Register</a>
            </Link>
          </li>
        </React.Fragment>
      )}


      {isAuth() && isAuth().role === 'admin' && (
        <li className="nav-item ml-auto">
          <Link href="/admin">
            <a className="nav-link">{isAuth().name}</a>
          </Link>
        </li>
      )}

      {isAuth() && isAuth().role === 'subscriber' && (
        <li className="nav-item ml-auto">
          <Link href="/user">
            <a className="nav-link">{isAuth().name}</a>
          </Link>
        </li>
      )}

      {isAuth() && (
        <li className="nav-item">
          <a onClick={logout} className="nav-link">Logout</a>
        </li>
      )}
    </ul>
  );


  return (
    <React.Fragment>
      {head()} {nav()}
      <div className="container pt-5 pd-5">{children}</div>
    </React.Fragment>
  );
};

export default Layout;
