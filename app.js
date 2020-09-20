const cursor = document.querySelector('.cursor');
let navLinks = document.querySelectorAll('.navigation li')

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY)+"px; left: "+(e.pageX)+"px;")
})

document.addEventListener('mousedown', () => {
  cursor.classList.add("expand");
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove("expand");
});

navLinks.forEach(link =>{
  link.addEventListener("mouseleave", () => {
    document.getElementById("cursor").innerHTML = "READ";
  });
  link.addEventListener("mouseover", () => {
    document.getElementById("cursor").innerHTML = " ";
  });
})