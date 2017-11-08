//Controller for uploadimg files

function getFileExtension(filename){
  return filename.split('.')[1]
}

function displayFiles(filename){
  switch(getFileExtension(filename)){
    case 'html':
      return `
        <div class="file-card">
          <div class="file-img">
            <img src="../assets/html-icon.png">
          </div>
          <div class="file-name">
            <h5 class="text-center">`+filename+`</h5>
          </div>
        </div>
      `
    case 'css':
    case 'CSS':
      return `
        <div class="file-card">
          <div class="file-img">
            <img src="../assets/css-512.png">
          </div>
          <div class="file-name">
            <h5 class="text-center">`+filename+`</h5>
          </div>
        </div>
      `

    case 'js':
      return `
        <div class="file-card">
          <div class="file-img">
            <img src="../assets/js-icon.png">
          </div>
          <div class="file-name">
            <h5 class="text-center">`+filename+`</h5>
          </div>
        </div>
      `
  }
}

$('#file').on('change', function(e){
  var files = $(this).get(0).files
  console.log(files)
  //hide info text
  $('#info').remove()

  //Display uploaded files
  if(!$('#file-display').html())
    $('#upload-wraper').append('<div id="file-display"></div>')

  //Append uploaded files
  for(var i=0;i<files.length;i++){
    console.log(files[i])
    $('#file-display').append(displayFiles(files[i].name))
  }

  //Detect if index.html is uploaded or not
  var detectIndexFile = 'index.html not found !!'
  var notFound = true
  if(notFound)
    for(var i=0;i<files.length;i++){
      if(files[i].name == 'index.html'){
        notFound = false
        detectIndexFile = 'index.html detected !!'
      }
    }

  //Append info div
  if(!$('#index-display').html())
    $('#upload-wraper').append('<div id="index-display"><p class="text-center">'+detectIndexFile+'</p></div>')
  else {
    $('#index-display p').text(detectIndexFile)
  }

})
