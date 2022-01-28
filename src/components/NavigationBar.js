import React from "react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <div className="navbar">
      <nav className="site-header-categories">
        <Link href="/">
          <a className="site-header-categories-a">Home</a>
        </Link>
        <Link href="/post_job">
          <a className="site-header-categories-a">Post a job</a>
        </Link>
        <Link href="/about">
          <a className="site-header-categories-a">About</a>
        </Link>
        <Link href="https://twitter.com/itsanishjain">
          <a className="site-header-categories-a">Contact</a>
        </Link>
      </nav>
    </div>
  );
}
