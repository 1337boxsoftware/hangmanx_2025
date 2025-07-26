import React, { Component } from 'react'
import Scroll               from '@/components/Scroll'
import Search               from '@/components/Search'
import Latency              from '@/components/Latency'
import Players              from '@/components/Players'
import GameButton           from '@/components/GameButton'
import Main                 from '@/components/Main'
import Wrong                from '@/components/Wrong'
import Word                 from '@/components/Word'
import { GAMESTATUS }       from '@/models/Game'
import Image from 'next/image';

import "./GameClient.css"
const TOTALWRONGGUESSES = 6
import localFont from 'next/font/local';
const pixelFont = localFont({ src: '../../../../public/fonts/pixel/PixelEmulator-xq08.ttf' });

class GameClient extends Component{
    constructor(props){
        super(props)
    }

    onGuess = (e) => {
        if(this.props.mdlGame.gameStatus() === GAMESTATUS.PLAYING && this.props.id === this.props.mdlGame.mdlPlayers().turn()){
            this.props.mdlGame.mdlGuesses().validateGuess(e.target.innerHTML)
            this.props.onGuess(e.target.innerHTML)
        }
    }

    render(){
        const mdlGame           = this.props.mdlGame
        const mdlPlayers        = mdlGame.mdlPlayers()
        const mdlGuesses        = mdlGame.mdlGuesses()

        return <div className={`${pixelFont.className} gm gm--prmry clr--wht`}>
                <Scroll onItemClick={this.onGuess} skull={mdlGame.mdlGuesses().wrong()} smiley={mdlGame.mdlGuesses().correct()}/>
                <Latency latency={this.props.latency}/>
                <Players    player={this.props.id}
                            players={mdlPlayers.players()}
                            turn={mdlPlayers.turn()}
                            seconds={this.props.seconds}
                />
                <Main>
                    <Wrong guesses={mdlGuesses.wrong()} totalGuesses={TOTALWRONGGUESSES}/>
                    <Word word={this.props.mdlGame.word()} gameStatus={this.props.mdlGame.gameStatus()}/>
                </Main>
                <GameButton onClick={this.props.onNext} title="find next best available game"/>
                <Search status={this.props.search}/>
            </div>
    }
}

export default GameClient