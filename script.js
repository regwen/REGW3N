// Throttle helper pro scroll eventy
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

const body = document.body
const themeTransition = document.getElementById('themeTransition')
const heroLeft = document.getElementById('heroLeft')
const heroRight = document.getElementById('heroRight')
const heroSwitch = document.getElementById('heroSwitch')
const switchKnob = document.getElementById('switchKnob')
const leftLabel = document.getElementById('leftLabel')
const rightLabel = document.getElementById('rightLabel')
const switchContainer = document.getElementById('switchContainer')
const floatingNav = document.getElementById('floatingNav')
const heroSwitchNav = document.getElementById('heroSwitchNav')
const switchKnobNav = document.getElementById('switchKnobNav')
const leftLabelNav = document.getElementById('leftLabelNav')
const rightLabelNav = document.getElementById('rightLabelNav')
const backToTop = document.getElementById('backToTop')

// Global state
let isHyperpopMode = false
let hasUserChosen = false

// Countdown target date: July 29, 2025
const targetDate = new Date('2025-07-29T00:00:00').getTime()

// Countdown content for different modes
const countdownContent = {
  phonk: {
    title: 'NEW RELEASE',
    subtitle: 'The darkness awakens soon',
  },
  hyperpop: {
    title: 'CHAOS UNLEASHED',
    subtitle: 'Digital madness incoming',
  },
}

// Update countdown display
function updateCountdown() {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance < 0) {
    // Countdown finished
    document.getElementById('days').textContent = '00'
    document.getElementById('hours').textContent = '00'
    document.getElementById('minutes').textContent = '00'
    document.getElementById('seconds').textContent = '00'
    return
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  document.getElementById('days').textContent = days.toString().padStart(2, '0')
  document.getElementById('hours').textContent = hours
    .toString()
    .padStart(2, '0')
  document.getElementById('minutes').textContent = minutes
    .toString()
    .padStart(2, '0')
  document.getElementById('seconds').textContent = seconds
    .toString()
    .padStart(2, '0')
}

// Update countdown content based on mode
function updateCountdownContent(mode) {
  const modeContent = countdownContent[mode]
  document.querySelector('.countdown-title').textContent = modeContent.title
  document.querySelector('.countdown-subtitle').textContent =
    modeContent.subtitle
}

// Start countdown timer
updateCountdown()
setInterval(updateCountdown, 1000)

// Fix pro mobilní vh
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Nastav vh při načtení
setVH();

// Aktualizuj vh při změně velikosti okna nebo orientace
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// Reset na hero při refreshi
window.addEventListener('beforeunload', function () {
  window.scrollTo(0, 0)
})

window.addEventListener('load', function () {
  // Reset všech stavů při načtení
  body.classList.remove('choice-made', 'hyperpop-mode', 'phonk-mode')
  document.querySelector('.content-sections').classList.remove('visible')
  document.querySelector('.choose-side-header').classList.remove('moved')

  heroLeft.classList.add('neutral')
  heroLeft.classList.remove('active')
  heroRight.classList.add('neutral')
  heroRight.classList.remove('active')

  switchContainer.classList.remove('visible')
  switchKnob.classList.remove('hyperpop')
  leftLabel.classList.add('active')
  rightLabel.classList.remove('active')

  hasUserChosen = false
  isHyperpopMode = false

  // Scrolluj na vrch
  window.scrollTo(0, 0)
})

