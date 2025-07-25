import GameModel, { GAMESTATUS, GuessesModel, PlayersModel } from '../Game.js'

export const SGERRORS = {
    INVALIDGUESS: `invalid guess`, 
    OUTOFSYNCGUESS: `out of sync guess`,
    INVALIDTURN: `player guessing is out of turn`,
    NOAVAILABLESESSION: `no available session found`,
    CANTADDPLAYER: `can't add player to full game`,
    CANTREMOVEPLAYER: `can't remove player game`,
    SERVERISFULL: `server is currently full`,
    SERVERERROR: `server error`,
    MAXCONNECTIONS: `connects per user has maxed`
}


export class ServerGameError{
    constructor(error){
        this.error = error 
    }
}

export default class ServerGameModel extends GameModel{
    static convertWordToHidden(word){
        /* ex input: "word", output: "____" */
        let hiddenWord = ""
        for(const char of word){
            if(char !== ' '){
                hiddenWord += "_"
            }
            else{
                hiddenWord += " "
            }
        }
        return hiddenWord
    }

    constructor(mdlGuesses, mdlPlayers, hiddenWord, gameStatus, serverWord){
        /* convert word to hidden word for the client */
        super(mdlGuesses, mdlPlayers, hiddenWord, gameStatus)
        this.nextTurn = () => {
            // returns a new ServerModel with the next turn calculated
            const mdlPlayers = this.mdlPlayers()
            const newMdlPlayers = new PlayersModel(mdlPlayers.players(), mdlPlayers.nextTurn())
            return new ServerGameModel(this.mdlGuesses(),newMdlPlayers,this.word(),this.gameStatus(),_serverWord)
        }

        this.addPlayer = () => {
            let newMdlPlayers = undefined
            const players = this.players()
            if(players === 3){
                return new ServerGameError(SGERRORS.CANTADDPLAYER)
            }
            else if(mdlPlayers.players() === 0){
                newMdlPlayers = new PlayersModel(1, 1)
            }
            else{
                newMdlPlayers = new PlayersModel(mdlPlayers.players() + 1, mdlPlayers.turn())
            }
            return new ServerGameModel(this.mdlGuesses(),newMdlPlayers,this.word(),this.gameStatus(),_serverWord)
        }

        this.removePlayer = (player) => {
            let newMdlPlayers = undefined
            const mdlPlayers = this.mdlPlayers()
            if(mdlPlayers.players() === 0){
                return new ServerGameError(SGERRORS.CANTREMOVEPLAYER)
            }
            else{
                newMdlPlayers = mdlPlayers.removePlayer(player)
            }

            return new ServerGameModel(this.mdlGuesses(),newMdlPlayers,this.word(),this.gameStatus(),_serverWord)
        }

        this.didClientSendInvalidGuess = (guess) => {
            try{
                mdlGuesses.validateGuess(guess)
            }
            catch(e){
                return new ServerGameError(SGERRORS.INVALIDGUESS)
            }

            if(gameStatus !== GAMESTATUS.PLAYING){
            /* client should know not to send a guess if the game is over */
                return new ServerGameError(SGERRORS.OUTOFSYNCGUESS)
            }

            const correct = mdlGuesses.correct()
            const wrong   = mdlGuesses.wrong()
            if(correct.includes(guess) || wrong.includes(guess)){
            /* the client should be responsible for not sending the same guess */
                return new ServerGameError(SGERRORS.INVALIDGUESS)
            }
            return false
        }

        this.newModelFromCorrectGuess = (guess) => {
            /* guess is correct, change the visible word for clients */
            let newHiddenWord = ""
            for(let index in _serverWord){
                _serverWord[index] === guess ? newHiddenWord += guess : newHiddenWord += hiddenWord[index]
            }
            const newCorrect = mdlGuesses.correct() + guess
            const newMdlGuesses = new GuessesModel(newCorrect, mdlGuesses.wrong())
            if(!newHiddenWord.includes('_')){
            /* game is won, return with new guesses state and won status */
                return new ServerGameModel(newMdlGuesses, mdlPlayers, newHiddenWord, GAMESTATUS.WON, _serverWord)
            }
            /* game is still playing, return with new guesses */
            const newMdlPlayers = new PlayersModel(mdlPlayers.players(),mdlPlayers.nextTurn())
            return new ServerGameModel(newMdlGuesses,newMdlPlayers, newHiddenWord, GAMESTATUS.PLAYING, _serverWord)
        }

        this.newModelFromWrongGuess = (guess) => {
            /* if we are here then there was an incorrect guess */
            const newWrong = mdlGuesses.wrong() + guess
            const newMdlGuesses = new GuessesModel(mdlGuesses.correct(), newWrong)
            if(newWrong.length === 6){
            /* sorry my guy, you lost */
                return new ServerGameModel(newMdlGuesses, mdlPlayers, this.word(), GAMESTATUS.LOST, _serverWord)
            }
            /* game is still playing, return with new guesses */
            const newMdlPlayers = new PlayersModel(mdlPlayers.players(),mdlPlayers.nextTurn())
            return new ServerGameModel(newMdlGuesses, newMdlPlayers, this.word(), GAMESTATUS.PLAYING, _serverWord)
        }

        this.guess = (guess) => {
            const invalidGuessError = this.didClientSendInvalidGuess(guess)
            if(invalidGuessError){
                return invalidGuessError
            }
            /* valid guess */
            if(_serverWord.includes(guess)){
                return this.newModelFromCorrectGuess(guess)/* correct */
            }
            return this.newModelFromWrongGuess(guess)/* wrong */
        }

        this.serverWord = () => {
            return _serverWord
        }
        const _serverWord = serverWord
    }
}