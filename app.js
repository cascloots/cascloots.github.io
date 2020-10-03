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

const element = ({ type, className, content, src, alt, children }) => {
  const element = document.createElement(type);
  element.classList.add(className);
  
  if (content) element.innerText = content;
  if (src) element.src = src;
  if (alt) element.alt = alt;

  if (children && children.length) {
    for (child of children) {
      element.appendChild(child);
    }
  }

  return element;
};

/** create elements from json*/
const generateCases = cases => cases.map(( item, index ) => {
  getElement({ id: 'cases', children: [
    element({ type: 'div', className: index % 2 ? 'case-odd' : 'case-even', children: [
      element({ type: 'h3', className: 'case-category', content: `↓ ${item.category} ↓` }),
      element({ type: 'h1', className: 'case-title', content: `${item.client} - ${item.title}` }),
      element({ type: 'div', className: 'main-carousel', children: item.carousel.map(image => (
        element({ type: 'img', className: 'carousel-cell', src: image.src, alt: image.alt })
      ))}),
      element({ type: 'ul', className: 'case-info', children: [
        element({ type: 'li', className: 'case-project', content: `PROJECT: ${item.project}` }),
        element({ type: 'li', className: 'case-project', content: `ROLE: ${item.role}` }),
        element({ type: 'li', className: 'case-project', content: `DEMO: ${item.demo}` })
      ] }),
      element({ type: 'p', className: 'case-description', content: `${item.description}` })
    ]})
  ]});
});

loadJSON('cases.json', generateCases);
