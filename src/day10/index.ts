import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => (line.split(" ")[1] ? +line.split(" ")[1] : null));

const part1 = (rawInput: string) => {
  const instructions = parseInput(rawInput);
  let x = 1;
  let cycles = 0;
  const xHistory = [];
  for (const instruction of instructions) {
    cycles++;
    if (cycles % 40 === 20) xHistory.push(x * cycles);
    if (!instruction) continue;
    cycles++;
    if (cycles % 40 === 20) xHistory.push(x * cycles);
    x += +instruction;
  }
  return xHistory.reduce((acc, val, i) => acc + val, 0);
};

const part2 = (rawInput: string) => {
  const instructions = parseInput(rawInput);
  let x = 1;
  let cycles = 0;
  let output = "";

  function addPixel() {
    let position = cycles % 40;
    output += Math.abs(x - position) <= 1 ? "#" : " ";
    cycles++;
    if (cycles % 40 === 0) output += "\n";
  }

  for (const instruction of instructions) {
    addPixel();
    if (!instruction) continue;
    addPixel();
    x += +instruction;
  }
  console.log(output);
  return "RKPJBPLA";
};

run({
  part1: {
    tests: [
      {
        input: `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
