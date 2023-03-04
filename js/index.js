
const loadAiData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => {
        displayAiData(data.data.tools.slice(0, 6))
    
    })
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
          ${(ai.features).map(feature => (`<li>${feature}</li>`)).join("")}
            
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
    fetch(url)
    .then(res => res.json())
    .then(data => showModalData(data.data))
}

const showModalData = (id) => {
    console.log(id)
    document.getElementById('description').innerText = `${id.description}`
    document.getElementById('cost').innerHTML = `
    <div class="bg-stone-50 rounded-lg p-3 font-bold text-green-500">
        <p>${id.pricing[0].price ? id.pricing[0].price : 'Free of Cost'}</p>
        <p>${id.pricing[0].plan}</p>
    </div>
    <div class="bg-stone-50 rounded-lg p-3 font-bold text-orange-500">
        <p>${id.pricing[1].price? id.pricing[1].price : 'Free of Cost'}</p>
        <p>${id.pricing[1].plan}</p>
    </div>
    <div class="bg-stone-50 rounded-lg p-3 font-bold text-red-500 mr-8">
        <p>${id.pricing[2].price? id.pricing[2].price : 'Free of Cost'}</p>
        <p>${id.pricing[2].plan}</p>
    </div>
    `
    document.getElementById('features').innerHTML = `
    <div>
    <p class="text-2xl font-semibold pb-3">Features</p>
    <ul class="list-disc font-light pb-8">
    <li>${id.features[1].feature_name}</li>
    <li>${id.features[2].feature_name}</li>
    <li>${id.features[3].feature_name}</li>
    </ul>
</div>


<div>
<p class="text-2xl font-semibold">Integrations</p>
<ul class="list-disc font-light pb-8">
${(id.integrations).map(data => (`<li>${data}</li>`)).join("")}
</ul>
</div>
    `
    
    document.getElementById('right-modal-container').innerHTML = `
    <div>
    <img src="${id.image_link[0]}"></img>
    <button id="btn-accuracy" class="btn btn-xs absolute right-10 top-8">Accuracy ${id.accuracy.score? id.accuracy.score : ''}</button>
    </div>
    <div class="text-center mt-4">
    <h2 class="text-2xl font-semibold mb-4">${id.input_output_examples[0].input}</h2>
    <p>${id.input_output_examples[0].output? id.input_output_examples[0].output : 'No! Not Yet! Take a Break!!!'}</p>
    </div>
    `

}

function progressBar(isLoading){
    const progress = document.getElementById('progress');
    if(isLoading){
        progress.classList.remove('hidden');
    }
    else{
        progress.classList.add('hidden');
    };
};

loadAiData()

const loadSortedData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => {
        data.data.tools.sort((a, b) => {
            if (a.published_in < b.published_in) {
              return -1;
            }
            if (a.published_in > b.published_in) {
              return 1;
            }
            return 0;
          });
          
          console.log(data);
          displayAiData(data.data.tools);
        
    })
    
}
  
  

// const item = date.find(item => new Date(item.date).getTime() === date.getTime());
//             console.log(item)
// displayAiData(item)

// const dates = (data.data.tools).map(item => new Date(item.published_in))
//         dates.sort((a, b) => a - b);
//         console.log(dates)
//         dates.forEach(date => {
//             console.log(date)
            
//         })