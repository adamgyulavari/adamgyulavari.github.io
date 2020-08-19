const isInViewport = element => {
  const bounding = element.getBoundingClientRect();
  const windowBottom = window.innerHeight || document.documentElement.clientHeight
  const overTop = bounding.bottom < 100
  const belowBottom = bounding.top > windowBottom - 50
  return !(overTop || belowBottom)
}

const activateSection = section => {
  const selector = section.getAttribute('id')
  const element = document.querySelector(`#${selector}-link`)
  element.classList.add('active')
}

const sections = Array.from(document.querySelectorAll('section'))

window.addEventListener('scroll', () => {
  if(window.scrollY > 80) {
    navigation.classList.add('scrolled')
  } else {
    navigation.classList.remove('scrolled')
  }
})

const highlightNav = () => {
  document.querySelectorAll('nav a')
    .forEach(element => element.classList.remove('active'))
  activateSection(sections.find(isInViewport))
}

window.addEventListener('scroll', throttle(() => {
  highlightNav()
}, 200))

highlightNav()

const revealer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.classList.add('revealed')
    } else {
      entry.target.classList.remove('revealed')
    }
  })
})

document.querySelectorAll('.show-on-scroll')
  .forEach(target => revealer.observe(target))

document.querySelectorAll('nav a')
  .forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault()
      const selector = event.target.getAttribute('href')
      const target = document.querySelector(selector)
      const scrollY = target.getBoundingClientRect().top + window.pageYOffset - 100
      window.scrollTo({ top: scrollY, behavior: 'smooth' })
    })
  })

function throttle(callback, limit) {
  let waiting = false
  return function () {
    if (!waiting) {
      callback.apply(this, arguments)
      waiting = true
      setTimeout(function () {
        waiting = false
      }, limit);
    }
  }
}
