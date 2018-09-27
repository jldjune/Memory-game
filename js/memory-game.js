

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
		
		// grab the 
		this.footer = document.querySelector('footer');
		
		// an array to keep track of choices for comparison
		this.choicesArr = []
	} // end constructor
	
	// method runs when 'play' button is clicked
	initGame() {	
		// randomize initial array
		this.arr.sort((a, b) => 0.5 - Math.random());
		
		// get array size from select menu
		let gameSize = Number(document.getElementById('difficulty').value);
		
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
		
		event.target.src = 'images/final/200x200/' + event.target.name + '.jpg';
		
		// array to hold choices
		this.choicesArr.push(event.target);
		
		// compare when array has 2 items 
		if(this.choicesArr.length == 2){
			alert(this.choices[0].src)
			// compare names
			if(this.choicesArr[0].name == this.choicesArr[1].name){
				// names match, check ID's
				if(this.choicesArr[0].id == this.choicesArr[1].id){
				   // ID's match, must be same image
					// hide the image
					this.choicesArr[0].src = 'images/blank.png';
					this.msgBox.innerHTML = 'You clicked the SAME pic twice!';
					
				} else {// ID's don't match, it's a legit match
			   		
					this.msgBox.innerHTML = "Congrats! That's a Match!";
					
				}// end 
			} else { // names don't match
				
				//hide mismatched images
				setTimeout(function(){
					this.choicesArr[0].src = 'images/blank.png';
					this.msgBox.innerHTML = 'Sorry! Try Again!';
				}, 500)
				
				setTimeout(function(){
					this.choicesArr[1].src = 'images/blank.png';
				}, 500)		
				
			} // end if name comparison
			
			// reset array
//			setTimeout(function(){
//				this.choicesArr = []
//			}, 1500)
			
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
				
				for(let i=0; i < gameArr.length; i++){
				this.app.children[i].src = 'images/blank.png';
				}
				
			*/
		}, 6500)
	}
	
	
} // end MemoryGame class 