// Specify Card Data
const cardData = [
    {    
        "id": "cardAppVSCode",
        "title": "Visual Studio Code",
        "description": "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications. Visual Studio Code is free and ...",
        "icon": "https://code.visualstudio.com/assets/images/code-stable.png"
    },
    {
        "id": "cardAppVSCodeInsiders",
        "title": "Visual Studio Code (Insiders)",
        "description": "For early adopters, you can get the latest release of VS Code each day with the Insiders Build. Available on Mac, Linux and Windows.",
        "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Visual_Studio_Code_Insiders_1.36_icon.svg/512px-Visual_Studio_Code_Insiders_1.36_icon.svg.png?20190606225929"
    },
    {
        "id": "cardAppVSPostman",
        "title": "Postman",
        "description": "Postman is an API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create ...",
        "icon": "https://symbols.getvecta.com/stencil_92/21_postman-icon.c79f00c910.svg"
    }
];

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
window.onload = function() {
    generateCards(cardData);
};
