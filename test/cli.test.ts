import test from "ava";
import Cli from "../src/cli.js";
import * as stream from "stream";
import * as fs from "fs";

function runWithArgs(...args): Promise<string[]> {
  const inStream = new stream.PassThrough();
  const outStream = new stream.PassThrough();
  return runCli(new Cli(args, inStream, outStream), outStream);
}

function runWithFileStream(path): Promise<string[]> {
  const inStream = fs.createReadStream(path);
  const outStream = new stream.PassThrough();
  return runCli(new Cli([], inStream, outStream), outStream);
}

function runCli(cli: Cli, outStream): Promise<string[]> {
  return new Promise((resolve, reject) => {
    cli.run();
    let data = "";
    outStream.on("data", (d) => {
      data += d.toString();
    });
    outStream.on("close", () => {
      resolve(data.split("\n").filter((s) => s.length > 0));
    });
    outStream.on("error", (err) => {
      reject(err);
    });
  });
}

test("file with input", async (t) => {
  const outLines = await runWithArgs("test/fixtures/simple.txt");

  t.deepEqual(outLines, ["3,3,EAST", "3,1,SOUTH", "1,1,WEST", "1,3,NORTH"]);
});

test("too many args", async (t) => {
  const error = await t.throwsAsync(async () => runWithArgs("one", "too many"));
  t.is(error.message, "expected 1 argument got 2");
});

test("input is streamed in", async (t) => {
  const outLines = await runWithFileStream("test/fixtures/simple.txt");

  t.deepEqual(outLines, ["3,3,EAST", "3,1,SOUTH", "1,1,WEST", "1,3,NORTH"]);
});
