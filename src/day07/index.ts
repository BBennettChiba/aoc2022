import run from "aocrunner";

type Directory = {
  [name: string]: File | Directory;
};

type File = {
  size: number;
};

const parseInput = (rawInput: string) => rawInput.split("\n");

const getCurrent = (indices: string[], system: Directory) => {
  let current = system;
  for (const level of indices) {
    current = current[level] as Directory;
  }
  return current;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const currentDir = [];
  const system: Directory = {
    "/": {},
  };
  for (const line of input) {
    let current = getCurrent(currentDir, system);
    if (line.startsWith("$ cd")) {
      const dir = line.split(" ")[2];
      if (dir === "..") {
        currentDir.pop();
      } else {
        currentDir.push(dir);
      }
    } else if (line.startsWith("$ ls")) {
    } else if (line.startsWith("dir")) {
      const name = line.split(" ")[1];
      current[name] = {};
    } else {
      const [size, name] = line.split(" ");
      current[name] = { size: +size };
    }
  }
  const sizes: number[] = [];
  const getDirectoriesBySize = (directory: Directory): number => {
    let keys = Object.keys(directory);
    let totalSize = 0;
    for (const key of keys) {
      const size = directory[key].size;
      if (size && typeof size === "number") totalSize += size;
      else totalSize += getDirectoriesBySize(directory[key] as Directory);
    }
    if (totalSize < 100000) sizes.push(totalSize);
    return totalSize;
  };
  getDirectoriesBySize(system);
  return sizes.reduce((a, b) => a + b, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const currentDir = [];
  const system: Directory = {
    "/": {},
  };
  for (const line of input) {
    let current = getCurrent(currentDir, system);
    if (line.startsWith("$ cd")) {
      const dir = line.split(" ")[2];
      if (dir === "..") {
        currentDir.pop();
      } else {
        currentDir.push(dir);
      }
    } else if (line.startsWith("$ ls")) {
    } else if (line.startsWith("dir")) {
      const name = line.split(" ")[1];
      current[name] = {};
    } else {
      const [size, name] = line.split(" ");
      current[name] = { size: +size };
    }
  }
  const sizes: Record<string, number> = {};
  const getDirectoriesBySize = (directory: Directory): number => {
    let keys = Object.keys(directory);
    let totalSize = 0;
    for (const key of keys) {
      const size = directory[key].size;
      if (size && typeof size === "number") totalSize += size;
      else {
        totalSize += getDirectoriesBySize(directory[key] as Directory);
        sizes[key] = getDirectoriesBySize(directory[key] as Directory);
      }
    }

    return totalSize;
  };
  getDirectoriesBySize(system);
  const sizesBiggerThanX = [];
  for (let key in sizes) {
    if (sizes[key] >= 8381165) {
      sizesBiggerThanX.push(sizes[key]);
    }
  }
  sizesBiggerThanX.sort((a, b) => a - b);
  console.log(sizesBiggerThanX);
  return sizesBiggerThanX[0];
};

run({
  //   part1: {
  //     tests: [
  //       {
  //         input: `$ cd /
  // $ ls
  // dir a
  // 14848514 b.txt
  // 8504156 c.dat
  // dir d
  // $ cd a
  // $ ls
  // dir e
  // 29116 f
  // 2557 g
  // 62596 h.lst
  // $ cd e
  // $ ls
  // 584 i
  // $ cd ..
  // $ cd ..
  // $ cd d
  // $ ls
  // 4060174 j
  // 8033020 d.log
  // 5626152 d.ext
  // 7214296 k`,
  //         expected: 95437,
  //       },
  //     ],
  //     solution: part1,
  //   },
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
