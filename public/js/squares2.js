
// Array.prototype.nextLoopValue = function(value, onNextFound, onNotFound)
// {
//   index = this.indexOf(value);

//   if (index < 0) {
//     onNotFound();
//   }

//   var nextIndex = index == this.length - 1 ? 0 : index + 1;
//   onNextFound(this[nextIndex]);    
// }

// function getNextMark(currentMark)
// {
//     var nextMark = '-';
//     var marks = ['-', 'O', 'X'];
//     marks.nextLoopValue(
//         nextMark,
//         function(nextValue){
//             nextMark = nextValue;
//         });

//     return nextMark;
// }

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

var Board = React.createClass({
    getInitialState: function() {
        return {game: [{id: 0, mark: '-'}, {id: 1, mark: '-'}, {id: 2, mark: '-'}]};
    },
    parentHandleClick: function(squareIndex) {

        var game = this.state.game;
        game[squareIndex] = {id: squareIndex, mark: 'X'};

        this.setState({game: game});

        // TODO - now pass game to socket IO
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
  document.getElementById('content')
);