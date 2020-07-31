export const radioPlayerInit = ()=>{

  const radio = document.querySelector('.radio')
  const radioNavigation = document.querySelector('.radio-navigation')
  const radioCoverImg = document.querySelector('.radio-cover__img')
  const radioItem = document.querySelectorAll('.radio-item')
  const radioHeader = document.querySelector('.radio-header__big')
  const radioStop = document.querySelector('.radio-stop')
  const radioVolume = document.querySelector('.radio-volume')
  const radioMute = document.querySelector('.radio-mute')
  let prevVolume = 1

  radioVolume.value = 50
  const audio = new Audio()
  audio.type  ='audio/aac'

  radioStop.disabled = true

  const changeIconPlay = ()=>{
    if(audio.paused){
      radio.classList.remove('play')
      radioStop.classList.add('fa-play')
      radioStop.classList.remove('fa-stop')
    }else{
      radio.classList.add('play')
      radioStop.classList.add('fa-stop')
      radioStop.classList.remove('fa-play')
    }
  }

  const selectItem = elem=>{
    radioItem.forEach(item=>item.classList.remove('select'))
    elem.classList.add('select')
  }
  radioNavigation.addEventListener('change', event=>{
    const target = event.target
    const parent = target.closest('.radio-item')

    selectItem(parent)

    const title = parent.querySelector('.radio-name').textContent

    const img = parent.querySelector('.radio-img').src

    radioCoverImg.src = img

    radioHeader.textContent = title
    radioStop.disabled = false
    audio.src = target.dataset.radioStantion
    audio.play()
    changeIconPlay()
  })

  radioStop.addEventListener('click', ()=>{
    if(audio.paused){
      audio.play()
    }else{
      audio.pause()
    }
    changeIconPlay()
  })

  radioVolume.addEventListener('input', ()=>{
    audio.volume = radioVolume.value/100
    prevVolume = audio.volume
  })

  radioMute.addEventListener('click', ()=>{
    if (audio.volume) {
      prevVolume = audio.volume
      audio.volume= 0
      radioVolume.value = 0
    }else{
      audio.volume= prevVolume
      radioVolume.value = 50
    }
  })

  radioPlayerInit.stop = ()=>{
    audio.pause()
    changeIconPlay()
  }

}
