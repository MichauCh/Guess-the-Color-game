var numSquares = 6; //liczba kwadratow
var colors = []; //tablica kolorow
var pickedColor; //zmienna przetrzymujaca kolor
var squares = document.querySelectorAll(".square"); //kwadraty
var colorDispaly = document.getElementById("colorDispaly"); //string z kolorem
var messageDisplay = document.querySelector("#message"); //stan gry
var h1 = document.querySelector("h1"); //naglowek
var resetButton = document.querySelector("#reset"); // przycisk reset
var modeButtons = document.querySelectorAll(".mode"); //przyciski z poziomem trudnosci gry
//-----------------------------------------------------------------------
init(); //inicjacja gry
//-----------------------------------------------------------------------
function init(){ //funckja jest podzielona na segmenty
	setUpModeButtons(); //inicjacja przyciskow z poziomem trudnosci
	setUpSquares(); //inicjacja kwadratow
	reset();
}
function setUpModeButtons(){ 
		for(var i = 0; i<modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected"); //gdyby bylo wiecej lepiej poziomow tu uzyc petli
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected"); //ustawienie klasy dla wybranego poziomu
			this.textContent === "Easy" ? numSquares = 3: numSquares =6; //dla easy 3 kwadraty, hard 6 kwadratow
			reset();
		});
	}
}
function setUpSquares(){
	for(var i=0; i<squares.length; i++){
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor; //zapis wybranego koloru
				if(clickedColor===pickedColor){ //sprawdzenie zgodnosci
					messageDisplay.textContent = "Correct!";
					resetButton.textContent = "Play Again?";
					changeColors(clickedColor); //wszystkie kwadraty maja poprawny kolor
					h1.style.backgroundColor = clickedColor; //h1 tez ma poprawny kolor
				}else{
					this.style.backgroundColor = "#232323"; //wygaszenie wybraneg koloru
					messageDisplay.textContent = "Try Again";
				}
		});
	}
}
//------------------------funckja resetujaca----------------------------
function reset(){
	colors = generateRandomColors(numSquares); //generuje nowe kolory
	pickedColor = pickColor();	//wybor koloru do odgadniecia
	colorDisplay.textContent = pickedColor; //wyswietla w naglowku kolor do odgadniecia
	messageDisplay.textContent = ""; //pusty komunikat
	resetButton.textContent = "New Colors";
	for(var i = 0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i]; //przypisanie koloru z tablicy
		}else{
			squares[i].style.display = "none"; //brak kolorow poza tablica, trzeba ukryc kwadraty
		}
	}
	h1.style.backgroundColor = "steelblue"; //domyslny kolor h1
}
//----------------------reset button-------------------------------------
resetButton.addEventListener("click", function(){
	reset();
});
//-----------------------------------------------------------------------
function changeColors(color){
	for(var i=0; i<squares.length; i++)
		squares[i].style.backgroundColor = color; //ustawienie wszystkich kwadratow jednym kolorem
}
function pickColor(){ //wybiera jeden z tablicy z kolorow, ktory bedzie trzeba odgadnac
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}
function generateRandomColors(num){ //generuje tablice kolorow, ich liczba jest argumentem
	var arr = [];
	for(var i=0; i<num; i++){
		arr.push(randomColor());
	}
	return arr; //zwraca cala tablice kolorow
}
function randomColor(){
	var r = Math.floor(Math.random()*256); //red
	var g = Math.floor(Math.random()*256); //green
	var b = Math.floor(Math.random()*256); //blue
	return "rgb(" + r + ", " + g + ", " + b + ")"; //zwraca string z kolorem
}