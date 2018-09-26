const picsArr = ["anchor","apple","barn","baseball","basketball-player","boxer","car","cat","cowboy-boot","duck","eagle","golden-anchor","grapes","horse","house","jumping-horse","jumping","key","keys","lion","monster-truck","motorcycle","pocket-watch","scissors","seahorse","shoe","stopwatch","wagon-wheel","wheel","slamdunk"]


const doublesArr = [...picsArr, ...picsArr] // double array cuz you need pairs for a matching game

const app = document.getElementById('app');
app.style.cssText = "text-align:center"

const playBtn = document.querySelector('button')
playBtn.addEventListener('click', renderImages)

let choice= document.getElementById('difficulty').value;;
function selector(){
	choice = document.getElementById('difficulty').value;
	choice = Number(choice);
}

//random methods
arr.sort((a,b) => 0.5 - Math.random())

let rando = Math.floor(Math.random() * arr.length)
let temp = arr[i]
arr[i]=arr[rando]
arr[rando]=temp

function renderImages() {

	for(let i=0; i < choice; i++) {
		
		let cardPic = new Image();
		cardPic.src = 'images/final/100x100/' + doublesArr[i] + '.jpg';
		cardPic.className = 'cards';
		app.appendChild(cardPic);
		
		setTimeout(() => {
			let backArr = document.querySelectorAll('img');
			for(let i=0; i < backArr.length; i++){
				backArr[i].src = 'images/blank.png';
			}
		}, 5000)
	}
	
}

class MemoryGame{
	constructor(app, arr){
		
	} // end constructor
} // end class 