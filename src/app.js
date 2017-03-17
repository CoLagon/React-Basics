var PLAYERS = [
  {
    id: 1,
    name: "Cole Logan",
    score: 20
  },
  {
    id: 2,
    name: "Grant Logan",
    score: 24
  },
  {
    id: 3,
    name: "Brad Logan",
    score: 22
  }
];
var nextId = 4;
/*************ADD PLAYER SECTION********************************/
var AddPlayer = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      name: "",
    }
  },
  onNameChange: function(e) {
    this.setState({name: e.target.value});

  },
  onSubmit: function(e) {
    e.preventDefault();

    this.props.onAdd(this.state.name);
    this.setState({name: ""})
  },
  render: function() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
})
/***********************END OF ADDPLAYER*********************************/
/*****************STATS SECTION**************************************/
function Stats(props) {
  console.log(props);
  // var total = 0;
  var totalPlayers = props.players.length;
  // props.players.forEach(function(player) {
  //    total += player.score;
  // });
  var totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  );
}
Stats.propTypes = {
  players: React.PropTypes.array.isRequired
}

/*******************END OF STATS**********************************************/
/******************HEADER SECTION***************************/
function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired
};
Header.defaultProps = {
    title: "scoreboard"
};
/******************END OF HEADER******************************************/

/***********************COUNTER SECTION***********************************/
function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function() {props.onChange(-1);}}> - </button>
        <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function() {props.onChange(1);}}> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}
/**********************END OF COUNTER*******************************************/

/***********************PLAYER SECTION*********************************************/
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>x</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
}
/***********************END OF PLAYER************************************************/

/************************APP SECTION************************************************/
var Application = React.createClass({
  propTypes: {
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired
    })).isRequired
  },
  getInitialState: function() {
    return {
      players: this.props.initialPlayers
    };
  },

  onPlayerAdd: function(name) {
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId,
    });
    this.setState(this.state);
    nextId += 1;
  },
  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  },
  onRemovePlayer: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.states);
  },
  render: function() {
    return (
      <div className="scoreboard">
        <Header players={this.state.players} />
        <div className="players">
          {this.state.players.map(function(player, index) {
            return <Player onRemove={function() {this.onRemovePlayer(index)}.bind(this)}
                           onScoreChange={function(delta) {this.onScoreChange(index,delta)}.bind(this)}
                           key={player.id}
                           name={player.name}
                           score={player.score} />
          }.bind(this))}
        </div>
        <AddPlayer onAdd={this.onPlayerAdd}/>
      </div>
    );
  }
});


/********************END OF APP******************************************************/
/********************MY NOTES*******************************************************

<AddPlayer onAdd={this.onPlayerAdd} />

-AddPlayer is the object or function we are rendering or calling upon

-onAdd is the prop/props we are passing to it

-this.onPlayerAdd is the props theat AddPlayer can now use inside it's code block/scope
*********************END OF NOTES********************************************************/



ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));
