import React from "react";
import Player from '@/components/Player';
import './page.css';

export default function Home() {
  return <div className={`app app--prmry flx--mdl`}>
          <Player />
        </div>
};
