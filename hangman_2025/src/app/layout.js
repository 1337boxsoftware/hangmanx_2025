//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./common.css";
import { Suspense } from "react";
import Loading from "./loading";
import Image from "next/image";
import localFont from 'next/font/local';
import Head from 'next/head';
const jerseyFont = localFont({ src: '../../public/fonts/jersey/JerseyM54-aLX9.ttf' });
const pixelFont = localFont({ src: '../../public/fonts/pixel/PixelEmulator-xq08.ttf' });
/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

export const metadata = {
  title: "HangmanX - Challenge your friends in this thrilling multiplayer Hangman",
  description: "Hangman game where every letter counts! Guess words, outsmart opponents, and race against time in a battle of wits and vocabulary. With real-time gameplay and endless word categories, it's the ultimate test of your word skills and strategy!",
  keywords: 'hangman multiplayer friends challenge guess words letter real time game online',
  metadataBase: new URL('https://hangmanx.com'),
  openGraph: {
    title: 'HangmanX - Challenge your friends in this thrilling multiplayer Hangman',
    description: "Hangman game where every letter counts! Guess words, outsmart opponents, and race against time in a battle of wits and vocabulary. With real-time gameplay and endless word categories, it's the ultimate test of your word skills and strategy!",
    url: 'https://hangmanx.com',
    type: 'website',
    images: [
      {
        url: 'https://hangmanx.com/favicon.ico',
        width: 206,
        height: 140,
        alt: 'Red Skull and Bones',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://excellentweb.io"
          key="canonical"
        />
      </Head>
      <html lang="en">
        <body>
          {/* Your content */}
          {children}
        </body>
      </html>
    </>
  );
}
