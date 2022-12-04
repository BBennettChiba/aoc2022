import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input
    .split(/\n\n/)
    .map((line) =>
      line
        .split("\n")
        .map((l) => Number(l))
        .reduce((acc, val) => acc + val, 0),
    )
    .sort((a, b) => b - a);
  return lines[0];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input
    .split(/\n\n/)
    .map((line) =>
      line
        .split("\n")
        .map((l) => Number(l))
        .reduce((acc, val) => acc + val, 0),
    )
    .sort((a, b) => b - a);

  return lines[0] + lines[1] + lines[2];
};

run({
  part1: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
