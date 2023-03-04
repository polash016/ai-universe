
const loadAiData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayAiData(data.data.tools.slice(0, 6)))
}

const displayAiData = (allAi) => {
    console.log(allAi)
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerText ='';
        allAi.forEach(ai => {
        cardContainer.innerHTML += `
        <div class="card w-96 bg-base-100 shadow-xl mt-12">
        <figure><img src="${ai.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">Features</h2>
          <ul class="list-decimal pb-3">
            <li>${ai.features[0]}</li>
            <li>${ai.features[1]}</li>
            <li>${ai?.features[2]}</li>
          </ul> <hr class="border">
          <div class="flex justify-between items-center">
            <div>
                <h2 class="card-title">${ai.name}</h2>
                 <span>${ai.published_in}</span>
            </div>
            <div>
            <label onclick="loadModalData('${ai.id}')" for="my-modal-3"><i class="fa-solid fa-arrow-right"></i></label>
            </div>
          </div>
          <div class="card-actions justify-start">
            
          </div>
        </div>
      </div>    
            
            `
        });
        progressBar(false)

}
document.getElementById('btn-show').addEventListener('click', function(){
    progressBar(true)
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayAiData(data.data.tools))
    document.getElementById('btn-show').classList.add('hidden')
})

const loadModalData = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    progressBar(true)
    fetch(url)
    .then(res => res.json())
    .then(data => showModalData(data.data))
}


loadAiData()

// const loadSortedData = () => {
//     fetch('https://openapi.programming-hero.com/api/ai/tools')
//     .then(res => res.json())
//     .then(data => {
//         const dates = data.data.tools.map(item => new Date(item.published_in))
//         dates.sort((a, b) => a - b);
//         dates.forEach(date => {
//             // console.log(date)
//             const item = data.find(item => new Date(item.date).getTime() === date.getTime());
//             console.log(item)
//         })
//         // displayAiData(item)
//     })
// }