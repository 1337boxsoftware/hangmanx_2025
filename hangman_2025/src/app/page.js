import React from "react";
import Player from './scenes/Player/Player.js'
import "../src/styles/Reset.css";
import "../src/styles/Common.css";
import "../src/styles/App.css";

export default function Home() {
  return <div className="app app--prmry flx--mdl">
          <Player />
        </div>
};
