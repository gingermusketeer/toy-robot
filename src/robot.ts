// Table is 5x5 so we limit the x and y to be between 0 and 4
const MAX_INDEX = 4;

enum Command {
  MOVE = "MOVE",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  REPORT = "REPORT",
  PLACE = "PLACE",
}

function parseTask(task): [Command | null, string | null] {
  const [commandStr, args] = task.split(" ");
  return [Command[commandStr], args];
}

function validatePosition(x: number, y: number): boolean {
  return x >= 0 && x <= MAX_INDEX && y >= 0 && y <= MAX_INDEX;
}

enum Heading {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}
const HEADINGS = ["NORTH", "EAST", "SOUTH", "WEST"];
type Position = [number, number, Heading];

export default class Robot {
  #position: Position | null = null;

  perform(task: string): string | null {
    const [command, args] = parseTask(task);
    const ignoreCommand = this.#position == null && command != Command.PLACE;
    if (command == null || ignoreCommand) {
      return null;
    }
    return this[command.toLowerCase()](args);
  }

  place(args: string | null): void {
    const [x, y, directionStr] = args.split(",");
    const direction = HEADINGS.indexOf(directionStr);
    this.#position = [Number.parseInt(x), Number.parseInt(y), direction];
  }
  move(): void {
    const [x, y, direction] = this.#position;
    let yModifier = 0;
    let xModifier = 0;
    if (direction % 2 === 0) {
      // Heading north or south
      yModifier = direction == Heading.NORTH ? 1 : -1;
    } else {
      // Heading east or west
      xModifier = direction == Heading.EAST ? 1 : -1;
    }
    let newPosition: Position = [x + xModifier, y + yModifier, direction];
    const [newX, newY] = newPosition;
    if (validatePosition(newX, newY)) {
      this.#position = newPosition;
    }
  }
  left(): void {
    const [x, y, direction] = this.#position;
    const newDirection = direction === 0 ? HEADINGS.length - 1 : direction - 1;
    this.#position = [x, y, newDirection];
  }

  right(): void {
    const [x, y, direction] = this.#position;
    const newDirection = (direction + 1) % HEADINGS.length;
    this.#position = [x, y, newDirection];
  }

  report(): string {
    if (this.#position == null) {
      return "";
    }
    const [x, y, direction] = this.#position;
    return `${x},${y},${HEADINGS[direction]}`;
  }
}
