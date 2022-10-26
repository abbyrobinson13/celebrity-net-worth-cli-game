import rl from "readline-sync";
import { famousPeople } from "./src/famousPeople.js";
//import { getRandomCelebrity } from "./getRandomCelebrity.js";
import terminalImage from "terminal-image";
import got from "got";
import fetch from "node-fetch";
import chalk from "chalk";

//get two celebrities
let score = 0;
let newScore = 0;
let gamePlay = true;

export async function playAgain() {
  const response = await fetch("http://localhost:3000/scores");
  const highScore = await response.json();
  console.log(
    `${chalk.yellow(newName)} - Your current high score is : ${
      highScore[newName]
    }`
  );
  let playAgain = rl.question("Would you like to try and beat it? Y or N: ");
  if (playAgain === "Y" || playAgain === "y") {
    console.clear();
    let newPlayer = rl.question(
      `Would you like to still play as ${chalk.yellowBright(
        newName
      )}, or are you a new player?: 'Y' to continue, 'N' for new player : `
    );
    if (newPlayer.toUpperCase() === "Y") {
      score = 0;
      levelOne();
    } else if (newPlayer.toUpperCase() === "N") {
      newName = rl.question("Enter your name: ");
      score = 0;
      levelOne(newName);
    }
  } else {
    console.log("Goodbye");
  }
}

// function to get net worth
export function pullNumberWorth(celebrity) {
  let index = famousPeople.find((c) => c.name == celebrity);
  return index.numberWorth;
}
export function pullImage(celebrity) {
  let imageLink = famousPeople.find((c) => c.name == celebrity);
  return imageLink.image;
}
//function to get celebrity description
export function celebDescription(celebrity) {
  let describeCeleb = famousPeople.find((c) => c.name == celebrity);
  return describeCeleb.description;
}

//compare function of net worth of both celebs.
export function compare(totalMoneyA, totalMoneyB) {
  if (totalMoneyA > totalMoneyB) {
    return "A";
  } else {
    return "B";
  }
}

//level 2 compare 3 celebrities
export function compareThree(totalMoneyA, totalMoneyB, totalMoneyC) {
  if (totalMoneyA > totalMoneyB && totalMoneyA > totalMoneyC) {
    return "A";
  } else if (totalMoneyB > totalMoneyA && totalMoneyB > totalMoneyC) {
    return "B";
  } else if (totalMoneyC > totalMoneyA && totalMoneyC > totalMoneyB) {
    return "C";
  }
}
//let newName = rl.question("Welcome! Enter your name: ");
export async function levelTwo() {
  let score = 10;
  console.log(
    `Congratulations ${chalk.yellow(newName)}! You have made it to level 2.`
  );
  console.log("You now have to pick between 3 celebrity net worths");
  rl.question("When you are ready press enter: ");
  while (gamePlay == true) {
    const response = await fetch("http://localhost:3000/");
    const data = await response.json();
    let celebrityA = data[0];
    let celebrityB = data[1];
    let celebrityC = data[2];

    if (
      celebrityA == celebrityB ||
      celebrityA == celebrityC ||
      celebrityB == celebrityC
    ) {
      continue;
    }

    // get the net worth of both celebrities.
    let celebANumber = pullNumberWorth(celebrityA);
    let celebBNumber = pullNumberWorth(celebrityB);
    let celebCNumber = pullNumberWorth(celebrityC);

    // celeb descriptions
    let descriptionA = celebDescription(celebrityA);
    let descriptionB = celebDescription(celebrityB);
    let descriptionC = celebDescription(celebrityC);

    let compareCelebrities = compareThree(
      celebANumber,
      celebBNumber,
      celebCNumber
    );

    console.log(
      `Celebrity A: , ${chalk.red(celebrityA)}, ${chalk.blue(descriptionA)}`
    );
    const bodyA = await got(pullImage(celebrityA)).buffer();
    console.log(await terminalImage.buffer(bodyA, { width: "10%" }));

    console.log(
      `Celebrity B:  ${chalk.green(celebrityB)}, ${chalk.blue(descriptionB)}`
    );
    const bodyB = await got(pullImage(celebrityB)).buffer();
    console.log(await terminalImage.buffer(bodyB, { width: "10%" }));

    console.log(
      `Celebrity C:  ${chalk.yellow(celebrityC)}, ${chalk.blue(descriptionC)}`
    );
    const bodyC = await got(pullImage(celebrityC)).buffer();
    console.log(await terminalImage.buffer(bodyC, { width: "10%" }));

    let guess = rl.question(
      "Who do you think has the higher net worth. A, B, or C?: "
    );
    let finalGuess = guess.toUpperCase();

    console.log(
      "The correct answer is",
      compare(celebANumber, celebBNumber, celebCNumber)
    );

    if (finalGuess === compareCelebrities) {
      console.log("You are correct!");
      score += 1;
      console.log("Your current score is: ", score);
      console.log("\n");
      rl.question("Are you ready for the next question? Press enter: ");
      console.log("---------------------");
      console.log("\n");
    } else {
      console.log("Sorry that is incorrect :( ");
      console.log("Game over 😭😭. Your final score is ", score);
      const response = await fetch("http://localhost:3000/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, newName }),
      });
      const results = await response.json();
      playAgain(newName);
      break;
    }
  }
}

