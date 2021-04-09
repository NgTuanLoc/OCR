import React from "react";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  return (
    <React.Fragment>
      <Navbar />
      <header id="home">
        <Navbar />
        <div class="banner">
          <div class="container">
            <h1>scroll project</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas eos
              neque sunt in? Id, necessitatibus quos quisquam distinctio
              laudantium fugiat?
            </p>
            <a href="#" class="scroll-link btn btn-white">
              explore tours
            </a>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
