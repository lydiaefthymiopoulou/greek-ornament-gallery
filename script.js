fetch('converted_data.json')
  .then(response => {
    console.log("✅ JSON FETCH STARTED");
    return response.json();
  })
  .then(fullJson => {
    console.log("✅ JSON PARSED");
    const rawData = fullJson; // fullJson is already the array
    console.log("✅ RAW DATA LOADED", rawData);
     const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear "Loading..."

  rawData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="carousel">
        <img src="images/${(img.ImageFile_Name || '').trim()}" 
      </div>
      <p><strong>Category:</strong> ${item.Category}</p>
      <p><strong>Material:</strong> ${item.Material}</p>
      <p><strong>Description:</strong> ${item.Description}</p>
    `;

    gallery.appendChild(card);
  });

    
    const searchContainer = document.getElementById('search-container');
    const addButton = document.getElementById('add-search');

    addButton.addEventListener('click', () => {
      const newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.className = 'search-box';
      newInput.placeholder = 'Add search term...';
      newInput.style.marginBottom = '10px';
      newInput.style.display = 'block';
      newInput.style.width = '300px';
      newInput.addEventListener('input', filterAndRender);
      searchContainer.insertBefore(newInput, addButton);
    });

    function groupByItemID(data) {
      const grouped = {};
      data.forEach(item => {
        const id = item.ItemID;
        if (!grouped[id]) grouped[id] = [];
        grouped[id].push(item);
      });
      return grouped;
    }

    function renderGrouped(groupedData) {
  gallery.innerHTML = "";
  Object.values(groupedData).forEach(group => {
    const item = group[0];
    const container = document.createElement('div');
    container.className = 'card';

    const carouselId = `carousel-${item.ItemID}`;
    const reorderedGroup = [
  ...group.filter(img => (img.ImageFile_Name || "").toLowerCase().includes("detail")),
  ...group.filter(img => !(img.ImageFile_Name || "").toLowerCase().includes("detail"))
];


const imagesHtml = reorderedGroup.map((img, index) => `
  <img src="images/unedited_images/${(img.ImageFile_Name || '').trim()}" 
       class="slide ${index === 0 ? 'active' : ''}" 
       data-group="${carouselId}">
`).join("");

    container.innerHTML = `
      <div class="carousel">
        ${imagesHtml}
        <button class="nav prev" data-carousel="${carouselId}">‹</button>
        <button class="nav next" data-carousel="${carouselId}">›</button>
      </div>
      ${Object.entries(item)
        .filter(([key, val]) =>
          val != null &&
          val !== "" &&
          !["ImageID", "ItemID", "ImageFile_Name"].includes(key)
        )
        .map(([key, val]) => `<p><strong>${key}:</strong> ${val}</p>`)
        .join("")}
    `;

    gallery.appendChild(container);
  });

  document.querySelectorAll('.nav').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.carousel;
      const slides = Array.from(document.querySelectorAll(`img[data-group="${group}"]`));
      const current = slides.findIndex(img => img.classList.contains('active'));
      let next = current;

      if (btn.classList.contains('next')) {
        next = (current + 1) % slides.length;
      } else if (btn.classList.contains('prev')) {
        next = (current - 1 + slides.length) % slides.length;
      }

      slides[current].classList.remove('active');
      slides[next].classList.add('active');
    });
  });
}

    function filterAndRender() {
      const keywords = Array.from(document.querySelectorAll('.search-box')).map(input => input.value.toLowerCase()).filter(Boolean);

      const filtered = rawData.filter(item =>
        keywords.every(keyword =>
          Object.values(item).some(val =>
            val?.toString().toLowerCase().includes(keyword)
          )
        )
      );

      const groupedFiltered = groupByItemID(filtered);
      renderGrouped(groupedFiltered);
    }

    const grouped = groupByItemID(rawData);
    renderGrouped(grouped);

    

    document.querySelectorAll('.search-box').forEach(input => {
      input.addEventListener('input', filterAndRender);
    });
  })
  .catch(error => {
    console.error("❌ Failed to load or parse converted_data.json:", error);
    document.getElementById('gallery').innerHTML = "❌ Failed to load gallery data.";
  });

    
