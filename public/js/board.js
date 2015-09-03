
Array.prototype.nextLoopValue = function(value, onNextFound, onNotFound)
{
  index = this.indexOf(value);

  if (index < 0) {
    onNotFound();
  }

  var nextIndex = index == this.length - 1 ? 0 : index + 1;
  onNextFound(this[nextIndex]);    
}

function getNextMark(currentMark)
{
    var nextMark = ' ';
    var marks = [' ', 'O', 'X'];
    marks.nextLoopValue(
        currentMark,
        function(nextValue){
            nextMark = nextValue;
        });

    return nextMark;
}

var Square = React.createClass({
  childHandleClick: function(event, reactSquareIndex){

    var index = reactSquareIndex.slice(-1);
    this.props.onSquareClick(index);

    console.log(this.props);
    console.log(event);
  },
  render: function() {
    return (
      <div onClick={this.childHandleClick} className="square">{this.props.mark}</div>
    );
  }
});

var socket = io();

var Board = React.createClass({
    getInitialState: function() {
        return {game: [
            {id: 0, mark: ' '},
            {id: 1, mark: ' '},
            {id: 2, mark: ' '},
            {id: 3, mark: ' '},
            {id: 4, mark: ' '},
            {id: 5, mark: ' '},
            {id: 6, mark: ' '},
            {id: 7, mark: ' '},
            {id: 8, mark: ' '},
            ]};
    },
    componentDidMount :function()
    {   
        var board = this;
        socket.on('gameStateUpdate', function(game){
            board.setState({game: game});
        });
    },
    parentHandleClick: function(squareIndex) {

        var game = this.state.game;

        var currentSquare = game[squareIndex];
        game[squareIndex] = {id: currentSquare.id, mark: getNextMark(currentSquare.mark)};

        this.setState({game: game});
        this.updateSocketWithGameState();
    },
    updateSocketWithGameState: function () {
        socket.emit('gameStateUpdate', this.state.game);
    },
    render: function() {

        // [Assign to variable as will lose context from this in map function]
        var parentHandleClick = this.parentHandleClick;

        var squares = this.state.game.map(
            function (square) {
            return (
                <Square key={square.id} mark={square.mark} onSquareClick={parentHandleClick} />
            );
        });

        return (
          <div className="commentList">
            {squares}
          </div>
        );
    }
});

React.render(
  <Board />,
  document.getElementById('board')
);
