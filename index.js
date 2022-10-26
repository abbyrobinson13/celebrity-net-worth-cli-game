import cfonts from "cfonts";
import rl from "readline-sync";
import { levelOne } from "./levelOne.js";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
let welcomeMessage = chalkAnimation.rainbow(
  "welcome to my celebrity net worth guessing game"
);
await sleep();
welcomeMessage.stop();

console.log(`
  ${chalk.bgBlue("HOW TO PLAY")}
  You will be given a choice of 2 celebrities, 
  You will get to guess who has a higher net worth. 
  If you guess wrong you lose.
  `);

//set while loop condition
let score = 0;

levelOne();
