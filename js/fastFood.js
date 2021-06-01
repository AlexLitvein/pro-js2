const foods = {
  small: { price: 50, calories: 20 },
  big: { price: 100, calories: 40 },
  cheese: { price: 10, calories: 20 },
  salad: { price: 20, calories: 5 },
  potatoes: { price: 15, calories: 10 },
  seasoning: { price: 15, calories: 0 },
  mayonnaise: { price: 20, calories: 5 },
};

function calc() {
  const choiceOut = [];
  const foodsEl = document.querySelector("#foods");
  const foodsChoice = foodsEl.querySelectorAll("input");
  // console.log(foodsChoice);
  foodsChoice.forEach((el) => {
    if(el.checked === true){
      choiceOut.push(foods[el.value]);
    }    
  });

  // console.log(choiceOut);

  const oTotal = choiceOut.reduce((acc, next)=>{
    return {
      price: acc.price + next.price,
    calories: acc.calories + next.calories
  }
  });

  return oTotal;  
}

const total = document.querySelector("#total");
document.querySelector("#calc-btn").addEventListener('click', function (e) {
  const res = calc();
  total.innerHTML=`total price: ${res.price}<br> total calories: ${res.calories}`;
});



