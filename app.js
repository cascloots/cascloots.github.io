const cursor = document.querySelector('.cursor');
let navLinks = document.querySelectorAll('.navigation li')

/** track cursor aand apply style */
document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY)+"px; left: "+(e.pageX)+"px;")
})

/** animation on click */
document.addEventListener('mousedown', () => {
  cursor.classList.add("expand");
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove("expand");
});

/** change cursor when hovering links */
navLinks.forEach(link =>{
  link.addEventListener("mouseleave", () => {
    document.getElementById("cursor").innerHTML = "READ";
  });
  link.addEventListener("mouseover", () => {
    document.getElementById("cursor").innerHTML = " ";
  });
});

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

const element = ({ type, className, content, children }) => {
  const element = document.createElement(type);
  element.classList.add(className);
  element.innerText = content;

  if (children && children.length) {
    for (child of children) {
      element.appendChild(child);
    }
  }

  return element;
};

const generateCases = cases => cases.map(( item, index ) => {
  getElement({ id: 'cases', children: [
    element({ type: 'div', className: index % 2 ? 'case-odd' : 'case-even', children: [
      element({ type: 'h1', className: 'case-title', content: item.title }),
      element({ type: 'p', className: 'case-description', content: item.description })
    ]})
  ]});
});

loadJSON('cases.json', generateCases);
