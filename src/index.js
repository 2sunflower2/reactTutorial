import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props){
  return(
    <button
    className='square'
    onClick={()=>props.onClick()}
    >
      {props.value}
    </button>
  )
}
class Board extends React.Component{
    renderSquare(i) {
      return <Square value={this.props.squares[i]}
                     onClick={()=>this.props.onClick(i)}
             />;
    }
    render(){
      return(
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history:[{square: Array(9).fill(null),
                isXNext:true}],
        currentSquare: Array(9).fill(null),
        isXNext: true,
        stepNumber: 0,
      }
    }
    handleclick(i){
      const winner = calculateWinner(this.state.currentSquare);
      if (winner || this.state.currentSquare[i]){
        return;
      }
      const currentSquare= this.state.currentSquare.slice();
      currentSquare[i] = this.state.isXNext? "X" : "O";
      const isXNext = !this.state.isXNext;
      const history = this.state.history.slice(0, this.state.stepNumber+1).concat([{square: currentSquare, isXNext:isXNext}])
      this.setState({isXNext:isXNext,
         stepNumber:(this.state.stepNumber + 1),
         currentSquare: currentSquare, 
         history: history});
    }
    jumpTo(i){
      this.setState({
        stepNumber: i,
        currentSquare: this.state.history[i].square,
        isXNext: this.state.history[i].isXNext,
      })
    }
    render() {
      let status;
      const winner = calculateWinner(this.state.currentSquare);
      if (winner){
        status = 'Winner: ' + winner; 
      } else {
      status = 'Next player: ' + (this.state.isXNext? 'X' : 'O');
      }
      const moves = this.state.history.map((step, move) => {
        const words = move? ('Move to #' + move) : 'Start new game';
        return (
          <li key={move}>
            <button onClick={()=>{
              return this.jumpTo(move);
            }}>
              {words}
            </button>
          </li>
        )
      });
      return (
        <div className="game">
          <div className="game-board">
            <Board onClick={(i)=>this.handleclick(i)} squares={this.state.currentSquare}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  