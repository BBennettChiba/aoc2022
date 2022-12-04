import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const priorities = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
] as const;

type Priorities = typeof priorities[number];

const part1 = (rawInput: string) => {
  const splitStringInHalf = (str: string): [string, string] => {
    const half = Math.floor(str.length / 2);
    return [str.slice(0, half), str.slice(half)];
  };

  const input = parseInput(rawInput);
  const lines = input.split("\n").map(splitStringInHalf);

  let total = 0;
  const findCommon = (line1: string, line2: string) => {
    for (const char of line1) {
      for (const char2 of line2) {
        if (char === char2) return char as Priorities;
      }
    }
  };
  for (const [line1, line2] of lines) {
    total += priorities.indexOf(findCommon(line1, line2)!) + 1;
  }
  return total;
};

const part2 = (rawInput: string) => {
  const findCommon = (sack1: string, sack2: string, sack3: string) => {
    const sack1Arr = sack1.split("");
    const sack2Arr = sack2.split("");
    const sack3Arr = sack3.split("");
    for (const char of sack1Arr) {
      for (const char2 of sack2Arr) {
        for (const char3 of sack3Arr) {
          if (char === char2 && char3 === char) {
            return char as Priorities;
          }
        }
      }
    }
  };

  const input = parseInput(rawInput);
  const lines = input.split("\n");

  let total = 0;
  for (let i = 0; i < lines.length; i += 3) {
    const line1 = lines[i];
    const line2 = lines[i + 1];
    const line3 = lines[i + 2];
    total += priorities.indexOf(findCommon(line1, line2, line3)!) + 1;
  }
  return total;
};

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
