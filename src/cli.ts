import * as stream from "stream";
import * as fs from "fs";
import Robot from "./robot.js";

function parseArgs(args: string[]) {
  if (args.length == 1) {
    return fs.createReadStream(args[0]);
  }
  if (args.length > 1) {
    throw new Error(`expected 1 argument got ${args.length}`);
  }
}

export default class Cli {
  #robot: Robot = new Robot();
  #inStream: stream.Readable;
  #outStream: stream.Writable;

  constructor(
    args: string[],
    inStream: stream.Readable,
    outStream: stream.Writable
  ) {
    const fileStream = parseArgs(args);
    if (fileStream) {
      this.#inStream = fileStream;
    } else {
      this.#inStream = inStream;
    }
    this.#outStream = outStream;
  }

  run(): void {
    this.#inStream.on("data", (data: Buffer) => {
      const dataStr = data.toString("utf-8");
      const lines = dataStr.split("\n");
      lines.forEach((line) => {
        const result = this.#robot.perform(line);
        if (result) {
          this.#outStream.write(`${result}\n`);
        }
      });
    });
    this.#inStream.on("end", () => {
      this.#outStream.end();
    });
  }
}
