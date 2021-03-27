//global variables

let UserParkCode
let h2El
let h2ElText
let btEl
let btEl3
let jserize
let savedParksInState
let parkName

//function = receive 

$('#main').on('click', function(evt) {


  $.ajax({ 

    url:'https://developer.nps.gov/api/v1/parks?stateCode=' + evt.target.id + '&api_key=gUhYAU8A9KlyEa3VexRiSjw7V34Tef1JiKl31tva'

  }).then( 


    (data) => {
        
        // build park menu
        jserize = jQuery.makeArray( data )
        document.querySelector('#main').remove()
        h2El = document.createElement('h3')
        h2El.innerText = `Select a Park in ${evt.target.outerText}`
        document.querySelector('#subHeading').appendChild(h2El)

        savedParksInState = jserize[0].data
        for (i=0;i<jserize[0].data.length;i++) {
            btEl = document.createElement('button')
            let parkName = jserize[0].data[i].fullName
            btEl.innerText = parkName
            document.getElementById('stateList').appendChild(btEl)
            
          }
    },
    (error) => {
        console.log('error', error)
    }
  )
})

// function:  build photo/cam selection menu from selected park

$('#stateList').on('click', function(evt) {
    document.querySelector('#stateList').remove()
    document.querySelector('h3').remove()
    h2El = document.createElement('h3')
    h2El.innerText = `Select a Photo or Web Cam (if available) in ${evt.target.outerText}`
    document.querySelector('#subHeading').append(h2El)

  for (i = 0; i < savedParksInState.length; i++) {
    if (savedParksInState[i].fullName === evt.target.innerText) {
      for (j=0; j<  savedParksInState[i].images.length; j++) {
        let btEl2 = document.createElement('button')
        let caption = savedParksInState[i].images[j].caption
        btEl2.innerText = 'photo: ' + caption
        document.querySelector('ul').appendChild(btEl2)
      }
      let savedParkCode = savedParksInState[i].parkCode
      buildWebCamMenu(savedParkCode)
    }
  }
})

function buildWebCamMenu(savedParkCode) {
    $.ajax({ 

        url:'https://developer.nps.gov/api/v1/webcams?parkCode=' + savedParkCode + '&api_key=gUhYAU8A9KlyEa3VexRiSjw7V34Tef1JiKl31tva'
       
      }).then( 
    
        (webCams) => {

          storedWebCams = webCams.data
          if (webCams.data.length>0) {
            
            for (i=0; i<webCams.data.length; i++) {
              let btEl2 = document.createElement('button')
              let webCamTitle = webCams.data[i].title
              btEl2.innerText = 'Web Cam: ' + webCamTitle
              document.querySelector('ul').appendChild(btEl2)
            }
          }
        }, 
        // FAILURE...
        (error) => {
            console.log('error', error)
        }
    )
}

//  function:  render photo/cam selected, find url and call it
$('#photoList').on('click', function(evt) {
  for (i = 0; i < savedParksInState.length; i++) {
    for (j=0; j < savedParksInState[i].images.length; j++) {
      if ('photo: ' + savedParksInState[i].images[j].caption === evt.target.innerText) {
        window.open(savedParksInState[i].images[j].url)
      } 
    } 

  } 
  if (storedWebCams.length > 0) {
    for (i=0; i < storedWebCams.length; i++) {
      if ('Web Cam: ' + storedWebCams[i].title === evt.target.innerText) {
        window.open(storedWebCams[i].url)
      }
    }
  }
})