import {addZero}  from './addZero.js'

export const musicPlayerInit = () => {
  const audio = document.querySelector('.audio')
  const audioImg = document.querySelector('.audio-img')
  const audioHeader = document.querySelector('.audio-header')
  const audioPlayer = document.querySelector('.audio-player')
  const audioNavigation = document.querySelector('.audio-navigation')
  const audioButtonPlay = document.querySelector('.audio-button__play')
  const audioProgress = document.querySelector('.audio-progress')
  const audioProgressTiming = document.querySelector('.audio-progress__timing')
  const audioTimePassed = document.querySelector('.audio-time__passed')
  const audioTimeTotal = document.querySelector('.audio-time__total')
  const audioVolume = document.querySelector('.audio-volume')
  const audioMute = document.querySelector('.audio-mute')

  let prevVolume = 1

  audioVolume.value = 50

  const playList = ['hello', 'flow', 'speed']

  let trackIndex = 0;

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused
    const track = playList[trackIndex]

    audioPlayer.src = `./audio/${track}.mp3`
    audioImg.src = `./audio/${track}.jpg`
    audioHeader.textContent = track.toUpperCase()

    if (isPlayed) {
      audioPlayer.pause()
    } else {
      audioPlayer.play()
    }
  }

  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex--
    } else {
      trackIndex = playList.length - 1
    }
    loadTrack()
  }

  const nextTrack = () => {
    if (trackIndex === playList.length - 1) {
      trackIndex = 0
    } else {
      trackIndex++
    }
    loadTrack()
  }

  audioNavigation.addEventListener('click', event => {
    const target = event.target

    if (target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play')
      audioButtonPlay.classList.toggle('fa-play')
      audioButtonPlay.classList.toggle('fa-pause')

      if (audioPlayer.paused) {
        audioPlayer.play()
      } else {
        audioPlayer.pause()
      }
      const track = playList[trackIndex]
      audioHeader.textContent = track.toUpperCase()
    }
    if (target.classList.contains('audio-button__prev')) {
      prevTrack()
    }
    if (target.classList.contains('audio-button__next')) {
      nextTrack()
    }
  })

  audioPlayer.addEventListener('ended', () => {
    nextTrack()
    audioPlayer.play()
  })

  audioPlayer.addEventListener('timeupdate', ()=>{

    const currentTime = audioPlayer.currentTime
    const duration = audioPlayer.duration
    const progress = (currentTime/duration)*100

     audioProgressTiming.style.width = progress + '%'

    const minutesPassed =Math.floor(currentTime/60) || '0'
    const secondsPassed = Math.floor(currentTime%60) || '0'
    const minutesTotal = Math.floor(duration/60) || '0'
    const secondsTotal = Math.floor(duration%60) || '0'

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`
  })

  audioProgress.addEventListener('click', e=>{
    const x = e.offsetX
    const allWith = audioProgress.clientWidth
    const progress = (x/allWith)*audioPlayer.duration
    audioPlayer.currentTime = progress
  })

  audioVolume.addEventListener('input', ()=>{
    audioPlayer.volume =  audioVolume.value/100
    prevVolume = audio.volume
  })

  audioMute.addEventListener('click', ()=>{
    if (audioPlayer.volume) {
      prevVolume = audioPlayer.volume
      audioPlayer.volume= 0
      audioVolume.value = 0
    }else{
      audioPlayer.volume= prevVolume
      audioVolume.value = 50
    }
  })

  musicPlayerInit.stop = ()=>{
    if(!audioPlayer.paused){
      audioPlayer.pause()
      audio.classList.remove('play')
      audioButtonPlay.classList.remove('fa-pause')
      audioButtonPlay.classList.add('fa-play')
    }
  }

}
