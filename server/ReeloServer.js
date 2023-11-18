const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
const {generateQuestionPaper}=require('./GenerateQuestionPaper.js')


app.use(cors());
app.use(bodyParser.json());
app.post('/generate-question-paper',(req,res)=>{
  const { totalMarks, easyPercentage, mediumPercentage, hardPercentage } = req.body;
  const difficultyDistribution = {
        "Easy": Number(easyPercentage),
        "Medium": Number(mediumPercentage),
        "Hard": Number(hardPercentage)
    };
    try{
      const questionPaper = generateQuestionPaper(totalMarks, difficultyDistribution);
      res.json(questionPaper);
    }catch(error){
      res.status(500).json({ error: error.message });
    }
  
})

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});