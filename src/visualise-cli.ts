const CLEAR = "\u001B[2J\u001B[0;0f";

function initialState() {
  return [
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
  ];
}

let state = initialState();
let last = [];
const updates = [];

function processLine(line: string) {
  const [xStr, yStr] = line.split(",");
  const validInput = xStr.match(/^\d+$/) && yStr.match(/^\d+$/);
  if (!validInput) {
    return;
  }
  const x = Number.parseInt(xStr);
  const y = Number.parseInt(yStr);
  state[y][x] = "X";

  // Clear state if the same value is reported twice.
  if (last[0] === x && last[1] === y) {
    state = initialState();
  }
  last = [x, y];
  updates.push(
    state
      .slice(0)
      .reverse()
      .map((row) => row.join(""))
      .join("\n") + "\n"
  );
}

const input = process.stdin;
input.on("data", (data) => {
  const str = data.toString();
  const lines = str.split("\n");
  lines.forEach(processLine);
});
let done = false;
input.on("close", () => {
  done = true;
});

let timer;
function showUpdates() {
  const update = updates.shift();
  if (update) {
    process.stdout.write(CLEAR);
    process.stdout.write(update);
  } else if (done) {
    return;
  }
  setTimeout(showUpdates, 200);
}

showUpdates();
