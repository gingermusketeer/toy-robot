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

test("robot can rotate in a clockwise circle", (t) => {
  const r = new Robot();
  r.perform("PLACE 0,0,NORTH");

  r.perform("RIGHT");
  t.is(r.perform("REPORT"), "0,0,EAST");

  r.perform("RIGHT");
  t.is(r.perform("REPORT"), "0,0,SOUTH");

  r.perform("RIGHT");
  t.is(r.perform("REPORT"), "0,0,WEST");

  r.perform("RIGHT");
  t.is(r.perform("REPORT"), "0,0,NORTH");
});

test("robot can rotate in an anticlockwise circle", (t) => {
  const r = new Robot();
  r.perform("PLACE 0,0,NORTH");

  r.perform("LEFT");
  t.is(r.perform("REPORT"), "0,0,WEST");

  r.perform("LEFT");
  t.is(r.perform("REPORT"), "0,0,SOUTH");

  r.perform("LEFT");
  t.is(r.perform("REPORT"), "0,0,EAST");

  r.perform("LEFT");
  t.is(r.perform("REPORT"), "0,0,NORTH");
});

test("robot can avoid destruction", (t) => {
  const r = new Robot();
  r.perform("PLACE 0,0,WEST");
  r.perform("MOVE");

  t.is(r.perform("REPORT"), "0,0,WEST");
});

test("robot ingores invalid positions", (t) => {
  const r = new Robot();
  r.perform("PLACE 0,0,WEST");
  r.perform("PLACE 0,0,pizza");

  t.is(r.perform("REPORT"), "0,0,WEST");
});
