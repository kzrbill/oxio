
var game = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];

var Square = React.createClass({
  render: function() {
    return (
      <div className="square">{this.props.children}</div>
    );
  }
});


var Board = React.createClass({
    render: function() {
        var squares = this.props.game.map
        (function (squareContent) {
            return (
                <Square>
                    {squareContent}
                </Square>
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
  <Board game={game} />,
  document.getElementById('content')
);