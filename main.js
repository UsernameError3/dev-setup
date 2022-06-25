// Specify Card Data URL
const url = "https://usernameerror3.github.io/dev-setup/data.json";

// Fetch Card Data
async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.cards;
    } catch (error) {
        // Error handling here
        console.log(error);
        return;
    }
}

// Generate Cards
function generateCards(data) {
    const checklistCardId = document.getElementById('checklistCards');
    const checklistCards = [];

    for (let i = 0; i < data.length; i++) {
        const checklistCardCheckboxId = data[i].id;
        const checklistCardTitle = data[i].title;
        const checklistCardIconSrc = data[i].icon;
        const checklistCardDescription = data[i].description;
        const checklistCardTemplate = `
            <div class="grid-checklist-card">
            <div class="grid-checklist-card-checkbox">
                <div class="flex-checklist-card-checkbox">
                    <label class="custom-checkbox">
                        <input id="${checklistCardCheckboxId}" type="checkbox" checked="checked">
                        <span class="custom-checkmark"></span>
                    </label>
                </div>
            </div>
            <div class="grid-checklist-card-title">
                <div class="flex-checklist-card-title">
                    <div class="checklist-card-title">
                        <H4>${checklistCardTitle}</H4>
                    </div>
                </div>
            </div>
            <div class="grid-checklist-card-icon">
                <div class="flex-checklist-card-icon">
                    <img class="checklist-card-icon-img" src="${checklistCardIconSrc}" alt="Card Icon">
                </div>
            </div>
            <div class="grid-checklist-card-description">
                <div class="flex-checklist-card-description">
                    <p>${checklistCardDescription}</p>
                </div>
            </div>
            </div>
        `;

        checklistCards.push(checklistCardTemplate);
    };

    return checklistCardId.innerHTML = checklistCards.join('\n');
};

// Generate Elements on Page Load
window.onload = async () => {
    let cardData = await getData(url);
    generateCards(cardData);
    console.log("Loading Complete...");
};
