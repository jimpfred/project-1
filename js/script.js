

$('#main').on('click', function(evt) {
  


  $.ajax({ 

    url:'https://developer.nps.gov/api/v1/parks?stateCode=' + evt.target.id + '&api_key=gUhYAU8A9KlyEa3VexRiSjw7V34Tef1JiKl31tva'

  }).then( 

    (data) => {

        let jserize = jQuery.makeArray( data )
        for (i=0;i<jserize[0].data.length;i++) {
            document.createElement('ul')
            liEl = document.createElement("li")
            let parkName = jserize[0].data[i].fullName
            liEl.innerText = parkName
            document.querySelector('ul').appendChild(liEl)
          }
    }  
  )
})
