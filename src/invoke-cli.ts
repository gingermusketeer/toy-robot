import Cli from "./cli.js";
const args = process.argv.slice(2);
const cli = new Cli(args, process.stdin, process.stdout);
cli.run();
