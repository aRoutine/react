import React from "react";
import { Link } from "react-router-dom";


class Navbar extends React.Component{
    render(): React.ReactNode {
        return (
            <div className="navbar">
      <div className="navbar__items">
      <Link to="/about">About</Link>
      <Link to="/posts">Posts</Link>
      </div>
    </div>
        )
    }

}

export default Navbar;