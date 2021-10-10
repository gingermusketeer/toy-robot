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
  return x >= 0 && x <= 4 && y >= 0 && y <= 4;
}
enum Heading {
  NORTH = "NORTH",
  EAST = "EAST",
  SOUTH = "SOUTH",
  WEST = "WEST",
}
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
    const direction = Heading[directionStr];
    this.#position = [Number.parseInt(x), Number.parseInt(y), direction];
  }
  move(): void {
    const [x, y, direction] = this.#position;
    let newPosition;
    if (direction == Heading.NORTH) {
      newPosition = [x, y + 1, direction];
    } else if (direction == Heading.SOUTH) {
      newPosition = [x, y - 1, direction];
    } else if (direction == Heading.EAST) {
      newPosition = [x + 1, y, direction];
    } else if (direction == Heading.WEST) {
      newPosition = [x - 1, y, direction];
    }
    const [newX, newY] = newPosition;
    if (validatePosition(newX, newY)) {
      this.#position = newPosition;
    }
  }
  left(): void {
    const [x, y, direction] = this.#position;
    if (direction == Heading.NORTH) {
      this.#position = [x, y, Heading.WEST];
    } else if (direction == Heading.SOUTH) {
      this.#position = [x, y, Heading.EAST];
    } else {
      this.#position = [x, y, Heading.NORTH];
    }
  }
  right(): void {
    const [x, y, direction] = this.#position;
    if (direction == Heading.NORTH) {
      this.#position = [x, y, Heading.EAST];
    } else if (direction == Heading.EAST) {
      this.#position = [x, y, Heading.SOUTH];
    } else if (direction == Heading.SOUTH) {
      this.#position = [x, y, Heading.WEST];
    } else {
      this.#position = [x, y, Heading.NORTH];
    }
  }

  report(): string {
    return this.#position?.join(",");
  }
}