let newName = rl.question("Enter your name: ");
export async function levelOne() {
  while (gamePlay == true) {
    const response = await fetch("http://localhost:3000/");
    const data = await response.json();
    //console.log(data);

    let celebrityA = data[0];
    let celebrityB = data[1];

    if (celebrityA == celebrityB) {
      continue;
    }

    //Celeb A description
    let descriptionA = celebDescription(celebrityA);

    //celeb B description
    let descriptionB = celebDescription(celebrityB);

    //Celebrity A
    console.log(
      `Celebrity A: ${chalk.red(celebrityA)}, ${chalk.blue(descriptionA)} `
    );
    const bodyA = await got(pullImage(celebrityA)).buffer();
    console.log(await terminalImage.buffer(bodyA, { width: "15%" }));

    //Celebrity B
    console.log(
      `Celebrity B:  ${chalk.green(celebrityB)}, ${chalk.blue(descriptionB)} `
    );
    const bodyB = await got(pullImage(celebrityB)).buffer();
    console.log(await terminalImage.buffer(bodyB, { width: "15%" }));

    // get the net worth of both celebrities.
    let celebANumber = pullNumberWorth(celebrityA);
    let celebBNumber = pullNumberWorth(celebrityB);

    //ask user to guess the net worth
    let guess = rl.question(
      `Who do you think has the higher net worth. ${chalk.red(
        "A"
      )} or ${chalk.red("B")}?: `
    );
    let finalGuess = guess.toUpperCase();

    let compareCelebrities = compare(celebANumber, celebBNumber);
    console.log(
      "The correct answer is",
      chalk.green(compare(celebANumber, celebBNumber))
    ); //edit later

    if (finalGuess === compareCelebrities) {
      console.log("You are correct!");
      score += 1;
      console.log(chalk.bgYellow("Your current score is: "), score);
      rl.question("Are you ready for the next question? Press enter: ");
      console.clear();
      console.log("\n");
      console.log("---------------------");
      console.log("\n");
      celebrityA = celebrityB;
      if (score == 10) {
        levelTwo(newName);
        break;
      }
    } else {
      console.clear();
      console.log("\nSorry that is incorrect :( ");
      console.log(
        `${chalk.red("Game over")} 💀💀. Your final score is `,
        score
      );

      const response = await fetch("http://localhost:3000/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, newName }),
      });
      const results = await response.json();
      playAgain(newName);
      break;
    }
  }
}

export { score, newScore, gamePlay };
