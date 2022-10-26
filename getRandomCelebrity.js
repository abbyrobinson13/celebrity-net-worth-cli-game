//select a random celebrity from my array function

export function getRandomCelebrity(famousPeople) {
  let randomNumber = Math.floor(Math.random() * famousPeople.length);
  let celebrity = famousPeople[randomNumber].name;
  return celebrity;
}