// Content for different modes
const content = {
  phonk: {
    paragraphs: [
      {
        title: 'The Origin',
        text: "My name is Filip. I'm 24, born and raised in Prague. I release music as REGW3N – a project that began in 2022 when I decided to turn pressure, pain, and silence into something louder. I don't do small talk. I make noise that speaks for me.",
      },
      {
        title: 'The Influence',
        text: 'Most of my influence comes from the darker corners of internet culture, racing edits, anime cuts, late-night loops. That chaos felt honest. Realer than real life. So I built my sound around it: sharp, fast, unforgiving. Digital violence with emotion behind it.',
      },
      {
        title: 'The Sound',
        text: "I don't follow genres – I fuse them. My music blends phonk, hyperpop, and glitch into a sound that's aggressive, wired, and unstable. I'm not here to make pretty things. I'm here to make something that leaves a scar.",
      },
    ],
    motto: 'I WANT TO PUT THE CZECH REPUBLIC ON THE GLOBAL MUSIC MAP.',
    genres: ['PHONK', 'HYPERPOP', 'PHONK'],
    descriptions: [
      'Heavy 808s meet atmospheric pads in this nocturnal journey',
      'Where hyperpop energy crashes into phonk darkness',
      'Cinematic phonk with ethereal vocal chops',
    ],
    socials: [
      {
        name: 'Spotify',
        url: 'https://open.spotify.com/artist/3oK8ihEUBH3fvH5MyZS1Wm',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
      },
      {
        name: 'Apple Music',
        url: 'https://music.apple.com/us/artist/regw3n/1822822241',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>',
      },
      {
        name: 'YouTube Music',
        url: 'https://music.youtube.com/channel/UC0SsXj5dmMRTzlbFl0JFF4w',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104S15.924 19.104 12 19.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zm-1.2 9.732V8.496L15.6 12l-4.8 3.504z"/></svg>',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/regw3n.wav/',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
      },
      {
        name: 'TikTok',
        url: 'https://www.tiktok.com/@regw3n',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>',
      },
    ],
  },
  hyperpop: {
    paragraphs: [
      {
        title: 'The Origin',
        text: "My name is Filip, I'm 24, born and raised in Prague, Czech Republic. I make music under the name REGW3N – something I started back in 2022 when I needed an outlet to deal with all the chaos in my head. It wasn't about going viral. I just wanted to feel less alone.",
      },
      {
        title: 'The Inspiration',
        text: "A lot of my inspiration comes from internet culture, anime aesthetics, and late-night edits that feel like dreams with bass. I've always been drawn to energy, distortion, and emotion – even when it's messy. Those broken digital vibes made me want to create something real.",
      },
      {
        title: 'The Sound',
        text: "My sound is a mix of phonk, hyperpop, and glitch – all smashed together, way too fast, sometimes beautiful, sometimes not. I don't try to fit in. I make music that reflects what it feels like to be overwhelmed and alive at the same time.",
      },
    ],
    motto: 'Digital chaos will reshape the world. Starting from Prague.',
    genres: ['HYPERPOP', 'PHONK', 'HYPERPOP'],
    descriptions: [
      'Chaotic energy with crushing digital distortion',
      'Dark phonk vibes meet hyperpop insanity',
      'Neon-soaked madness with glitched vocals',
    ],
    socials: [
      {
        name: 'Spotify',
        url: 'https://open.spotify.com/artist/3oK8ihEUBH3fvH5MyZS1Wm',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
      },
      {
        name: 'Apple Music',
        url: 'https://music.apple.com/us/artist/regw3n/1822822241',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>',
      },
      {
        name: 'YouTube Music',
        url: 'https://music.youtube.com/channel/UC0SsXj5dmMRTzlbFl0JFF4w',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104S15.924 19.104 12 19.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zm-1.2 9.732V8.496L15.6 12l-4.8 3.504z"/></svg>',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/regw3n.wav/',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
      },
      {
        name: 'TikTok',
        url: 'https://www.tiktok.com/@regw3n',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>',
      },
    ],
  },
}

