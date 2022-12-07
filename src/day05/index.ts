import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getColumns = (rows: string[]): string[][] => {
  const output = [];
  for (const row of rows) {
    const col = [];
    for (let i = 0; i < row.length; i += 4) {
      col.push(row.substring(i, i + 3));
    }
    output.push(col);
  }
  return output;
};

const moveCol = (
  diagram: string[][],
  from: number,
  to: number,
  howMany?: number,
) => {
  const actualFrom = diagram.length - from;
  const actualTo = diagram.length - to;
  const fromCol = diagram[actualFrom];
  const toCol = diagram[actualTo];
  if (howMany) {
    const stack = [];
    for (let i = 0; i < howMany; i++) {
      stack.push(fromCol.shift());
    }
    for (let i = 0; i < howMany; i++) {
      toCol.unshift(stack.pop()!);
    }
  }
  if (!howMany) {
    toCol.unshift(fromCol.shift()!);
  }
};

const rotateMatrixAntiClockwise = (dArr: string[][]) => {
  const output = [];
  for (let i = dArr[0].length - 1; i >= 0; i--) {
    let row = [];
    for (let j = dArr.length - 1; j >= 0; j--) {
      let el = dArr[j][i];
      el.trim() !== "" && row.unshift(dArr[j][i]);
    }
    output.push(row);
  }
  return output;
};

const mapLineToObj = (
  line: string,
): { howMany: number; from: number; to: number } => {
  const [_, howMany, __, from, ___, to] = line.split(" ");
  return { howMany: +howMany, from: +from, to: +to };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const diagram = getColumns(input.split("\n\n")[0].split("\n"));
  const moves = input.split("\n\n")[1].split("\n").map(mapLineToObj);
  const rotated = rotateMatrixAntiClockwise(diagram);
  for (const move of moves) {
    for (let i = 0; i < move.howMany; i++) {
      moveCol(rotated, move.from, move.to);
    }
  }
  return rotated
    .map((col) => col.shift()?.match(/\w/g))
    .reverse()
    .join("");
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const diagram = getColumns(input.split("\n\n")[0].split("\n"));
  const moves = input.split("\n\n")[1].split("\n").map(mapLineToObj);
  const rotated = rotateMatrixAntiClockwise(diagram);
  for (const move of moves) {
    moveCol(rotated, move.from, move.to, move.howMany);
  }
  return rotated
    .map((col) => col.shift()?.match(/\w/g))
    .reverse()
    .join("");
};

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
