import React from "react";
import Player from '@/components/Player';
import './page.css';
import Image from "next/image";

export default function Home() {
  return <div className={`app app--prmry flx--mdl`} style={{ backgroundImage: "url(/desktopbackground-min.webp)" }}>
                                            <div style={{ display: 'none' }}>
                        <Image
                            src='/desktopbackground-min.webp'
                            alt="Preload background"
                            width={2560} // Provide actual dimensions
                            height={1440} // Provide actual dimensions
                            priority
                        />
                    </div>
          <h1>HangmanX - thrilling multiplayer Hangman</h1>
          <Player />
        </div>
};
