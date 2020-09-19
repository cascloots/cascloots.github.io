const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY)+"px; left: "+(e.pageX)+"px;")
})

document.addEventListener('mousedown', () => {
  cursor.classList.add("expand");
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove("expand");
});

('.single-item').slick();