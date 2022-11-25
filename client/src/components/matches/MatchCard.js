const MatchCard = ({ name, sufix, goals }) => {
  // const imageUrl = require(`../../../src/img/flags/${sufix}.jpg`);
  return (
    <span>
      <div
        className="d-inline"
        style={{ width: "70px", height: "18px", overflow: "hidden" }}
      >
        {name}
      </div>
      <img
        className="ml-2 mr-2"
        // src={imageUrl}
        alt=""
        style={{ width: "26px" }}
      />
      {goals}
    </span>
  );
};

export default MatchCard;