function toggleMode() {
  themeTransition.classList.add('active')

  setTimeout(() => {
    isHyperpopMode = !isHyperpopMode

    if (isHyperpopMode) {
      // Switch to HYPERPOP
      body.classList.add('hyperpop-mode')
      body.classList.remove('phonk-mode')
      heroLeft.classList.remove('active')
      heroRight.classList.add('active')
      switchKnob.classList.add('hyperpop')
      leftLabel.classList.remove('active')
      rightLabel.classList.add('active')

      // Update floating navigation
      if (switchKnobNav) switchKnobNav.style.transform = 'translateX(28px)'
      if (leftLabelNav) leftLabelNav.classList.remove('active')
      if (rightLabelNav) rightLabelNav.classList.add('active')

      // Skryj phonk scroll hint a zobraz hyperpop
      document.getElementById('leftScrollHint').classList.remove('visible')
      document.getElementById('rightScrollHint').classList.add('visible')

      updateContent('hyperpop')
    } else {
      // Switch to PHONK
      body.classList.remove('hyperpop-mode')
      body.classList.add('phonk-mode')
      heroLeft.classList.add('active')
      heroRight.classList.remove('active')
      switchKnob.classList.remove('hyperpop')
      leftLabel.classList.add('active')
      rightLabel.classList.remove('active')

      // Update floating navigation
      if (switchKnobNav) switchKnobNav.style.transform = 'translateX(0)'
      if (leftLabelNav) leftLabelNav.classList.add('active')
      if (rightLabelNav) rightLabelNav.classList.remove('active')

      // Skryj hyperpop scroll hint a zobraz phonk
      document.getElementById('rightScrollHint').classList.remove('visible')
      document.getElementById('leftScrollHint').classList.add('visible')

      updateContent('phonk')
    }

    setTimeout(() => {
      themeTransition.classList.remove('active')
    }, 300)
  }, 150)
}

function updateContent(mode) {
  const modeContent = content[mode]

  // Add animation classes for smooth transitions
  const paragraphs = document.querySelectorAll('.story-paragraph')
  const artistPhoto = document.querySelector('.artist-photo')

  // Animate paragraphs
  paragraphs.forEach((paragraph) => {
    paragraph.classList.add('updating')
    setTimeout(() => {
      paragraph.classList.remove('updating')
    }, 800)
  })

  // Animate photo
  if (artistPhoto) {
    artistPhoto.classList.add('mode-switch')
    setTimeout(() => {
      artistPhoto.classList.remove('mode-switch')
    }, 1000)
  }

  // Update about section paragraphs
  modeContent.paragraphs.forEach((paragraph, index) => {
    if (paragraphs[index]) {
      const h3 = paragraphs[index].querySelector('h3')
      const p = paragraphs[index].querySelector('p')

      // Smooth text transition
      setTimeout(
        () => {
          if (h3) h3.textContent = paragraph.title
          if (p) p.textContent = paragraph.text
        },
        200 + index * 100,
      )
    }
  })

  // Update motto
  const mottoText = document.getElementById('mottoText')
  if (mottoText) {
    setTimeout(() => {
      mottoText.textContent = modeContent.motto
    }, 400)
  }

  // Update track genres and descriptions - pouze pokud existují
  const genre1 = document.getElementById('genre1')
  const genre2 = document.getElementById('genre2')
  const genre3 = document.getElementById('genre3')
  const desc1 = document.getElementById('desc1')
  const desc2 = document.getElementById('desc2')
  const desc3 = document.getElementById('desc3')

  if (genre1) genre1.textContent = modeContent.genres[0]
  if (genre2) genre2.textContent = modeContent.genres[1]
  if (genre3) genre3.textContent = modeContent.genres[2]

  if (desc1) desc1.textContent = modeContent.descriptions[0]
  if (desc2) desc2.textContent = modeContent.descriptions[1]
  if (desc3) desc3.textContent = modeContent.descriptions[2]

  // Update countdown content
  updateCountdownContent(mode)

  // Update socials section
  updateSocials(modeContent.socials)
}

function updateSocials(socialsData) {
  const tracksContainer = document.querySelector('#socials .tracks')
  if (!tracksContainer) return

  // Clear existing content
  tracksContainer.innerHTML = ''

  // Add each social platform as simple clickable icon
  socialsData.forEach((social, index) => {
    const socialCard = document.createElement('div')
    socialCard.className = 'track social-icon'
    socialCard.style.cursor = 'pointer'
    socialCard.onclick = () => window.open(social.url, '_blank')
    socialCard.innerHTML = `
                    <div class="social-icon-container">
                        ${social.icon}
                        <span class="social-name">${social.name}</span>
                    </div>
                `

    // Add animation delay
    socialCard.style.animationDelay = `${index * 0.1}s`
    tracksContainer.appendChild(socialCard)
  })
}

