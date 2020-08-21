console.log('Client side javascript file is loaded!')

const from = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
from.addEventListener('submit',(e)=>{
  e.preventDefault()
  const loc = search.value
  msg1.textContent="Loading"
  msg2.textContent =" "
  fetch('/weather?location='+loc).then((response)=>{
    response.json().then((data)=>{
      if (data.error) {
        msg1.textContent=data.error
      }
      else {
        msg1.textContent =" "
        msg2.textContent="the current temperature is  "+data.current
      }
    })
  })

})
