const cursor = document.querySelector('.cursor');
let navLinks = document.querySelectorAll('.navigation li');

/** track cursor aand apply style */
// document.addEventListener('mousemove', e => {
//     cursor.setAttribute("style", "top: "+(e.pageY)+"px; left: "+(e.pageX)+"px;")
// })

/** animation on click */
// document.addEventListener('mousedown', () => {
//   cursor.classList.add("expand");
// });

// document.addEventListener('mouseup', () => {
//   cursor.classList.remove("expand");
// });

// /** change cursor when hovering links */
// navLinks.forEach(link =>{
//   link.addEventListener("mouseleave", () => {
//     document.getElementById("cursor").innerHTML = "READ";
//     setTimeout(function(){ cursor.classList.remove("outlineLink") }, 275);

//   });
//   link.addEventListener("mouseover", () => {
//     document.getElementById("cursor").innerHTML = " ";
//     cursor.classList.add("outlineLink")
//   });
// });

var message = "Come back we miss you 👈";
var original = document.title;

window.onblur = function () { document.title = message; }
window.onfocus = function () { document.title = original; }

//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 120px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/** load json data */
const loadJSON = (file, callback) => {
  const xobj = new XMLHttpRequest();

  xobj.overrideMimeType("application/json");
  xobj.open('GET', file, true);
  xobj.onreadystatechange = () => {
    if (xobj.status === 200 && xobj.readyState === 4) {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
};

const getElement = ({ id, children }) => {
  const container = document.getElementById(id);

  for (child of children) {
    container.appendChild(child);
  }
}

const element = ({ type, className, content, src, href, alt, children }) => {
  const element = document.createElement(type);
  element.classList.add(className);
  
  if (content) element.innerText = content;
  if (src) element.src = src;
  if (alt) element.alt = alt;
  if (href) {
    element.href = href;
    element.target="_blank";
    element.rel="noopener nofollow";
  }
  if (children && children.length) {
    for (child of children) {
      element.appendChild(child);
    }
  }

  return element;
};

/** create elements from json*/
const generateCases = cases => {
  cases.map((item, index) => {
    getElement({
      id: 'cases', children: [
        element({
          type: 'div', className: index % 2 ? 'odd' : 'even', children: [
            element({
              type: 'div', className: 'case-header', children: [
                element({
                  type: 'div', className: 'content', children: [
                    element({ type: 'h2', className: 'case-category', content: `↓ ${item.category} ↓` }),
                    element({
                      type: 'h1', className: 'case-title', children: [
                    element({ type: 'span', className: 'case-client', content: `${item.client} - ` }),
                    element({ type: 'span', content: `${item.title}` }),
                  ]
                }),
                  ]
                }),
              ]
            }),
            element({
              type: 'div', className: 'main-carousel', children: item.carousel.map(image => (
                element({ type: 'img', className: 'carousel-cell', src: image.src, alt: image.alt })
              ))
            }),
            element({
              type: 'div', className: 'case-info', children: [
                element({
                  type: 'div', className: 'contentCase', children: [
                    element({
                      type: 'ul', className: 'case-roles', children: [
                        element({ type: 'li', className: 'case-project', content: `${item.project}` }),
                        element({ type: 'li', className: 'case-role', content: `${item.role}` }),
                        element({
                          type: 'li', className: 'case-demo', children: [
                        element({ type: 'a', className: 'underline', href: `${item.demo.link}`, content: `${item.demo.text}` })
                      ]
                    }),
                      ]
                    }),
                    element({
                      type: 'p', className: 'case-description', children: [
                      element({
                          type: 'p', className: 'case-intro', children: [
                      element({ type: 'span', className: 'case-year', content: `${item.year} - ` }),
                      element({ type: 'span', content: `${item.description_intro}` }),
                    ]
                  }),
                    element({ type: 'p', content: `${item.description_work}` })
                  ]
                }),
                  ]
                }),
              ]
            }),
          ]
        })
      ]
    });
  });

  // The generateCases function gets called when cases.json is loaded. Moved Flickity initiation to this function so it only gets called when the json is loaded.

  const elem = document.querySelectorAll('.main-carousel');

  elem.forEach(elem => {
    const flickity = new Flickity(elem, {
      // options
      lazyload: 1,
      value: true,
      freeScroll: false,
      contain: true,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true
    });

    // Manually dispatch a resize event to fix an invisible flickity slider bug.

    const el = document;
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    el.dispatchEvent(event);
  });
}

loadJSON('cases.json', generateCases);

// let elem = document.querySelectorAll('.main-carousel');

// elem.forEach(elem =>{
//   var elem = new Flickity( elem, {
//     // options
//     value: true,
//     freeScroll: false,
//     contain: true,
//     prevNextButtons: false,
//     pageDots: false,
//     wrapAround: true 
//   });
// });
