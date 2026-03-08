const cardContainer = document.getElementById('card-container');
let status = 'btn-all';

const lebelsButton = (array) => {
    const htmlElements = array.map(el => `<span class='py-1 gap-1 flex items-center px-3 text-[12px] font-medium rounded-full border ${
        el === 'bug'? 'bg-[#FEECEC] text-[#EF4444] border-[#FECACA]':
        el === 'help wanted'? 'bg-[#FFF8DB] border-[#FDE68A] text-[#D97706]' :
        el === 'enhancement'? ' bg-green-100 text-green-500 border-green-300' :
        el === 'good first issue'? 'bg-blue-100 text-blue-500 border-blue-300' : 
        'bg-gray-100 text-gray-500 border-gray-300'} uppercase'>
            ${el === 'bug'? `<img src='./assets/bug.png'> ${el}` :
            el === 'help wanted'? `<img src='./assets/help.png'> ${el}` : 
            el === 'good first issue'? `<i class="fa-solid fa-rocket"></i> ${el}` : 
            el === 'enhancement'? `<img src='./assets/enhance.png'> ${el}`: 
             `<i class="fa-solid fa-file"></i> ${el}`
            }
        </span>`);

    const elements = (htmlElements.join(' '));
    return elements;
}

const date = (date) => {
    const newDate = new Date(date);
    const formatted = newDate.toLocaleDateString('en-GB');
    return formatted;

}


const btnWorks = (id) => {
    const inputSearch = document.getElementById('input-search').value = '';
    // remove classes
    document.getElementById('btn-all').classList.remove('btn-primary');
    document.getElementById('btn-all').classList.add('btn-soft');
    document.getElementById('btn-open').classList.remove('btn-primary');
    document.getElementById('btn-open').classList.add('btn-soft');
    document.getElementById('btn-closed').classList.remove('btn-primary');
    document.getElementById('btn-closed').classList.add('btn-soft');

    // add classes
    document.getElementById(id).classList.add('btn-primary');
    document.getElementById(id).classList.remove('btn-soft');

    // status
    status = id;

    loadData();
    countIssus();
};



const countIssus = () => {

    const issues = cardContainer.children.length;
    // console.log(issues);

    const issuesContainer = document.getElementById('issues');
    issuesContainer.innerText = issues;
}

