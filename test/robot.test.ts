import test from "ava";
import Robot from "../src/robot.js";

test("robot placement", (t) => {
  const r = new Robot();
  r.perform("PLACE 0,0,NORTH");

  t.is(r.perform("REPORT"), "0,0,NORTH");
});

test("unplaced robot ignores commands", (t) => {
  const r = new Robot();
  r.perform("MOVE");

  t.is(r.perform("REPORT"), null);
});

test("robot can move", (t) => {
  const r = new Robot();
  r.perform("PLACE 0,0,NORTH");
  r.perform("MOVE");

  t.is(r.perform("REPORT"), "0,1,NORTH");
});

test("robot can rotate", (t) => {
  const r = new Robot();
  r.perform("PLACE 0,0,NORTH");
  r.perform("RIGHT");

  t.is(r.perform("REPORT"), "0,0,EAST");
});

test("robot can avoid destruction", (t) => {
  const r = new Robot();
  r.perform("PLACE 0,0,WEST");
  r.perform("MOVE");

  t.is(r.perform("REPORT"), "0,0,WEST");
});
