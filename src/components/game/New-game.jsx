import { v4 } from "uuid";
import { useHistory } from "react-router";


export default function NewGame() {
  const history = useHistory();
  return (
    <div>
      <button
        onClick={() => {
          history.push(`/game/${v4()}`);
        }}
      >
        Create game
      </button>
    </div>
  );
}