document.getElementById('btn-search').addEventListener('click', () => {
    const inputSearch = document.getElementById('input-search');
    const input = inputSearch.value.trim().toLowerCase();
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(input)}`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => loadSearchData(data.data));
});


const loadSearchData = (datas) => {
        // remove classes
    document.getElementById('btn-all').classList.remove('btn-primary');
    document.getElementById('btn-all').classList.add('btn-soft');
    document.getElementById('btn-open').classList.remove('btn-primary');
    document.getElementById('btn-open').classList.add('btn-soft');
    document.getElementById('btn-closed').classList.remove('btn-primary');
    document.getElementById('btn-closed').classList.add('btn-soft');

    


    cardContainer.innerHTML = '';
    datas.forEach(data => {
        // console.log(data.status);

        const card = document.createElement('div');

        if(data.status == 'open'){
            card.classList = '';
            card.innerHTML = `
            <div onclick="modalShow(${data.id})" class="card p-4 h-full bg-white border-t-[3px] border-green-500 space-y-3 shadow-lg">
                <div class="flex justify-between">
                    <div>
                        <img src="./assets/Open-Status.png" alt="">
                    </div>
                    <div class="w-25 uppercase p-1.5 rounded-full font-bold text-center ${data.priority == 'high' ? 'bg-[#FEECEC] text-[#EF4444]' : data.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#EEEFF2] text-[#9CA3AF]'}">${data.priority}</div>
                </div>
    
                <div class="space-y-2">
                    <h3 class="font-semibold">${data.title}</h3>
                    <p class="text-sm text-gray-400 line-clamp-2">${data.description}</p>
                </div>
                <div class='flex gap-2 flex-wrap'>${lebelsButton(data.labels)}</div>
                <hr class="text-gray-400 ">
    
                <div>
                    <p class="text-sm text-gray-400">#${data.id} by ${data.author}</p>
                    <p class="text-sm text-gray-400">${date(data.createdAt)}</p>
                </div>
            </div>
            `;
            cardContainer.appendChild(card);
        }else if(data.status === 'closed'){
            card.classList = '';
            card.innerHTML = `
            <div onclick="modalShow(${data.id})" class='card p-4 h-full bg-white border-t-[3px] border-purple-500 space-y-3 shadow-lg'>
                <div class="flex justify-between">
                    <div>
                        <img src="./assets/Closed- Status .png" alt="">
                    </div>
                    <div class="w-25 uppercase p-1.5 rounded-full font-bold text-center ${data.priority == 'high' ? 'bg-[#FEECEC] text-[#EF4444]' : data.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#EEEFF2] text-[#9CA3AF]'}">${data.priority}</div>
                </div>

                <div class="space-y-2">
                    <h3 class="font-semibold">${data.title}</h3>
                    <p class="text-sm text-gray-400 line-clamp-2">${data.description}</p>
                </div>
                <div class='flex gap-2 flex-wrap'>${lebelsButton(data.labels)}</div>
                <hr class="text-gray-400 ">

                <div>
                    <p class="text-sm text-gray-400">#${data.id} by ${data.author}</p>
                    <p class="text-sm text-gray-400">${date(data.createdAt)}</p>
                </div>
            </div>
            `;
            cardContainer.appendChild(card);
        }

    });
    
    countIssus()
}


const modalShow = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    // console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data));
}


const displayModal = (data) => {
    const modalContainer = document.getElementById('modal-container');
    // console.log(modalContainer);
    modalContainer.innerHTML = '';

    const modal = document.createElement('div');
    modal.classList = 'space-y-6';
    modal.innerHTML = `
        <div class="space-y-2">
            <h2 class="text-2xl font-bold">${data.title}</h2>
            <div class="text-[12px] text-gray-400 space-x-2">
                <span class="font-medium ${data.status === 'open' ? 'bg-[#00a96e]' : 'bg-purple-500'} text-white py-1.5 rounded-full px-3">${data.status === 'open' ? 'Opened' : 'Closed'}</span> 
                <span class="inline-block w-1 h-1 rounded-full bg-gray-400"></span> 
                <span class="">${data.status === 'open' ? 'Opened' : 'Closed'} by <span class="font-bold text-black">${data.author}</span></span>
                <span class="inline-block w-1 h-1 rounded-full bg-gray-400"></span> 
                <span class="">${date(data.createdAt)}</span>
            </div>
        </div>
        <div class='flex gap-2'>${lebelsButton(data.labels)}</div>
        <p class="text-gray-400">${data.description}</p>
        <div class="bg-[#F8FAFC] flex p-4">
            <div class="w-[47%]">
                <p class="text-gray-400">Assignee:</p>
                <h2 class="font-semibold">${data.assignee ? data.assignee : 'Not Available'}</h2>
            </div>
            <div>
                <p class="text-gray-400">Priority: </p>
                <button class="text-[12px] font-medium ${data.priority == 'high' ? 'bg-red-500' : data.priority == 'medium' ? 'bg-amber-300': 'bg-gray-400'} uppercase text-white py-1.5 rounded-full w-[70px] text-center">${data.priority}</button>
            </div>
        </div>
    `;
    modalContainer.appendChild(modal);
    show_modal.showModal()
}

const loadData = () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(status === 'btn-all'){
                displayCardAll(data.data);
                // console.log(status);
            }else if(status == 'btn-open'){
                displayCardOpen(data.data);
                // console.log(status);
            }else if(status === 'btn-closed'){
                displayCardClosed(data.data);
            }
        });
}


const displayCardOpen = (datas) => {
    // console.log('I am from open');
    cardContainer.innerHTML = '';

        datas.forEach(data => {
        // console.log(data.status);

        const card = document.createElement('div');

        if(data.status == 'open'){
            card.classList = '';
            
            card.innerHTML = `
            <div onclick="modalShow(${data.id})" class="card p-4 h-full bg-white border-t-[3px] border-green-500 space-y-3 shadow-lg">
                <div class="flex justify-between">
                    <div>
                        <img src="./assets/Open-Status.png" alt="">
                    </div>
                    <div class="w-25 uppercase p-1.5 rounded-full font-bold text-center ${data.priority == 'high' ? 'bg-[#FEECEC] text-[#EF4444]' : data.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#EEEFF2] text-[#9CA3AF]'}">${data.priority}</div>
                </div>
    
                <div class="space-y-2">
                    <h3 class="font-semibold">${data.title}</h3>
                    <p class="text-sm text-gray-400 line-clamp-2">${data.description}</p>
                </div>
                <div class='flex gap-2 flex-wrap'>${lebelsButton(data.labels)}</div>
                <hr class="text-gray-400 ">
    
                <div>
                    <p class="text-sm text-gray-400">#${data.id} by ${data.author}</p>
                    <p class="text-sm text-gray-400">${date(data.createdAt)}</p>
                </div>
            </div>
            `;
            cardContainer.appendChild(card);
        }

    });
    countIssus()
}


const displayCardClosed = (datas) => {
    cardContainer.innerHTML = '';

        datas.forEach(data => {
        // console.log(data.status);

        const card = document.createElement('div');

        if(data.status === 'closed'){
            card.classList = '';
            card.innerHTML = `
            <div onclick="modalShow(${data.id})" class='card p-4 h-full bg-white border-t-[3px] border-purple-500 space-y-3 shadow-lg'>
                <div class="flex justify-between">
                    <div>
                        <img src="./assets/Closed- Status .png" alt="">
                    </div>
                    <div class="w-25 uppercase p-1.5 rounded-full font-bold text-center ${data.priority == 'high' ? 'bg-[#FEECEC] text-[#EF4444]' : data.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#EEEFF2] text-[#9CA3AF]'}">${data.priority}</div>
                </div>

                <div class="space-y-2">
                    <h3 class="font-semibold">${data.title}</h3>
                    <p class="text-sm text-gray-400 line-clamp-2">${data.description}</p>
                </div>
                <div class='flex gap-2 flex-wrap'>${lebelsButton(data.labels)}</div>
                <hr class="text-gray-400 ">

                <div>
                    <p class="text-sm text-gray-400">#${data.id} by ${data.author}</p>
                    <p class="text-sm text-gray-400">${date(data.createdAt)}</p>
                </div>
            </div>
            `;
            cardContainer.appendChild(card);
        }
    });
    countIssus()
}


const displayCardAll = (datas) => {
    // console.log(datas);
    cardContainer.innerHTML = '';
    datas.forEach(data => {
        // console.log(data.status);

        const card = document.createElement('div');

        if(data.status == 'open'){
            card.classList = '';
            card.innerHTML = `
            <div onclick="modalShow(${data.id})" class="card p-4 h-full bg-white border-t-[3px] border-green-500 space-y-3 shadow-lg">
                <div class="flex justify-between">
                    <div>
                        <img src="./assets/Open-Status.png" alt="">
                    </div>
                    <div class="w-25 uppercase p-1.5 rounded-full font-bold text-center ${data.priority == 'high' ? 'bg-[#FEECEC] text-[#EF4444]' : data.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#EEEFF2] text-[#9CA3AF]'}">${data.priority}</div>
                </div>
    
                <div class="space-y-2">
                    <h3 class="font-semibold">${data.title}</h3>
                    <p class="text-sm text-gray-400 line-clamp-2">${data.description}</p>
                </div>
                <div class='flex gap-2 flex-wrap'>${lebelsButton(data.labels)}</div>
                <hr class="text-gray-400 ">
    
                <div>
                    <p class="text-sm text-gray-400">#${data.id} by ${data.author}</p>
                    <p class="text-sm text-gray-400">${date(data.createdAt)}</p>
                </div>
            </div>
            `;
            cardContainer.appendChild(card);
        }else if(data.status === 'closed'){
            card.classList = '';
            card.innerHTML = `
            <div onclick="modalShow(${data.id})" class='card p-4 h-full bg-white border-t-[3px] border-purple-500 space-y-3 shadow-lg'>
                <div class="flex justify-between">
                    <div>
                        <img src="./assets/Closed- Status .png" alt="">
                    </div>
                    <div class="w-25 uppercase p-1.5 rounded-full font-bold text-center ${data.priority == 'high' ? 'bg-[#FEECEC] text-[#EF4444]' : data.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#EEEFF2] text-[#9CA3AF]'}">${data.priority}</div>
                </div>

                <div class="space-y-2">
                    <h3 class="font-semibold">${data.title}</h3>
                    <p class="text-sm text-gray-400 line-clamp-2">${data.description}</p>
                </div>
                <div class='flex gap-2 flex-wrap'>${lebelsButton(data.labels)}</div>
                <hr class="text-gray-400 ">

                <div>
                    <p class="text-sm text-gray-400">#${data.id} by ${data.author}</p>
                    <p class="text-sm text-gray-400">${date(data.createdAt)}</p>
                </div>
            </div>
            `;
            cardContainer.appendChild(card);
        }

    });
    
    countIssus()
}


loadData();
countIssus();