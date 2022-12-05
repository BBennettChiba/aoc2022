import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Elf = {
  min: number;
  max: number;
};

type Line = { elf1: Elf; elf2: Elf };

const contains = (line: Line) => {
  const { elf1, elf2 } = line;
  if (elf1.min <= elf2.min && elf1.max >= elf2.max) return true;
  if (elf2.min <= elf1.min && elf2.max >= elf1.max) return true;
  return false;
};

const overlap = (line: Line) => {
  const { elf1, elf2 } = line;
  return Math.max(elf1.min, elf2.min) <= Math.min(elf1.max, elf2.max);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n").map((line) => ({
    elf1: {
      min: +line.split(",")[0].split("-")[0],
      max: +line.split(",")[0].split("-")[1],
    },
    elf2: {
      min: +line.split(",")[1].split("-")[0],
      max: +line.split(",")[1].split("-")[1],
    },
  }));
  type Lines = typeof lines;
  type Line = Lines[number];
  let count = 0;
  for (const line of lines) {
    if (contains(line)) {
      count++;
    }
  }
  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n").map((line) => ({
    elf1: {
      min: +line.split(",")[0].split("-")[0],
      max: +line.split(",")[0].split("-")[1],
    },
    elf2: {
      min: +line.split(",")[1].split("-")[0],
      max: +line.split(",")[1].split("-")[1],
    },
  }));
  let count = 0;
  for (const line of lines) {
    if (overlap(line)) {
      count++;
    }
  }
  return count;
};

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

4 + "hello"