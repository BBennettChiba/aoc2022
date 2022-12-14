import run from "aocrunner";

const parseInput = (rawInput: string) => {
  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };
  const map = rawInput.split("\n").map((line, y) =>
    line.split("").map((char, x) => {
      if (char === "S" || char === "E") {
        if (char === "S") start = { x, y };
        if (char === "E") end = { x, y };
        return char === "S" ? 1 : 26;
      }
      return char.charCodeAt(0) - 96;
    }),
  );
  return { map, start, end };
};
type Map = ReturnType<typeof parseInput>["map"];

const part1 = (rawInput: string) => {
  const { start, end, map } = parseInput(rawInput);
  let finalPath = [];
  let queue = [];
  let visited = [`${start.x},${start.y}`];

  queue.push([start]);

  while (queue.length > 0 && finalPath.length == 0) {
    let path = queue.shift();
    let position: { x: number; y: number } = path![path!.length - 1];

    let directions = [
      { x: position.x + 1, y: position.y },
      { x: position.x, y: position.y + 1 },
      { x: position.x - 1, y: position.y },
      { x: position.x, y: position.y - 1 },
    ];

    for (let direction of directions) {
      if (
        direction.x < 0 ||
        direction.x >= map[0].length ||
        direction.y < 0 ||
        direction.y >= map.length ||
        visited.includes(`${direction.x},${direction.y}`) ||
        map[direction.y][direction.x] - map[position.y][position.x] > 1
      ) {
        continue;
      }

      if (direction.x == end.x && direction.y == end.y)
        finalPath = path!.concat([end]);
      visited.push(`${direction.x},${direction.y}`);
      queue.push(path!.concat([direction]));
    }
  }

  return finalPath.length - 1;
};

const part2 = (rawInput: string) => {
  const { end, map } = parseInput(rawInput);
  let finalPath = [];
  let queue = [];
  let visited = [`${end.x},${end.y}`];

  queue.push([end]);

  while (queue.length > 0 && finalPath.length == 0) {
    let path = queue.shift();
    let position: { x: number; y: number } = path![path!.length - 1];

    let directions = [
      { x: position.x + 1, y: position.y },
      { x: position.x, y: position.y + 1 },
      { x: position.x - 1, y: position.y },
      { x: position.x, y: position.y - 1 },
    ];

    for (let direction of directions) {
      if (
        direction.x < 0 ||
        direction.x >= map[0].length ||
        direction.y < 0 ||
        direction.y >= map.length ||
        visited.includes(`${direction.x},${direction.y}`) ||
        map[position.y][position.x] - map[direction.y][direction.x] > 1
      ) {
        continue;
      }

      if (map[direction.y][direction.x] === 1) finalPath = path!.concat([direction]);
      visited.push(`${direction.x},${direction.y}`);
      queue.push(path!.concat([direction]));
    }
  }

  return finalPath.length - 1;
};

run({
  part1: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
