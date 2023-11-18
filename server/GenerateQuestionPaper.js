
const Questions = require(__dirname+'/QuestionStore.js');

// Function to generate a question paper based on specified requirements
const generateQuestionPaper = (totalMarks, difficultyDistribution) => {

  // if total marks or difficulty percentages is not provided
  if (totalMarks == undefined ||
    difficultyDistribution["Easy"] == undefined ||
    difficultyDistribution["Medium"] == undefined ||
    difficultyDistribution["Hard"] == undefined) {
    throw new Error('Provide input')
  }

  // if total marks or difficulty percentages are negative numbers
  if (totalMarks <= 0 || difficultyDistribution["Easy"] < 0 || difficultyDistribution["Medium"] < 0 || difficultyDistribution["Hard"] < 0) {
    throw new Error('Error : Invalid input')
  }

  //if total percentage distribution does not add up to 100
  let totalpercentage = (difficultyDistribution["Easy"] +
    difficultyDistribution["Medium"] +
    difficultyDistribution["Hard"]);
  if (totalpercentage !== 100) {
    throw new Error('Error : Check the difficulty distribution again!')
  }

  //if difficulty distribution does not equates to total marks
  let easyMarks = (difficultyDistribution["Easy"] / 100) * totalMarks;
  let mediumMarks = (difficultyDistribution["Medium"] / 100) * totalMarks;
  let hardMarks = (difficultyDistribution["Hard"] / 100) * totalMarks;
  if (easyMarks + mediumMarks + hardMarks != totalMarks) {
    throw new Error('Error : Insufficient Total Marks')
  }
  else {
    const questionPaper = [];
    const markDistribution = {
      'Easy': 5,
      'Medium': 10,
      'Hard': 15
    }
    Object.entries(difficultyDistribution).forEach(([difficulty, percentage]) => {
      const questionSet = Questions.Questions.filter(question => question.difficulty === difficulty);
      const numberOfQuestions = Math.ceil(((percentage / 100) * totalMarks) / markDistribution[difficulty]);

      // Randomly shuffle the questions to get a different set each time
      const shuffledQuestions = questionSet.sort(() => Math.random() - 0.5);

      // Select the required number of questions
      const selectedQuestions = shuffledQuestions.slice(0, numberOfQuestions);

      // Add the selected questions to the question paper
      questionPaper.push(...selectedQuestions);
    });
    return questionPaper;
  }
}

module.exports = {
  generateQuestionPaper,
};
