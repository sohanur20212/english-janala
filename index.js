const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class = "btn"> ${el} </span>`)
    return (htmlElements.join(" "));
    
}
const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('word-container').classList.add('hidden')
    }else{
        document.getElementById('word-container').classList.remove('hidden')
        document.getElementById('spinner').classList.add('hidden')
    }
        
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};
const removeActive = () =>{
    const lessonButton= document.querySelectorAll('.lesson-btn')
    lessonButton.forEach(btn =>btn.classList.remove('active'))
    
    
}

const loadLevelWord = (id) =>{
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
   
    

    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive()
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        
        
        clickBtn.classList.add('active')
        
        displyLevelWord(data.data)
    
    })
    
}
const loadWordDetail = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    console.log(url);
    const res = await fetch(url)
    const detals = await res.json() 
    displayWordDetail(detals.data)  
}
const displayWordDetail = (word) =>{
    console.log(word);
    const detailbox = document.getElementById('details-container')
    detailbox.innerHTML = `<div>
        <h2 class="font-bold text-2xl">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h2>
      </div>
      <div class="">
        <h2 class="font-bold"> Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div>
        <h2 class="font-bold"> Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div>
        <h2 class="font-bold"> Synonym</h2>
        
      </div>
      <div>
        ${createElements(word.synonyms)}
      </div>
      `
    document.getElementById('word_modal').showModal()
    
    
}
const displyLevelWord = (word) => {
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ''

    if(word.length == 0){
        wordContainer.innerHTML = `
        <div class="col-span-full text-center space-y-3 font-bangla">
        <img class="mx-auto" src="assets/alert-error.png" alt="">
            <h3 class="text-[#777]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
            <h1 class="text-lg font-bold">নেক্সট Lesson এ যান</h1>
        </div>
        `
        manageSpinner(false)
    }
    word.forEach (word =>{
        
        const card =document.createElement('div')
        card.innerHTML = ` <div class="bg-white rounded-xl shadow-lg text-center py-10 px-5 h-full">
            <h2 class="font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="py-4">Meaning/ Pronounciation</p>
            <div class="font-semibold font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি" }/ ${word.pronunciation ? word.pronunciation : " pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between mt-3">
                <button onclick ="loadWordDetail(${word.id})" class="btn bg-[#4cabf330] hover:bg-[#4cabf370]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#4cabf330] hover:bg-[#4cabf370]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>`
        
        wordContainer.append(card)
        manageSpinner(false)
    })
    
}

const displayLesson = (lessons) => {
    const lavelContainer = document.getElementById('level-container')
    lavelContainer.innerHTML = ''
    
    for(let lesson of lessons){
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `
        lavelContainer.appendChild(btnDiv)
    }
    
    
}
loadLessons();
