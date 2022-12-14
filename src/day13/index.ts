import run from "aocrunner";
import { log } from "console";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n\n")
    .map((pair) => pair.split("\n").map((p) => JSON.parse(p)));

type Pair = number[] | number[];

const isNumber = (el: number | number[]): el is number =>
  typeof el === "number";
const isArray = (el: number | number[]): el is number[] => Array.isArray(el);

const compare = (left: Pair | number, right: Pair | number): number => {
  if (isNumber(left) && isNumber(right)) return Math.sign(left - right);
  else if (isArray(left) && isNumber(right)) return compare(left, [right]);
  else if (isNumber(left) && isArray(right)) return compare([left], right);
  else if (isArray(left) && isArray(right)) {
    const min = Math.min(left.length, right.length);
    for (let i = 0; i < min; i++) {
      const el1 = left[i];
      const el2 = right[i];
      const result = compare(el1, el2);
      if (result === 0) continue;
      return result;
    }
    return Math.sign(left.length - right.length);
  }
  throw Error("something went wrong");
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let total = [];
  for (let i = 0; i < input.length; i++) {
    const [line1, line2] = input[i];
    if (compare(line1, line2) < 0) total.push(i + 1);
  }
  return total.reduce((a, v) => a + v, 0);
};

const parseInput2 = (rawInput: string) =>
  rawInput
    .split("\n")
    .filter((l) => l)
    .map((l) => JSON.parse(l));
const part2 = (rawInput: string) => {
  const input = parseInput2(rawInput);
  const key1 = [[2]];
  const key2 = [[6]];
  input.push(key1);
  input.push(key2);
  const sorted = input.sort((a, b) => compare(a, b));
  const indexOfKey1 = sorted.indexOf(key1) + 1;
  const indexOfKey2 = sorted.indexOf(key2) + 1;
  return indexOfKey1 * indexOfKey2;
};

run({
  part1: {
    tests: [
      {
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 13,
      },
      {
        input: `[[],1]
[[],2]

[[],2]
[[],1]

[[1],1]
[[1],2]

[[1],2]
[[1],1]`,
        expected: 4,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
