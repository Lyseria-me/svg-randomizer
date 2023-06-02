document.addEventListener('DOMContentLoaded', function() {

  // setting up the saying functionement
  function say(html) {
    var saying = document.getElementById("saying");
    saying.innerHTML = html
    saying.style.animation = ''
    setTimeout(function() {
      saying.style.animation = 'showing 5s forwards';
    }, 0);
  }

  // set update function...
  function update() {

    // ...for the image's size
    const width = document.getElementById("width");
    const height = document.getElementById("height");

    const image = document.querySelector("#image");

    image.style.width = width.value * 4 + 'px';
    image.style.height = height.value * 4 + 'px';

    // ...for the image's bg
    const bg = document.getElementById("bg");
    image.style.backgroundColor = bg.value;

    // ...for the generated image
    const path = document.querySelector("#image path");
    const color = document.getElementById("color");
    const borderColor = document.getElementById("borderColor");
    path.setAttribute("fill", color.value);
    path.setAttribute("stroke", borderColor.value);

    const width_label = document.querySelector("label[for='width']");
    const height_label = document.querySelector("label[for='height']");
    const color_label = document.querySelector("label[for='color']");
    const borderColor_label = document.querySelector("label[for='borderColor']");

    width_label.textContent = 'width: ' + width.value + '%';
    height_label.textContent = 'height: ' + height.value + '%';
    color_label.textContent = 'color: ' + color.value;
    borderColor_label.textContent = 'border color: ' + borderColor.value;
    

    
    // ...for the saves
    let dict = JSON.parse(localStorage.getItem('dict'))
    if (!Array.isArray(dict) || dict.length === 0) {
      localStorage.setItem('dict', JSON.stringify([['default', `<svg width="200" height="200">
  <path d="M80 50 A50 50 0 1 0 120 50 L120 80 A20 20 0 1 1 80 80 Z" 
        fill="#000" stroke="none"/>
</svg>`]]));
    }
    dict = JSON.parse(localStorage.getItem('dict'))
    const files = document.querySelector("#open ul")
    files.innerHTML = ''
    for (var i = 0; i < dict.length; i++) {
      files.innerHTML += `<li data-index=${i}><a>${dict[i][0]}</a><button class="delete">x</button></li>`
    }

    
    const open_div = document.querySelector("#open ul");
    const opens = document.querySelectorAll("#open li a");
    const deletes = document.querySelectorAll("#open li button");
  
    opens.forEach(function(open, index) {
      open.removeEventListener('click', function() {
  
        open_div.outerHTML = open_div.outerHTML
        
        dict = JSON.parse(localStorage.getItem('dict'))
        image.innerHTML = dict[index][1]

        history()
      })
      open.addEventListener('click', function() {
        
        open_div.outerHTML = open_div.outerHTML
        
        dict = JSON.parse(localStorage.getItem('dict'))
        image.innerHTML = dict[index][1]

        const svg = document.querySelector("#image svg");
        const path = document.querySelector("#image svg path");
    
        const width = document.getElementById("width");
        const height = document.getElementById("height");
        const color = document.getElementById("color");
        const borderColor = document.getElementById("borderColor");

        width.value = svg.getAttribute('width')/4
        height.value = svg.getAttribute('height')/4
        color.value = path.getAttribute('fill')
        borderColor.value = path.getAttribute('stroke')

        history()
      })
    })
    
    deletes.forEach(function(del, index) {
      del.removeEventListener('click', function() {
  
        dict = JSON.parse(localStorage.getItem('dict'))
        dict.splice(index, 1)
        
        localStorage.setItem('dict', JSON.stringify(dict));
        update()
      })
      del.addEventListener('click', function() {
  
        dict = JSON.parse(localStorage.getItem('dict'))
        dict.splice(index, 1)
        
        localStorage.setItem('dict', JSON.stringify(dict));
        update()
      })
    })
    
    open_div.removeEventListener('click', function(){
      open_div.style.display = ""
    })
    open_div.addEventListener('mouseout', function(){
      open_div.style.display = ""
    }) 
  }
  
  history_count = 0
  function history() {
    update()
    history_count ++
    let history_option = document.querySelector('#history ul');
    const current_img = document.getElementById('image').innerHTML;
    
    const new_history = document.createRange().createContextualFragment(`<li><a>${history_count}${current_img}</a></li>`);
    history_option.insertBefore(new_history, history_option.firstChild);

    history_option = document.querySelector('#history ul');
    history_option.firstElementChild.firstElementChild.addEventListener('click', function(event) {
      image = document.getElementById('image');
      image.innerHTML = ""
      image.appendChild(event.currentTarget.firstElementChild.cloneNode(true))
      history_option.insertBefore(event.currentTarget.parentNode, history_option.firstChild);

      const svg = document.querySelector("#image svg");
      const path = document.querySelector("#image svg path");
      
      const width = document.getElementById("width");
      const height = document.getElementById("height");
      const color = document.getElementById("color");
      const borderColor = document.getElementById("borderColor");
  
      width.value = svg.getAttribute('width')/4
      height.value = svg.getAttribute('height')/4
      color.value = path.getAttribute('fill')
      borderColor.value = path.getAttribute('stroke')
      
      update()
    })
    
    if (history_option.childElementCount > 99) {
      history_option.lastElementChild.remove()
    }
    update()
  }
  
  
  update()

    // set the menu
    const blur = document.querySelector('.blur')   // blur around the save window
    const save_div = document.querySelector('.blur .pop')  // save window itself
  
    const new_ = document.querySelector('#menu #new')   // new menu option
    const save = document.querySelector('#menu #save')   // save menue option
    const save_ = document.querySelector(".pop button");   // button to save the chosen name on the save window

  blur.addEventListener('click', function(event) {
    /* Way to exit the save window if changed its mind*/
    if (!save_div.contains(event.target)) {
      blur.style.display = 'none'
    }
  })
  
  new_.addEventListener('click', function() {
    /* It is a llitle useless but it erease the image */
    image.innerHTML = `
            <svg width="200" height="200">
              <path d="" fill="#000" stroke="none"/>
            </svg>`
  })
  save.addEventListener('click', function() {
    /* Make the save window in the blur visible and not none displayed */
    blur.style.display = "flex"
  })
  save_.addEventListener('click', function() {
    /* hide  back the save window with the blur then save the current image with the chosen name .pop input */
    blur.style.display = "none"

    const save_name = document.querySelector(".pop input")
    const svg = image.innerHTML
    const dict = JSON.parse(localStorage.getItem('dict'))
    dict.push([save_name.value.replace(/ /g, "&nbsp;"), svg])
    localStorage.setItem('dict', JSON.stringify(dict));
    save_name.value = ''
  
    update()
  })

  
  // set the tabs of options
  let panels = document.querySelectorAll('.panel');
  let tabs = document.querySelectorAll('#tabs button');
  tabs.forEach(function(tab, i){
    tab.addEventListener('click', function(){
      tabs.forEach(function(tab_){
        tab_.classList.remove('active');
      });
      tab.classList.add('active')
      panels.forEach(function(panel){
        panel.classList.remove('active')
      })
      panels[i].classList.add('active')
    })
  })

  // set random function with guidance
  function randomGuidance(size, guidance, range) {
    let a = size - (size - range[0]) * guidance / 100; // 10-(10-0)*50/100
    let b = size + (range[1] - size) * guidance / 100; // 10+(100-10)*50/100

    return Math.floor(Math.random() * (b - a) + a);
  }
  
  // set random interget function 
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }




  // get width
  const width = document.getElementById("width");

  // set width
  width.addEventListener("input", function() {
    update()
  })

  //get height
  const height = document.getElementById("height");

  // set height
  height.addEventListener("input", function() {
    update()
  })

  //get size guidance
  const size_guidance = document.getElementById("size_guidance");
  const size_guidance_label = document.querySelector("label[for='size_guidance']");

  // set size guidance
  size_guidance.addEventListener("input", function() {
    size_guidance_label.textContent = 'size guidance: ' + size_guidance.value + '%';
  })

  //get size
  const size = document.getElementById("size");
  const size_label = document.querySelector("label[for='size']");

  // set size
  size.addEventListener("input", function() {
    size_label.textContent = 'size: ' + size.value + ' objects';
  })

  // get bg
  const bg = document.getElementById("bg");
  const bg_label = document.querySelector("label[for='bg']");

  // set bg
  bg.addEventListener("input", function() {
    bg_label.textContent = 'bg: ' + bg.value;
    update()
  })

  // get color
  const color = document.getElementById("color");

  // set color
  color.addEventListener("input", function() {
    update()
  })
  // get borderColor
  const borderColor = document.getElementById("borderColor");

  // set borderColor
  borderColor.addEventListener("input", function() {
    update()
  })
  // get strength variation
  const strength_variation = document.getElementById("strength_variation");
  const strength_variation_label = document.querySelector("label[for='strength_variation']");

  // set strength variation
  strength_variation.addEventListener("input", function() {
    strength_variation_label.textContent = 'strenght of variation: ' + strength_variation.value;
    update()
  })

  
  // randomize path order
  const randomize_path_order = document.getElementById("randomize_path_order");
  randomize_path_order.addEventListener("click", function() {
    const image = document.getElementById('image');
    var path = image.firstElementChild.firstElementChild.getAttribute('d')
    if (path != "") {
  
      list = path.split(/[MLZ]/).filter(Boolean);
        
      let new_path = ""
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
        
      list.forEach(function(value, i) {
        if (i == 0) {
          new_path += "M" + value
        } else {
          new_path += "L" + value
        }
      })
      new_path += "Z"
  
      image.firstElementChild.firstElementChild.setAttribute('d', new_path)
      history()
    }
  
  })

  

  // optimize pathes order
  const optimize_path_order = document.getElementById("optimize_path_order");
  optimize_path_order.addEventListener("click", function() {
    for (let i = 1; true; i ++) { 
      const image = document.getElementById('image');
      var path = image.firstElementChild.firstElementChild.getAttribute('d')
      if (path != "") {
  
        list = path.split(/[MLZ]/).filter(Boolean);
        
        let new_path = ""
        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
        }
        
        list.forEach(function(value, i) {
          if (i == 0) {
            new_path += "M" + value
          } else {
            new_path += "L" + value
          }
        })
        new_path += "Z"

        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', new_path);
        const pathLength = pathElement.getTotalLength();
        
        if (pathLength < image.firstElementChild.firstElementChild.getTotalLength()) {
          image.firstElementChild.firstElementChild.setAttribute('d', new_path)
          history()
          break
        }
      }
      if (i % 1000000 === 0) {
        say(`<label style="font-size: 80%; opacity=0; color: red!important;">seems like there's no more optimization available</label>`)
        break
      }
    }
    update()
  })

  function pathIntersectsSelf(pathString) {
    // Parse the path string into an array of commands
    const commands = pathString.split(/(?=[MLZ])/);
  
    // Convert each command to an array of coordinates
    let coords = [];
    for (let i = 0; i < commands.length; i++) {
      const [type, ...args] = commands[i].split(/\s+/);
      switch (type) {
        case 'M':
        case 'L':
          coords.push([Number(args[0]), Number(args[1])]);
          break;
        case 'Z':
          coords.push(coords[0]); // Close the path by returning the first coordinate
          break;
      }
    }
  
    // Iterate through each pair of segments and check for intersection
    for (let i = 0; i < coords.length - 1; i++) {
      for (let j = i + 1; j < coords.length - 1; j++) {
        if (segmentsIntersect(coords[i], coords[i+1], coords[j], coords[j+1])) {
          return true;
        }
      }
    }
  
    return false;
  }
  
  // Helper function to check if two line segments intersect
  function segmentsIntersect(a, b, c, d) {
  const ccw = (p1, p2, p3) => (p3[1]-p1[1])*(p2[0]-p1[0]) > (p2[1]-p1[1])*(p3[0]-p1[0]);
  return (ccw(a,c,d) !== ccw(b,c,d)) && (ccw(a,b,c) !== ccw(a,b,d)) &&
         (ccw(c,a,b) !== ccw(d,a,b)) && (ccw(c,b,a) !== ccw(d,b,a));
  }
  

  const optimize_path_shape = document.getElementById("optimize_path_shape");
  optimize_path_shape.addEventListener("click", function() {
    for (let i = 1; true; i ++) { 
      const image = document.getElementById('image');
      var path = image.firstElementChild.firstElementChild.getAttribute('d')
      if (path != "") {
  
        list = path.split(/[MLZ]/).filter(Boolean);
        
        
        let new_path = ""
        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
        }
        
        list.forEach(function(value, i) {
          if (i == 0) {
            new_path += "M" + value
          } else {
            new_path += "L" + value
          }
        })
        new_path += "Z"


        if (!pathIntersectsSelf(new_path)) {
          image.firstElementChild.firstElementChild.setAttribute('d', new_path)
          history()
          break
        }

        if (i % 10000 === 0) {
          say(`<label style="font-size: 80%; opacity=0; color: red!important;">seems like the optimization took too long to by loaded you can try again</label>`)
          break
        }
      }
    update()
    }
  })

  const vary_path_coordinates = document.getElementById("vary_path_coordinates");
  vary_path_coordinates.addEventListener("click", function() {

    // parameters
    var box = [document.getElementById("width").value, // used
    document.getElementById("height").value] // used
    const size_guidance = document.getElementById("size_guidance").value; // 
    const size = document.getElementById("size").value; // 

    const image = document.getElementById('image');

    const path = document.querySelector('#image path').getAttribute('d')
    
    new_path = ''
    const strength = parseInt(document.getElementById("strength_variation").value)
    

    // Iterate over the path
    list = path.split(' ')
    list.forEach(function(value) {
      if (/^\d*\.?\d+$/.test(value)) {
        value = parseInt(value)
        value = randomInt(value-strength, value+strength)
        
        if (value <= 0) {
          value = 1
        } if (value > box[0] || value > box[1]) {
          value = Math.min(box[0], box[1])
        }
        new_path += value.toString() + ' '
      }else {
        new_path += value + ' '
      }
    })

  image.innerHTML = `
    <svg width=${box[0] * 4} height=${box[1] * 4} viewBox="0 0 ${box[0]} ${box[1]}">
      <path d="${new_path.slice(0, -1)}" fill="black" stroke="black" stroke-width="1" stroke-linejoin="round" />
    </svg>`
  history()
  update()
  })




  

  
  const copy_html = document.getElementById("copy_html")
  const copy_svg = document.getElementById("copy_svg")
  const download = document.getElementById("download")
  const download_as = document.getElementById("download_as")
  

  copy_html.addEventListener("click", function() {
    navigator.clipboard.writeText(image.firstElementChild.outerHTML)
    say(`<label style="font-size: 80%; opacity=0; color: lawngreen!important;">HTML code copied !</label>`)
  });
  copy_svg.addEventListener("click", function() {
    navigator.clipboard.writeText(image.firstElementChild.firstElementChild.getAttribute('d'))
    say(`<label style="font-size: 80%; opacity=0; color: lawngreen!important;">SVG path copied !</label>`)
  });
  download.addEventListener("click", function() {

    const image = document.querySelector("#image");
  
    html2canvas(image).then(function(canvas) {

      var imgData = canvas.toDataURL();
  
      var link = document.createElement('a');
      link.href = imgData;
      link.download = `my-image.${download_as.value}`;
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  })
  
  
  const generate = document.querySelector("#settings > button");
  generate.addEventListener("click", function() {

    // parameters
    var box = [document.getElementById("width").value, // used
    document.getElementById("height").value] // used
    const size_guidance = document.getElementById("size_guidance").value; // 
    const size = document.getElementById("size").value; // 

    // comming path
    var path = `M ${randomInt(0, box[0])} ${randomInt(0, box[1])}`

    let size_ = randomGuidance(parseInt(size), 100 - parseInt(size_guidance), [0, 20])

    for (let i = 0; i < size_ - 1; i++) {
      path += ` L ${randomInt(0, box[0])} ${randomInt(0, box[1])}`
    }
    path += ' Z'

    const image = document.getElementById('image');
    image.innerHTML = `
    <svg width=${box[0] * 4} height=${box[1] * 4} viewBox="0 0 ${box[0]} ${box[1]}">
      <path d="${path}" fill="black" stroke="black" stroke-width="1" stroke-linejoin="round" />
    </svg>`
    history()
    update()
  })
})
