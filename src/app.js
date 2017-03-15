function Application(props) {
  return (
    <div className="scoreboard">
      <div className="header">
        <h1>{props.title}</h1>
      </div>

      <div className="players">
        <div className="player">
          <div className="player-name">
            Cole Logan
          </div>
          <div className="player-score">

          </div>
          <div className="counter">
            <button className="counter-action decrement"> - </button>
              <div className="counter-score"> 20 </div>
            <button className="counter-action increment"> + </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Application.propTypes = {
  title: React.PropTypes.string.isRequired
};

Application.defaultProps = {
  title: "scoreboard"
};

ReactDOM.render(<Application />, document.getElementById('container'));
