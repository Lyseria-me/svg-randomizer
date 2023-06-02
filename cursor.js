document.addEventListener('DOMContentLoaded', function() {
  
  // adding the cursor
  document.body.innerHTML += `
        <div id="cursor">
          <svg width="24" height="30" viewBox="0.5 0.5 20 25">
            <path d="M 1 1 L 1 18 L 5 14 L 7 19 L 9 18 L 7 13 L 13 13 Z"/>
          </svg>
        </div>
        `
  
  const cursor = document.getElementById('cursor');

  // adding the cursor's style
  const styles = `
    * {
      cursor: none;
    }
  
    #cursor {
      cursor: none;
      pointer-events: none;
      position: absolute;
      display: none;
      fill: #63729c;
      stroke-width: 0;
      stroke-linejoin: round;
    
      top: 0;
      left: 0;
      z-index: 9999;
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
  


  // handling the cursor
  document.addEventListener('mouseleave', function() {
    cursor.style.display = 'none'
  });
  
  document.addEventListener('mouseout', function() {
    cursor.style.display = 'none'
  });
  
  document.addEventListener('mouseover', function(event) {
    
    const x = event.clientX;
    const y = event.clientY;
      
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.display = 'block'
  });
  
  document.addEventListener('mousemove', function(event) {
  
    const x = event.clientX;
    const y = event.clientY;
      
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.display = 'block'
    
  });
  
})
