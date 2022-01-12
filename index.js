loader.style.visibility='hidden' 
secondLoader.style.visibility='hidden'

const url = "http://localhost:5050/getFibonacciResults" 

function fibonacci(){
  console.log(url)
  
  fetch(url)
  .then((resultsResponse) => resultsResponse.json())
    .then((resultsData) => {
  
      console.log(resultsData)
  
      const sortedDates=resultsData.results.sort(function (a, b) {
        const difference = b.createdDate - a.createdDate;
  
        return difference ? difference : -1;
      });
      console.log(sortedDates)
  
      for ( let i = 0; i <= 2; i++) {
        console.log(resultsData.results[i]);
  
        let number = document.createElement("div");
        number.classList.add("number");
        number.textContent=(resultsData.results[i].number);
  
        let result = document.createElement("div");
        result.classList.add("result");
        result.textContent=(resultsData.results[i].result);
  
        const date = new Date(resultsData.results[i].createdDate);
        console.log(date)
  
        let dateDisplay = document.createElement("div");
        dateDisplay.classList.add("dateDisplay");
        dateDisplay.textContent=(date);
  
        let resultsWrapper=document.createElement("div")
        resultsWrapper.classList.add("resultsWrapper")
  
        let fibonacciText=document.createElement("div")
        fibonacciText.classList.add("fibonacciText");
        fibonacciText.textContent=("The fibonacci of");
  
        let isText=document.createElement("div")
        isText.classList.add("isText");
        isText.textContent=("is");
  
        let dateText=document.createElement("div")
        dateText.classList.add("dateText");
        dateText.textContent=("Calculated at:");

        resultsWrapper.append(fibonacciText,number,isText,result,dateText,dateDisplay)
        
        resultsDisplay.append(resultsWrapper)

      }  
                     
    });
  
}


fibonacci();

const submitNumberButton = document.getElementById("submitNumberButton");
const input = document.getElementById("input");
const output = document.getElementById("output");
const resultsDisplay = document.getElementById("resultsDisplay");



function onKeyDown() {  
 error.style.visibility='hidden'
 resultsDisplay.style.visibility='hidden'

 output.style.visibility='hidden'
 titleText.style.visibility='hidden'

 document.getElementById("input").style.color = "black";

}

const submitNumber = () => {
  const inputValue = input.value;
  console.log(inputValue);

  function clearcontent() {
    document.getElementById("resultsWrapper").innerHTML = "";
  }

  const fibonacciUrl = `http://localhost:5050/fibonacci/${inputValue}`


  if (parseInt(inputValue) > 49) {
    error.style.visibility='visible'
  
    console.log("error");
    error.innerText = "Cannot be larger than 50";
    error.style.color = "red";
    document.getElementById("input").style.color = "red";
    document.getElementById("input").style.borderColor = "red";
    output.innerText = " ";
  error.style.backgroundColor = "rgba(247, 120, 120, 0.5)"
    return;
  }

  document.getElementById("input").style.borderColor = "black";


  if (parseInt(inputValue) < 50) {
    
    loader.style.visibility='visible' 
    secondLoader.style.visibility='visible'
    titleText.style.visibility='visible'

    const fibonacciFetch = async () => {
      try {
        let response = await fetch(fibonacciUrl);
        if (!response.ok) {
          badData = await response.text();
          console.log(badData);
          document.getElementById("output").innerHTML = badData
        

          let serverError=document.createElement("span")
          serverError.classList.add("serverError");
          serverError.textContent=("Server error:");
          
          serverError.style.color = "red";
          serverError.style.bold = "light";
          serverError.style.textDecoration = "none";
          
          output.prepend(serverError)

        } 

        else {
          data = await response.json();
          console.log(data.result);
          document.getElementById("output").innerHTML = data.result
       
        }
      } 

      catch (err) {
        console.log(err);
      }

      loader.style.visibility='hidden'
      secondLoader.style.visibility='hidden'
      output.style.visibility='visible'
      
      resultsDisplay.style.visibility='visible' 
    


    
  };

  fibonacciFetch();
  fibonacci();
  


  document.getElementById("input").style.color = "black";
  document.getElementById("input").style.borderColor = "black";  
}
}

submitNumberButton.addEventListener("click", submitNumber)
  



