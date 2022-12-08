import run from "aocrunner";
import { log } from "console";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((l) =>
      l.split("").map((n) => ({ height: +n, visible: false, scenicScore: 1 })),
    );

type Input = ReturnType<typeof parseInput>;
const isVisible = (
  yIndex: number,
  xIndex: number,
  twoDArray: Input,
  direction: "N" | "E" | "S" | "W",
): boolean => {
  const original = twoDArray[yIndex][xIndex];
  let x = xIndex;
  let y = yIndex;
  switch (direction) {
    case "N":
      y--;
      while (y >= 0) {
        const next = twoDArray[y][xIndex];
        if (next.height >= original.height) return false;
        y--;
      }
      original.visible = true;
      return true;
    case "E":
      x++;
      while (x < twoDArray[yIndex].length) {
        let next = twoDArray[yIndex][x];
        if (next.height >= original.height) return false;
        x++;
      }
      original.visible = true;
      return true;
    case "S":
      y++;
      while (y < twoDArray.length) {
        let next = twoDArray[y][xIndex];
        if (next.height >= original.height) return false;
        y++;
      }
      original.visible = true;
      return true;
    case "W":
      x--;
      while (x >= 0) {
        let next = twoDArray[yIndex][x];
        if (next.height >= original.height) return false;
        x--;
      }
      original.visible = true;
      return true;
  }
};

const checkVisibility = (
  yIndex: number,
  xIndex: number,
  twoDArray: Input,
): boolean => {
  const Directions = ["N", "E", "S", "W"] as const;
  for (const dir of Directions) {
    if (isVisible(yIndex, xIndex, twoDArray, dir)) return true;
  }
  return false;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let total = 0;
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      const el = input[y][x];
      if (!el.visible && checkVisibility(y, x, input)) total++;
    }
  }
  return total;
};

const mapScenicScore = (
  yIndex: number,
  xIndex: number,
  input: Input,
  direction: "N" | "E" | "S" | "W",
) => {
  const original = input[yIndex][xIndex];
  let x = xIndex;
  let y = yIndex;
  let trees = 0;
  switch (direction) {
    case "N":
      y--;
      while (y >= 0) {
        trees++;
        const next = input[y][xIndex];
        if (next.height >= original.height) return trees;
        y--;
      }
      return trees;
    case "E":
      x++;
      while (x < input[yIndex].length) {
        trees++;
        original.scenicScore++;
        let next = input[yIndex][x];
        if (next.height >= original.height) return trees;
        x++;
      }
      return trees;
    case "S":
      y++;
      while (y < input.length) {
        trees++;
        original.scenicScore++;
        let next = input[y][xIndex];
        if (next.height >= original.height) return trees;
        y++;
      }
      return trees;
    case "W":
      x--;
      while (x >= 0) {
        trees++;
        original.scenicScore++;
        let next = input[yIndex][x];
        if (next.height >= original.height) return trees;
        x--;
      }
      return trees;
  }
};

const loopDirections = (yIn: number, xIn: number, input: Input) => {
  const Directions = ["N", "E", "S", "W"] as const;
  let totalScore = 1;
  for (const dir of Directions) {
    totalScore *= mapScenicScore(yIn, xIn, input, dir);
  }
  input[yIn][xIn].scenicScore = totalScore;
  return false;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      const el = input[y][x];
      loopDirections(y, x, input);
    }
  }

  return Math.max(
    ...input.map((row) => Math.max(...row.map((el) => el.scenicScore))),
  );
};

run({
  part1: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
