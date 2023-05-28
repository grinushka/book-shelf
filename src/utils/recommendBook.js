import { getRandomInt } from "./getRandomInt";

export const recommendBook = function (allBooks) {

  const currentYear = new Date().getFullYear();
  const yearCondition = 3;

  // Find the books that were published no less than 3 years ago
  const checkedBooks = allBooks.filter((el) => {
    if (!el.publicationYear) return false;
    if (el.publicationYear < currentYear - yearCondition) {
      return true
    }
    return false
  });

  // Save the length, as we use it then 3 times
  const checkedLength = checkedBooks.length;

  // Return 1 if there is no books satisfying the condition
  if (checkedLength < 0) {
    return 1;
  };

  // Return the first element in the array, if there is only one good book
  if (checkedLength === 1) {
    return checkedBooks[0];
  };


  // Finds the highest possible rating
  let highestRating = 0;
  for (let i = 0; i < checkedLength; i++) {
    if (checkedBooks[i].rating > highestRating) {
      highestRating = checkedBooks[i].rating;
    }
  };

  // Filter and leave books only with the highest rating
  const highlyRated = checkedBooks.filter((el) => {
    if (el.rating === highestRating) {
      return true
    }
    return false
  });

  // If only one then return it
  if (highlyRated.length === 1) {
    return highlyRated[0]
  } else {
    // If there is more than one highly rated book, randomly choose one
    let randomNum = getRandomInt(0, highlyRated.length);
    return highlyRated[randomNum];
  }

};
