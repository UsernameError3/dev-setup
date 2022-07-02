// Specify Card Data URL
const url = 'https://usernameerror3.github.io/dev-setup/data.json';
let currentOS = 'mac';

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

        let validateCardByOS = false;

        if (currentOS == 'mac') {
            if (data[i].macEnabled == false) {
                continue;
            } else {
                validateCardByOS == true;
            }
        } else if (currentOS == 'linux') {
            if (data[i].linuxEnabled == false) {
                continue;
            } else {
                validateCardByOS == true;
            }
        } else if (currentOS == 'windows') {
            if (data[i].windowsEnabled == false) {
                continue;
            } else {
                validateCardByOS == true;
            }
        } else {
            console.log('OS Selection Loop Iteration failed...')
            continue;
        }

        if (validateCardByOS) {
            const checklistCardCheckboxId = data[i].id;
            const checklistCardTitle = data[i].title;
            const checklistCardTitleLink = data[i].titleLink;
            const checklistCardIconSrc = data[i].icon;
            const checklistCardDescription = data[i].description;
    
            // Needs Work
            const checklistCardHiddenScriptValue = data[i].macScript;
    
            if (checklistCardCheckboxId == "windows") {
                checklistCardHiddenScriptValue = data[i].windowsScript;
            } else if (checklistCardCheckboxId == "linux") {
                checklistCardHiddenScriptValue = data[i].linuxScript;
            } else {
                checklistCardHiddenScriptValue = data[i].macScript;
            }
    
            const checklistCardTemplate = `
                <div class="grid-checklist-card">
                    <div class="grid-checklist-card-checkbox">
                        <div class="flex-checklist-card-checkbox">
                            <label class="custom-checkbox">
                                <input id="${checklistCardCheckboxId}" type="checkbox" checked="checked">
                                <span class="custom-checkmark"></span>
                            </label>
                            <input type="hidden" id="" name="" value="${checklistCardHiddenScriptValue}">
                        </div>
                    </div>
                    <div class="grid-checklist-card-title">
                        <div class="flex-checklist-card-title">
                            <div class="checklist-card-title">
                                <a href="${checklistCardTitleLink}" target="_blank"><H4>${checklistCardTitle}</H4></a> 
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
        }
    };

    if (checklistCards.length) {
        return checklistCardId.innerHTML = checklistCards.join('\n');
    } else {
        console.log('No Cards Enabled for this OS...')
        return;
    }
};

// Generate Elements on Page Load
window.onload = async () => {
    // Get Card Data
    let cardData = await getData(url);

    // Generate Initial Cards
    generateCards(cardData);

    // Check Operating System Selection
    const selectOS = document.getElementById('appControls').radioSelectOS;
    for(var i = 0; i < selectOS.length; i++) {
        selectOS[i].onclick = function () {
            if (this.id == radioMac) {
                currentOS = 'mac'
            } else if (this.id == radioLinux) {
                currentOS = 'linux'
            } else if (this.id == radioWindows) {
                currentOS = 'windows'
            } else {
                currentOS = 'mac'
                console.log('OS Selection Failed, Defaulting to Mac...')
            }
        };
    }

    console.log('Loading Complete...');
};
