import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const containsEachOther = (input: string) => {
  for (let i = 0; i < input.length - 1; i++) {
    const char1 = input.charAt(i);
    for (let j = i + 1; j < input.length; j++) {
      const char2 = input.charAt(j);
      if (char1 === char2 && i !== j) {
        return true;
      }
    }
  }
  return false;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const num = 4;
  for (let i = 0; i < input.length - num; i++) {
    const slice = input.slice(i, i + num);
    if (!containsEachOther(slice)) {
      return i + num;
    }
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const num = 14;
  for (let i = 0; i < input.length - num; i++) {
    const slice = input.slice(i, i + num);
    if (!containsEachOther(slice)) {
      return i + num;
    }
  }
  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
      //   expected: 5,
      // },
      // {
      //   input: `nppdvjthqldpwncqszvftbrmjlhg`,
      //   expected: 6,
      // },
      // {
      //   input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
      //   expected: 10,
      // },
      // {
      //   input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
      //   expected: 11,
      // },
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
