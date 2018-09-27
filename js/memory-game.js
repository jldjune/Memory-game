

class MemoryGame{
	constructor(app, arr){
		//
		this.app = document.getElementById('app');
		
		// initialize incoming array
		this.arr = arr;
		
		// add event listener to 'play' button to initialize game
		this.playBtn = document.getElementById('play-btn');
		this.playBtn.addEventListener('click', this.initGame.bind(this));
		
		// grab message box
		this.msgBox = document.getElementById('msg-box');
		
		// grab the footer that holds score and timer
		this.footer = document.querySelector('footer');
		
		// grab the score box span 
		this.attemptBox = document.getElementById('attempt-box');
		this.matchBox = document.getElementById('match-box');
		this.averageBox = document.getElementById('average-box');
		this.scoreBox = document.getElementById('score-box');
		
		// an array to keep track of choices for comparison
		this.choicesArr = []
		
		// grab timer span
		this.timer = document.getElementById('timer');
		
	} // end constructor
	
	// method runs when 'play' button is clicked
	initGame() {
		// scoring vars (attempt, match, average, score, scale)
		this.attempts = 0;
		this.matches = 0;
		this.average = 0;
		this.score = 0;
		this.scale = 0; 
		
		// randomize initial array
		this.arr.sort((a, b) => 0.5 - Math.random());
		
		// get array size from select menu
		let gameSize = Number(document.getElementById('difficulty').value);
		
		// score multiplier based on game difficulty
		this.scale = gameSize ** 2;
		
		
		// make a new array with a slice of the needed size
		let gameArr = this.arr.slice(0, gameSize);
//		
		// double array size for needed pairs used in game play
		gameArr = [...gameArr, ...gameArr];
		
		// randomize new doubled array (using another method)
		for(let i=0; i<gameArr.length; i++){
			let temps = gameArr[i];
			let rando = Math.floor(Math.random() * gameArr.length);
			gameArr[i] = gameArr[rando];
			gameArr[rando] = temps;
		}// end random for loop

		// loop to make clickable images with class, name and ID properties
		for(let i=0; i < gameArr.length; i++) {

			let cardPic = new Image();
			cardPic.src = 'images/final/200x200/' + gameArr[i] + '.jpg';
			cardPic.className = 'cards';
			cardPic.id = i;
			cardPic.name = gameArr[i];
			app.appendChild(cardPic);
			// click calls showPic method
			cardPic.addEventListener('click', this.showPic.bind(this));
			
		}// end image for loop
		
		this.msgBox.innerHTML = 'HIDING ALL IMAGES IN <span id="countDown">5</span>';
		
		// 
		let countdownInterval = setInterval(function(){
			// update the countdown span tag number
			let countdown = document.getElementById('countDown');
			let countdownVal = Number(countdown.innerHTML);
			countdownVal--;
			countdown.innerHTML = countdownVal;
			
			// when countdown reaches zero, stop it
			if(countdownVal == 0){
				clearInterval(countdownInterval);
			}
		}, 1000)
		this.hidePic();
		
	}// end initGame
	
	// method runs when card image is clicked
	showPic(){
		// changes src of image clicked
		event.target.src = 'images/final/200x200/' + event.target.name + '.jpg';
		
		// array to hold images clicked
		this.choicesArr.push(event.target);
		
		// start comparison when array has 2 items 
		if(this.choicesArr.length == 2){
			
			// counts everytime choice array is evaluated
			this.attempts++;
			
			// compare names of both elements in the array
			if(this.choicesArr[0].name == this.choicesArr[1].name){
				
				// if names match, check if ID's match
				if(this.choicesArr[0].id == this.choicesArr[1].id){
					
				   // if ID's match, same image was clicked twice
					this.msgBox.innerHTML = 'Oops! You Clicked the <br>Same Pic Twice!';
					
					// hide the image 
					setTimeout(() => {
						this.choicesArr[0].src = 'images/blank.png';
					}, 500)
					
				} else {// ID's don't match, it's a legit match
			   		
					this.msgBox.innerHTML = "Congrats! That's a Match!";
					
					
					// counts when player finds a match
					this.matches++;
					
				}// end if ID comparison
			} else { // names don't match
				
				// output message
				this.msgBox.innerHTML = 'Oops! Try Again!';
				
				//hide mismatched images at set delay
				setTimeout(() => {
					this.choicesArr[0].src = 'images/blank.png';
					
				}, 750)
				
				setTimeout(() => {
					this.choicesArr[1].src = 'images/blank.png';
				}, 750)		
				
			} // end if name comparison
			
			 // reset comparison array
			setTimeout(() => {
				this.choicesArr = []
			}, 1000)
			
			
		} // end if array length

		
	}// end showPic
	
	// method runs after 6.5 sec
	hidePic(){
		setTimeout(() => {
			// create new object array of all images
			let backArr = document.querySelectorAll('img');
			for(let i=0; i < backArr.length; i++){
				backArr[i].src = 'images/blank.png';
			}
			
			/*
				OR target the children of app div
				
				// also hides images without first 'grabbing' them off the DOM
				for(let i=0; i < gameArr.length; i++){
				this.app.children[i].src = 'images/blank.png';
				}
				
			*/
			this.startTimer();
		}, 6500)
	}
	
	startTimer(){
		let seconds = 0
		let totSec =0 
		let minutes = 0
		setInterval(() => {
			// update the countdown span tag number
			totSec++
			seconds++
			
			if(seconds == 60){
				seconds = 0
				minutes++;	
			}
			
			let s = seconds;
			let m = minutes
			if(seconds < 10 ){
				s = '0' + seconds;
			} 
			
			if(minutes < 10){
				m = '0' + minutes;
			}
			
			this.timer.innerHTML = m + ':' + s;
			
			
		}, 1000)
		
		// score
		this.score = Math.ceil((this.average * this.scale * this.matches * 1000)/ totSec);

		// calculate the average and limit to 3 decimal places
		this.average = (this.matches / this.attempts).toFixed(3)

		// output score variables to score-box 
		this.attemptBox.innerHTML = this.attempts;
		this.matchBox.innerHTML = this.matches;
		this.averageBox.innerHTML = this.average;
		this.scoreBox.innerHTML = this.score;

		
	}
	
} // end MemoryGame class 