function activatePhonkMode() {
  // Animuj "Choose Your Side" text nahoru
  document.querySelector('.choose-side-header').classList.add('moved')

  setTimeout(() => {
    heroLeft.classList.remove('neutral')
    heroRight.classList.remove('neutral')
    heroLeft.classList.add('active')
    heroRight.classList.remove('active')
    switchContainer.classList.add('visible')
    switchKnob.classList.remove('hyperpop')
    leftLabel.classList.add('active')
    rightLabel.classList.remove('active')

    // DŮLEŽITÉ: Odstraň hyperpop mode a zajisti phonk pozadí
    body.classList.remove('hyperpop-mode')
    body.classList.add('phonk-mode')

    // Zobraz scroll hint JEN pro aktivní phonk stranu
    document.getElementById('leftScrollHint').classList.add('visible')
    document.getElementById('rightScrollHint').classList.remove('visible')

    // NEPOVOLUJ scrollování - uživatel musí kliknout na scroll hint
    // body.classList.add('choice-made');
    // document.querySelector('.content-sections').classList.add('visible');

    updateContent('phonk')
    isHyperpopMode = false
  }, 300)
}

function activateHyperpopMode() {
  // Animuj "Choose Your Side" text nahoru
  document.querySelector('.choose-side-header').classList.add('moved')

  setTimeout(() => {
    heroLeft.classList.remove('neutral')
    heroRight.classList.remove('neutral')
    heroLeft.classList.remove('active')
    heroRight.classList.add('active')
    switchContainer.classList.add('visible')
    switchKnob.classList.add('hyperpop')
    leftLabel.classList.remove('active')
    rightLabel.classList.add('active')
    body.classList.add('hyperpop-mode')
    body.classList.remove('phonk-mode')

    // Zobraz scroll hint JEN pro aktivní hyperpop stranu
    document.getElementById('rightScrollHint').classList.add('visible')
    document.getElementById('leftScrollHint').classList.remove('visible')

    // NEPOVOLUJ scrollování - uživatel musí kliknout na scroll hint
    // body.classList.add('choice-made');
    // document.querySelector('.content-sections').classList.add('visible');

    isHyperpopMode = true
    updateContent('hyperpop')
  }, 300)
}

// Event listeners - upravené
heroSwitch.addEventListener('click', toggleMode)

heroLeft.addEventListener('click', () => {
  if (!hasUserChosen) {
    // První volba - aktivuj PHONK
    activatePhonkMode()
    hasUserChosen = true
  } else if (isHyperpopMode) {
    toggleMode()
  }
})

heroRight.addEventListener('click', () => {
  if (!hasUserChosen) {
    // První volba - aktivuj HYPERPOP
    activateHyperpopMode()
    hasUserChosen = true
  } else if (!isHyperpopMode) {
    toggleMode()
  }
})

// Keyboard shortcut
document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    e.preventDefault()
    toggleMode()
  }
})

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    // Pokud je to scroll hint link, povol scrollování a zablokuj hero sekci
    if (this.classList.contains('scroll-text')) {
      body.classList.add('choice-made')
      document.querySelector('.content-sections').classList.add('visible')

      // Hide hero section completely
      const heroSection = document.querySelector('.split-hero')
      heroSection.style.display = 'none'

      // Show floating navigation
      if (floatingNav) {
        floatingNav.classList.add('visible')

        // Set floating nav to correct mode
        if (isHyperpopMode) {
          if (switchKnobNav) switchKnobNav.style.transform = 'translateX(28px)'
          if (leftLabelNav) leftLabelNav.classList.remove('active')
          if (rightLabelNav) rightLabelNav.classList.add('active')
        }
      }

      // Prevent scrolling back to top
      history.pushState(null, null, '#content')
      window.addEventListener('scroll', function () {
        if (window.scrollY === 0) {
          window.scrollTo(0, 1)
        }
      })
    }

    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
      })
    }
  })
})

