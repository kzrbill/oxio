/** @jsx React.DOM */

// TODO: How to use prototypes in react components?
Array.prototype.nextLoopValue = function(value, onNextFound, onNotFound)
{
  index = this.indexOf(value);

  if (index < 0) {
    onNotFound();
  }

  var nextIndex = index == this.length - 1 ? 0 : index + 1;
  onNextFound(this[nextIndex]);    
}

var Square = React.createClass({
  getInitialState: function() {
    return {mark: '-'};
  },
  handleClick: function(event) {
    this.setState({mark: this.nextMark()});
  },
  nextMark: function ()
  {
    var marks = ['-', 'O', 'X'];
    var nextMark = '';
    marks.nextLoopValue(
      this.state.mark,
      function(nextValue){
        nextMark = nextValue;
      }
    );
    return nextMark;
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className="square">{this.state.mark}</div>
    );
  }
});

var Board = React.createClass({
  render: function() {
    return (
      <div className="board">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
    );
  }
});


React.render(
  <Board />,
  document.getElementById('content')
);
