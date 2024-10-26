const loadPhones = async (status,brandName) => {
    document.getElementById('spinner').style.display = 'none';

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName ? brandName : 'iphone'}`);
    const data = await res.json();
    if (status) {
        displayPhones(data.data)
    }else{
        displayPhones(data.data.slice(0,8))
    }
}
const displayPhones = (Phones) => {
    const mobileContainer = document.getElementById('mobile-container')
    mobileContainer.innerHTML = '';
    Phones.forEach(item => {
        const { phone_name, slug, image } = item;
        const div = document.createElement('div');
        div.classList = 'card border rounded-lg p-5';
        div.innerHTML = `
                <figure class="mb-3">
                  <img src=${image} class="w-full" />
                </figure>
                <div class="space-y-3">
                  <h2 class="card-title">${phone_name}</h2>
                  <p>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div class="card-actions">
                    <button class="btn btn-primary min-h-0 h-10" onclick="loadDetails('${slug}')">Show Details</button>
                  </div>
                </div>
        `
        mobileContainer.appendChild(div)
    })
}
const loadDetails = async (slug) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    const data = await res.json();
    DisplayDetails(data.data)
    my_modal_3.showModal()
}
const DisplayDetails = (data) => {
    const modalContainer = document.getElementById('modal-container');
    console.log(data)
    modalContainer.innerHTML = `
            <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold pb-4">iPhone 13 mini</h3>
        <hr>
        <p class="py-2 font-semibold">Release Date: ${data.releaseDate ? data.releaseDate : 'N/A'}</p>
        <p class="py-2 font-semibold">Storage: ${data.mainFeatures.storage}</p>
        <p class="py-2 font-semibold">Others: ${data.others.Bluetooth}</p>
        <p class="pt-2 font-semibold pb-4">Sensor: ${data?.mainFeatures?.sensors[1]}</p>
        <hr>
        <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
      </div>
    </dialog>
    `
}

const showAll = () => {
    loadPhones(true)
}

const handleSearch = () => {
    document.getElementById('spinner').style.display = 'block'
    const searchText = document.getElementById('search-input').value;
    setTimeout(function () {
        loadPhones(false,searchText)
    }, 3000)
}

loadPhones(false,'apple')