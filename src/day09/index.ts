import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => ({
    dir: line.split(" ")[0],
    paces: +line.split(" ")[1],
  })) as { dir: Direction; paces: number }[];

type Coords = { x: number; y: number };

type Current = {
  head: () => Coords;
  tail: () => Coords;
  steps: number;
  rope: Coords[];
};

type Direction = "U" | "D" | "L" | "R";
type Move = ReturnType<typeof parseInput>[number];

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const current = {
    tail: function () {
      return this.rope[this.rope.length - 1];
    },
    head: function () {
      return this.rope[0];
    },
    steps: 0,
    rope: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  };
  const visitedTailPosition = new Set([JSON.stringify(current.tail())]);
  for (const move of input) {
    makeMove(move, current, visitedTailPosition);
  }
  return visitedTailPosition.size;
};

const moveChart = (
  current: Current,
  dir: Direction,
  visitedTailPosition: Set<string>,
) => {
  current.steps++;
  if (dir === "U") {
    current.head().y--;
  }
  if (dir === "D") {
    current.head().y++;
  }
  if (dir === "R") {
    current.head().x++;
  }
  if (dir === "L") {
    current.head().x--;
  }
  for (let i = 1; i < current.rope.length; i++) {
    let knotAhead = current.rope[i - 1];
    let thisKnot = current.rope[i];
    if (
      Math.abs(knotAhead.x - thisKnot.x) >= 2 ||
      Math.abs(knotAhead.y - thisKnot.y) >= 2
    ) {
      thisKnot.x += Math.sign(knotAhead.x - thisKnot.x);
      thisKnot.y += Math.sign(knotAhead.y - thisKnot.y);
    }
  }
  visitedTailPosition.add(JSON.stringify(current.tail()));
};

const makeMove = (
  move: Move,
  current: Current,
  visitedTailPosition: Set<string>,
) => {
  for (let i = 0; i < move.paces; i++) {
    moveChart(current, move.dir, visitedTailPosition);
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const current = {
    tail: function () {
      return this.rope[this.rope.length - 1];
    },
    head: function () {
      return this.rope[0];
    },
    steps: 0,
    rope: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  };
  const visitedTailPosition = new Set([JSON.stringify(current.tail())]);
  for (const move of input) {
    makeMove(move, current, visitedTailPosition);
  }
  return visitedTailPosition.size;
};

run({
  part1: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