// Play button interactions
document.querySelectorAll('.play-btn').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation()
    this.style.transform = 'scale(0.9)'
    setTimeout(() => {
      this.style.transform = 'scale(1)'
    }, 150)
  })
})

// Floating navigation scroll effects
window.addEventListener('scroll', function () {
  if (!floatingNav || !body.classList.contains('choice-made')) return

  // Show/hide back to top button based on scroll position
  if (window.scrollY > window.innerHeight * 0.8) {
    if (backToTop) backToTop.classList.add('visible')
  } else {
    if (backToTop) backToTop.classList.remove('visible')
  }

  // Add scrolled class for scaling effect when scrolling down
  if (window.scrollY > 200) {
    floatingNav.classList.add('scrolled')
  } else {
    floatingNav.classList.remove('scrolled')
  }
})

// Back to top button functionality
if (backToTop) {
  backToTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}

// Floating navigation toggle mode
if (heroSwitchNav) {
  heroSwitchNav.addEventListener('click', toggleMode)
}

// Initialize content on page load
window.addEventListener('DOMContentLoaded', function () {
  // Initialize with phonk mode content by default
  updateContent('phonk')
})

// Progress Ring Functionality
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress')
  const progressRing = document.getElementById('progressRingProgress')
  const progressText = document.getElementById('progressText')

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight
  const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)

  // Show/hide progress ring based on scroll
  if (scrollTop > 300) {
    scrollProgress.classList.add('visible')
  } else {
    scrollProgress.classList.remove('visible')
  }

  // Update ring progress
  const circumference = 163.36 // 2 * PI * 26
  const offset = circumference - (scrollPercentage / 100) * circumference
  progressRing.style.strokeDashoffset = offset
  progressText.textContent = scrollPercentage + '%'
}

// Setup scroll progress
window.addEventListener('scroll', updateScrollProgress)
updateScrollProgress() // Initial call

// Progress Timeline Animation
function observeProgressTimeline() {
  const progressFill = document.querySelector('.progress-fill')
  const steps = document.querySelectorAll('.step')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate progress line
          setTimeout(() => {
            if (progressFill) {
              progressFill.style.width = '75%' // Fill to 75% (3 completed out of 4 steps)
            }
          }, 500)

          // Animate steps with delay
          steps.forEach((step, index) => {
            setTimeout(
              () => {
                step.style.opacity = '1'
                step.style.transform = 'translateY(0)'
              },
              500 + index * 200,
            )
          })
        }
      })
    },
    { threshold: 0.3 },
  )

  const timeline = document.querySelector('.progress-timeline')
  if (timeline) {
    // Initially hide steps
    steps.forEach((step) => {
      step.style.opacity = '0'
      step.style.transform = 'translateY(20px)'
      step.style.transition = 'all 0.6s ease'
    })

    observer.observe(timeline)
  }
}

// Initialize progress timeline when page loads
window.addEventListener('DOMContentLoaded', function () {
  observeProgressTimeline();
  
  // Loading Screen Animation
  const loadingScreen = document.querySelector('.loading-screen');
  const splitHero = document.querySelector('.split-hero');
  const loadingLogo = document.querySelector('.loading-logo');
  
  // Skryj hero sekci během načítání
  if (splitHero) splitHero.style.opacity = '0';
  
  // Počkej na načtení všech zdrojů
  window.addEventListener('load', function() {
    setTimeout(() => {
      // Animuj logo rozdělení
      if (loadingLogo) {
        loadingLogo.style.gap = '3rem';
        loadingLogo.style.transform = 'scale(1.2)';
        // Přidáme třídu pro aktivaci transition
        loadingLogo.classList.add('animating');
      }
      
      setTimeout(() => {
        // Fade out loading screen
        if (loadingScreen) {
          loadingScreen.style.opacity = '0';
          loadingScreen.style.transform = 'translateY(-20px)';
        }
        
        // Zobraz hero sekci
        if (splitHero) splitHero.style.opacity = '1';
        
        // Odstraň loading screen
        setTimeout(() => {
          if (loadingScreen) loadingScreen.style.display = 'none';
        }, 500);
      }, 1000);
    }, 1500);
  });
})
