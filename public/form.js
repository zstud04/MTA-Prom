
// const FormData = require('form-data');

// var formData= new FormData();


const multiStepForm = document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
let currentStep = formSteps.findIndex(step => {
  return step.classList.contains("active")
})

if (currentStep < 0) {
  currentStep = 0
  showCurrentStep()
}

multiStepForm.addEventListener("click", e => {
  let incrementor
  if (e.target.matches("[data-next]")) {
    incrementor = 1
  } else if (e.target.matches("[data-previous]")) {
    incrementor = -1
  }

  if (incrementor == null) return

  const inputs = [...formSteps[currentStep].querySelectorAll("input")]
  const allValid = inputs.every(input => input.reportValidity())
  if (allValid) {
    currentStep += incrementor
    showCurrentStep()
  }
})

formSteps.forEach(step => {
  step.addEventListener("animationend", e => {
    formSteps[currentStep].classList.remove("hide")
    e.target.classList.toggle("hidden", !e.target.classList.contains("active"))
  })
})

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep)
  })
}


/*stripe*/
var stripeHandler = StripeCheckout.configure({
  
  key: "pk_test_51Ksg90JjerZXmgTEy4Li4I010R5pQoroENKyS0BNXJSB6383jEz7gcFZn4tr6g71VtVRmyQO1ahTnCdKB9VPAYzf00HeEk9LRO",
  locale: 'auto',
  token: function(token){
    fetch('/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        stripeTokenId: token.id
      })
    }).then(function(res){
      return res.json()
    }).then(function(data){
      alert(data.message)
      window.location.href="index.html"
      
    }).catch(function(error){
      console.error(error)
    })
  }
})

function purchaseClicked(e){
 

  // e.preventDefault(); 
  // const name = document.getElementById("fname");
  // const files = document.getElementById("myFile");
  // const formData= new FormData();
  // formData.append("name",name.value);
  // formData.append("files",files.files[0]);
  
  // fetch("http://localhost:4200/upload_files",{
  //   method:'POST',
  //   body: formData,
  //   headers:{
  //     "content-type": undefined
  //   }
  // })
  //   .then((res) =>console.log(res))
  //   .catch((err)=>("Error occured", err));

  // e.preventDefault()
  
  var price = 3000
  
  // const name= document.getElementById("name").value
  // const lname = document.getElementById("lname").value

  // formData.append('name', name);
  // formData.append('lname',lname);

  stripeHandler.open({
    amount:price
  })
  

  
}

let btn = document.getElementById("pay")
btn.addEventListener('click', purchaseClicked);



