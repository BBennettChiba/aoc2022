import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const oppMoves = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
} as const;

type OppMoves = keyof typeof oppMoves;
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const myMoves = {
    X: "Lose",
    Y: "Draw",
    Z: "Win",
  } as const;
  type MyMoves = keyof typeof myMoves;
  type Move = "Rock" | "Paper" | "Scissors";
  type Result = typeof myMoves[MyMoves];
  type Line = `${OppMoves} ${MyMoves}`;
  const lines = input.trim().split("\n") as Line[];
  function getScore(move1: OppMoves, move2: MyMoves) {
    const opp = oppMoves[move1];
    const me = getMyMove(opp, myMoves[move2]);
    let score = 0;
    if (me === "Rock") score += 1;
    if (me === "Paper") score += 2;
    if (me === "Scissors") score += 3;
    score += compareMoves(opp, me);
    return score;
  }

  function compareMoves(move1: Move, move2: Move) {
    if (move1 === "Paper") {
      if (move2 === "Scissors") return 6;
      if (move2 === "Rock") return 0;
    }
    if (move1 === "Rock") {
      if (move2 === "Paper") return 6;
      if (move2 === "Scissors") return 0;
    }
    if (move1 === "Scissors") {
      if (move2 === "Rock") return 6;
      if (move2 === "Paper") return 0;
    }
    return 3;
  }
  function getMyMove(oppMove: Move, result: Result) {
    if (oppMove === "Paper") {
      if (result === "Win") return "Scissors";
      if (result === "Lose") return "Rock";
      return "Paper";
    } else if (oppMove === "Rock") {
      if (result === "Win") return "Paper";
      if (result === "Lose") return "Scissors";
      return "Rock";
    } else {
      if (result === "Win") return "Rock";
      if (result === "Lose") return "Paper";
      return "Scissors";
    }
  }
  let score = 0;
  for (const line of lines) {
    const [move1, move2] = line.split(" ");
    score += getScore(move1 as OppMoves, move2 as MyMoves);
  }

  return score;
};

run({
  part1: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 10994,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
