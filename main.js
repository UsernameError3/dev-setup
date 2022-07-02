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

function generateCard(data, script) {
    try {
        const checklistCardCheckboxId = data.id;
        const checklistCardTitle = data.title;
        const checklistCardTitleLink = data.titleLink;
        const checklistCardIconSrc = data.icon;
        const checklistCardDescription = data.description;
        const checklistCardHiddenScriptValue = script;

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

        return checklistCardTemplate;

    } catch (error) {
        console.log('gen_card_2: Card Was Not Generated...', error);
        return;
    }
};


// Generate Cards
function assembleCards(data) {
    const checklistCardId = document.getElementById('checklistCards');
    const checklistCards = [];

    for (let i = 0; i < data.length; i++) {

        if (currentOS == 'mac') {
            if (data[i].macEnabled == false) {
                console.log('gen_card_1: Card Disabled For Mac OS...')
                continue;
            } else {
                checklistCards.push(generateCard(data[i], data[i].macScript));
            }
        } else if (currentOS == 'linux') {
            if (data[i].linuxEnabled == false) {
                console.log('gen_card_1: Card Disabled For Linux OS...')
                continue;
            } else {
                checklistCards.push(generateCard(data[i], data[i].linuxScript));
            }
        } else if (currentOS == 'windows') {
            if (data[i].windowsEnabled == false) {
                console.log('gen_card_1: Card Disabled For Windows OS...')
                continue;
            } else {
                checklistCards.push(generateCard(data[i], data[i].windowsScript));
            }
        } else {
            console.log('gen_card_1: OS Selection Loop Iteration Failed...')
            continue;
        }
    };

    // Set Checklist HTML
    if (checklistCards.length) {
        return checklistCardId.innerHTML = checklistCards.join('\n');
    } else {
        console.log('gen_card_3: No Cards Enabled for this OS...')
        return checklistCardId.innerHTML = '';
    }
};

// Generate Elements on Page Load
window.onload = async () => {
    // Get Card Data
    let cardData = await getData(url);

    // Define OS Selection Buttons
    const selectMacOS = document.getElementById('radioMac');
    const selectLinuxOS = document.getElementById('radioLinux');
    const selectWindowsOS = document.getElementById('radioWindows');

    // Listen for Mac OS Selection
    selectMacOS.addEventListener('change', (event) => {
        try {
            if (selectMacOS.checked == true) {
                currentOS = 'mac'
                console.log('Setting OS to Mac...')
                assembleCards(cardData);
            } else {
                console.log('OS Selection Failed')
            };
        } catch (error) {
            // Error handling here
            console.log(error);
        }
    });

    // Listen for Linux OS Selection
    selectLinuxOS.addEventListener('change', (event) => {
        try {
            if (selectLinuxOS.checked == true) {
                currentOS = 'linux'
                console.log('Setting OS to Linux...')
                assembleCards(cardData);
            } else {
                console.log('OS Selection Failed')
            };
        } catch (error) {
            // Error handling here
            console.log(error);
        }
    });

    // Listen for Windows OS Selection
    selectWindowsOS.addEventListener('change', (event) => {
        try {
            if (selectWindowsOS.checked == true) {
                currentOS = 'windows'
                console.log('Setting OS to Windows...')
                assembleCards(cardData);
            } else {
                console.log('OS Selection Failed')
            };
        } catch (error) {
            // Error handling here
            console.log(error);
        }
    });

    // Generate Initial Cards
    assembleCards(cardData);

    console.log('Loading Complete...');
};
