window.addEventListener('scroll', (event) => {
  if(window.scrollY > 80) {
    navigation.classList.add('scrolled')
  } else {
    navigation.classList.remove('scrolled')
  }
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.classList.add('revealed')
    } else {
      entry.target.classList.remove('revealed')
    }
  })
})

document.querySelectorAll('.show-on-scroll')
  .forEach(target => observer.observe(target))
