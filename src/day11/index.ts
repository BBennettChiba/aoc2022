import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n\n")
    .map((line) => line.split("\n").map((l) => l.split(":")))
    .map((val) => {
      const items = val[1][1].split(", ").map(Number);
      const operation = val[2][1].includes("*") ? "MULTIPLY" : "ADD";
      const operationValue = +val[2][1].match(/\d+/g)! || null;
      const test = +val[3][1].split(" ")[3];
      const ifTrueThrowTo = +val[4][1].split(" ")[4];
      const ifFalseThrowTo = +val[5][1].split(" ")[4];
      const count = 0;
      return {
        items,
        operation: (num: number) => opTable[operation](num, operationValue),
        test,
        ifFalseThrowTo,
        ifTrueThrowTo,
        count,
      };
    });

type Monkey = ReturnType<typeof parseInput>[number];
type Item = Monkey["items"][number];

const opTable = {
  ADD: (a: number, b: number | null) => (b ? b + a : a + a),
  MULTIPLY: (a: number, b: number | null) => (b ? b * a : a * a),
};

const part1 = (rawInput: string) => {
  const monkeys = parseInput(rawInput);
  const rounds = 20;
  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      const inspectingItems = monkey.items;
      let item;
      while ((item = inspectingItems.shift())) {
        monkey.count++;
        item = Math.floor(monkey.operation(item) / 3);
        const nextMonkey =
          item % monkey.test === 0
            ? monkey.ifTrueThrowTo
            : monkey.ifFalseThrowTo;
        monkeys[nextMonkey].items.push(item);
      }
    }
  }
  monkeys.sort((a, b) => b.count - a.count);
  return monkeys[0].count * monkeys[1].count;
};

const part2 = (rawInput: string) => {
  const monkeys = parseInput(rawInput);
  const rounds = 10000;
  const mod = monkeys.reduce((acc, val) => acc * val.test, 1);
  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      const inspectingItems = monkey.items;
      let item;
      while ((item = inspectingItems.shift())) {
        item = item % mod;
        monkey.count++;
        item = monkey.operation(item);
        const nextMonkey =
          item % monkey.test === 0
            ? monkey.ifTrueThrowTo
            : monkey.ifFalseThrowTo;
        monkeys[nextMonkey].items.push(item);
      }
    }
  }
  monkeys.sort((a, b) => b.count - a.count);
  return monkeys.slice(0, 2).reduce((acc, val) => acc * val.count, 1);
};

run({
  part1: {
    tests: [
      {
        input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
