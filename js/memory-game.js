

class MemoryGame{
	constructor(app, arr){
		// initialize incoming app div
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
		
		// grab the score box spans 
		this.attemptBox = document.getElementById('attempt-box');
		this.matchBox = document.getElementById('match-box');
		this.averageBox = document.getElementById('average-box');
		this.scoreBox = document.getElementById('score-box');
		
		// an array to keep track of choices for comparison
		this.choicesArr = []
		
		// grab timer span
		this.timer = document.getElementById('timer');
		
		// grab high score box
		this.highScoreBox = document.getElementById('high-score-box')
		
	} // end constructor
	
	// method runs when 'play' button is clicked
	initGame() {
		// ensure app div is clear
		this.app.innerHTML = "";
		
		// endure high score box is hidden
		this.highScoreBox.innerHTML = "";
		this.highScoreBox.style.display = 'none';
		this.highScoreBox.style.top = '1000px';
		
		// remove initials box and save score button, if they exist
		if(this.initials){
			this.footer.removeChild(this.initials);
			this.footer.removeChild(this.saveBtn);
		}
		
		// disbale play button
		this.playBtn.disabled = true;
		
		// scoring vars (attempt, match, average, score, scale)
		this.attempts = 0;
		this.matches = 0;
		this.average = 0;
		this.score = 0;
		
		// randomize initial array
		this.arr.sort((a, b) => 0.5 - Math.random());
		
		// get array size from select menu
		this.difficulty = document.getElementById('difficulty');
		this.gameSize = Number(this.difficulty.value);
		
		// grab level text of option picked by user
		this.level = this.difficulty.options[this.difficulty.selectedIndex].text;
		// seperate selected text into array 
		let levelArr = this.level.split(" ");
		// set level to first part of text
		this.level = levelArr[0];
		
		// score multiplier based on game difficulty
		this.scale = this.gameSize ** 2;
		
		// make a new array with a slice of the needed size
		let gameArr = this.arr.slice(0, this.gameSize);
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
		
		// message with 5 sec countdown before hiding cards
		this.msgBox.innerHTML = 'HIDING ALL IMAGES IN <span id="countDown">5</span>';
		
		// 5 sec countdown timer
		let countdownInterval = setInterval(function(){
			// update the countdown span tag number
			let countdown = document.getElementById('countDown');
			let countdownVal = Number(countdown.innerHTML);
			countdownVal--;
			countdown.innerHTML = countdownVal;
			
			// when countdown reaches zero, stop it
			if(countdownVal == 0){
				clearInterval(countdownInterval);
			}// end if clearInterval
		}, 1000)// end countdownInterval
		
		// calls method to hide images
		this.hidePic();
		
	}// end initGame
	
	// method displays 'hidden' images by changing src, tracks and displays score. runs when card image is clicked
	showPic(){
		// changes src of image clicked to display image
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
			   		// player matches a pair
					this.msgBox.innerHTML = "Congrats! That's a Match!";
					
					// deactivate click event first image
					let newPic0 = new Image();
					newPic0.src = this.choicesArr[0].src;
					newPic0.className = 'cards';
					this.app.replaceChild(newPic0, this.choicesArr[0])
					// deactivate click event first image
					let newPic1 = new Image();
					newPic1.src = this.choicesArr[1].src;
					newPic1.className = 'cards';
					this.app.replaceChild(newPic1, this.choicesArr[1])
					
					// counts when player finds a match
					this.matches++;
					
					// end game when matches equal number of pairs
					if(this.matches == this.gameSize){
						// enable play button
						this.playBtn.disabled = false;
						
						// output game over message
						this.msgBox.innerHTML = "GAME OVER!";
						
						// stop timer by clearing timer interval
						clearInterval(this.timerInterval);
						
						//input initials box
						this.initials = document.createElement('input');
						this.initials.type = 'text';
						this.initials.id = 'initials';
						this.initials.placeholder = 'AAA';
						this.initials.setAttribute('maxlength', 3);
						this.footer.appendChild(this.initials);
						
						
						// make and output a clickable Save score button
						let saveBtn = document.createElement('button');
						saveBtn.innerHTML = 'SAVE SCORE';
						saveBtn.addEventListener('click', this.saveScore.bind(this));
						this.footer.appendChild(saveBtn);
						
					}
					
				}// end if ID comparison
			} else { // names don't match
				
				// output message
				this.msgBox.innerHTML = 'Oops! Try Again!';
				
				//hide mismatched images at set delay time
				setTimeout(() => {
					this.choicesArr[0].src = 'images/blank.png';
					
				}, 500)
				
				setTimeout(() => {
					this.choicesArr[1].src = 'images/blank.png';
				}, 500)		
				
			} // end if name comparison
			
			 // reset comparison array
			setTimeout(() => {
				this.choicesArr = []
			}, 750)
			
			
		} // end if array length
		
		// calculate the average and limit to 3 decimal places
		this.average = (this.matches / this.attempts).toFixed(3)
		
		// calculate score
		this.score = Math.ceil((this.average * this.scale * this.matches * 1000) / this.totSec);
		

		// output score variables to score-box 
		this.attemptBox.innerHTML = this.attempts;
		this.matchBox.innerHTML = this.matches;
		this.averageBox.innerHTML = !this.average ? 0: this.average;
		this.scoreBox.innerHTML = !this.score ? 0: this.score;

		
		
	}// end showPic
	
	// method hides images by changing src, runs after 6.5 sec
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
			// starts timer 
			this.startTimer();
		}, 6500)// end setTimeout
	}// end of hidePic()
	
	// method creates a timer, is called by hidePic()
	startTimer(){
		let seconds = 0
		this.totSec = 0 
		let minutes = 0
		this.timerInterval = setInterval(() => {
			// update the countdown span tag number
			this.totSec++
			seconds++
			
			// increment minutes when seconds hit 60
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
			
			// timer output
			this.timer.innerHTML = m + ':' + s;
			
		}, 1000) // end timerInterval

	}// end of startTimer()
	
	// save score method
	saveScore(){
		//alert('SAVE SCORE')
		// display hidden high score box
		this.highScoreBox.style.display = 'block';
		this.highScoreBox.style.top = '150px';
		this.highScoreBox.style.left = '350px';
		
		// create url with needed vars and values
//		let url = 'php/memory-game.php?';
//		url += 'score=' + this.score;
//		url += '&attempts=' + this.attempts;
//		url += '&matches=' + this.matches;
//		url += '&seconds=' + this.totSec;
//		url += '&level=' + this.level;
//		url += '&initials=' + this.initials.value;
//		
//		let xhr = new XMLHttpRequest();
//		xhr.onload = () => {
//			this.highScoreBox.innerHTML = xhr.responseText;
			
//		}
//		
//		xhr.open('GET', url, true);
//		xhr.send()
		
		// jQuery AJAX version of the above
		$.ajax({
			method: 'get',
			url: 'php/memory-game.php',
			data: {
				score: this.score,
				attempts: this.attempts,
				matches: this.matches,
				seconds: this.totSec,
				level: this.level,
				initials: this.initials.value	
			},
			success: function(highScores){
				$('#high-score-box').html(highScores)
			}
		})// end jQueery AJAX
		
		
	}// end saveScore
		
} // end MemoryGame class 