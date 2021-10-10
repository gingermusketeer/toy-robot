const ESC = "\u001B";
const CLEAR = `${ESC}[2J${ESC}[0;0f`;
const UP = `${ESC}[1A`;
const ERASE = `${ESC}[K`;
const SAVE_POSITION = `${ESC}7`;
const RESTORE_POSITION = `${ESC}8`;
const TABLE = "\n\n\n\n\n\n";
let previous = [];
const updates = [CLEAR, TABLE];

function parseLine(line: string) {
  const [xStr, yStr] = line.split(",");
  const validInput = xStr.match(/^\d+$/) && yStr.match(/^\d+$/);
  if (!validInput) {
    return [];
  }
  const x = Number.parseInt(xStr);
  const y = Number.parseInt(yStr);
  return [x, y];
}

function determineUpdates(line: string) {
  const [x, y] = parseLine(line);
  if (x == null || y == null) {
    return;
  }

  // Value reported twice means a new letter
  if (previous[0] === x && previous[1] === y) {
    updates.push(TABLE);
  } else {
    const moveToRow = `${ESC}[${y + 1}A`;
    const moveToColumn = `${ESC}[${x + 1}C`;
    updates.push(
      `${SAVE_POSITION}${moveToRow}${moveToColumn}x${RESTORE_POSITION}`
    );
  }
  previous = [x, y];
}

const input = process.stdin;
input.on("data", (data) => {
  const str = data.toString();
  const lines = str.split("\n");
  lines.forEach(determineUpdates);
});

let done = false;
input.on("close", () => {
  done = true;
});

let timer;
function showUpdates() {
  const update = updates.shift();
  if (update) {
    process.stdout.write(update);
  } else if (done) {
    return;
  }
  setTimeout(showUpdates, 100);
}

showUpdates();
