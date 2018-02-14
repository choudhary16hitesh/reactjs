import React,{Component} from 'react';
import QuizOptions from "./QuizOptions";
import Animate from './Animate.css';

import classNames from 'classnames';
class Quiz extends Component{
constructor(props){
	super(props);
	let riddle =this.playGame();
let correct=false;
let gameOver=false;
	this.state={riddle : riddle};
this.renderOptions=this.renderOptions.bind(this);
this.checkResults=this.checkResults.bind(this);
this.play=this.play.bind(this);
}
randomNumber(min,max){
return Math.floor(Math.random()*(max-min+1))+1;
}
generateRandomOptions(sum){
	let resultsArray=[];
	let randomNumberArray=[];
	while(randomNumberArray.length<=3){
		let randomNumber=this.randomNumber(1,19);
		if(randomNumberArray.indexOf(randomNumberArray)>-1)continue;
		randomNumberArray.push(randomNumber);
	}
for(let i=0;i<3;i++){
		let result=sum;

	let addSubtract =this.randomNumber(0,1);
if(addSubtract ===1){
result=result+randomNumberArray[i];
resultsArray.push(result);

}
else{
result = result -randomNumberArray[i];
resultsArray.push(result);
}
}

return resultsArray;
}

playGame(){
	let field1=this.randomNumber(20,100);
	let field2=this.randomNumber(20,100);
	let result=field1+field2;
	let resultsArray=this.generateRandomOptions(result);
	resultsArray.push(result);
	resultsArray.sort(function(a,b){return 0.5-Math.random()});
	let riddle ={resultsArray : resultsArray,
field1:field1,
field2:field2,answer:result
};

if(this.state && this.state.gameOver){
	this.setState({riddle:riddle});
}
else{
return riddle;
}}
checkResults(option){
	if(this.state.riddle.answer === option){
this.setState({correct:true,gameOver:true});

	}
	else{
this.setState({correct:false,gameOver:true});
	}
}
renderOptions(){
	return (
<div className="options">
{this.state.riddle.resultsArray.map((option,i)=>
<QuizOptions option={option} key={i} checkResults={(option) =>this.checkResults(option)}/>

	)}
</div>
);
}
renderMessage(){
	if(this.state.correct){
	return	<h1>Good!Hit the button below to play again!</h1>
	}
	else{
		return <h1>Try Again!Hit the button below to play again!</h1>
	}
}
play(){
	this.setState({correct:false,gameOver:false});
	this.playGame();
}
render(){
	return (
<div className="quiz">
<div className="quiz-component">
<p className="question">What is the sum of <span className="text-info">{this.state.riddle.field1} and {this.state.riddle.field2}</span>?</p>
{this.renderOptions()}

</div>

<div className={classNames("after ",{'hide': !this.state.gameOver},{'wrong ':!this.state.correct},{'correct ' : this.state.correct}) }>
{this.renderMessage()}

</div>

<div className="play-again">
<a className="button" onClick={this.play}>Play Again</a>


</div>

</div>
		)
	
}
}
export default Quiz;