# Toy Robot

A simple 5x5 table top toy robot simulator.

## Getting started

1. Clone the repository.
1. Install dependencies with: `npm install`.
1. Run the robot with example commands `./bin/toy-robot example.txt`.

## Commands

The robot supports the following commands:

- `PLACE X,Y,F`: Place the robot on the table top at position X,Y facing F. F is either `NORTH`, `SOUTH`, `EAST` or `WEST`.
- `MOVE`: Move the robot one unit forward in the direction it is facing.
- `LEFT`: Turn the robot 90 degrees to the left.
- `RIGHT`: Turn the robot 90 degrees to the right.
- `REPORT`: Report the current position of the robot.

## Robot visualization

To help see where the robot is `./bin/visualise` can be used. This script makes two assumptions:

- All movements are followed by a `REPORT` command.
- If the same position is reported twice then the robot is moved to a new table.

## Development

To run the tests you can either run `npm test` or `npm test -- --watch` to have the tests rerun every time you save a file.
