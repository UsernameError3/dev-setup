// Store Current OS Selection
let currentOS = 'mac';

// Fetch Card Data
async function getData() {
    try {
        const url = 'https://usernameerror3.github.io/dev-setup/data/data.json';
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Fetching Data Failed: ', error);
        return;
    }
}

async function getVisibility(element) {
    const style = window.getComputedStyle(element);
    if ((style.display === 'none') || (style.visibility === 'hidden')) {
        return false;
    } else {
        return true;
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
            <div name="checklistCard" class="grid-checklist-card">
                <div class="grid-checklist-card-checkbox">
                    <div class="flex-checklist-card-checkbox">
                        <label class="custom-checkbox">
                            <input id="${checklistCardCheckboxId}" name="checklistCheckbox" type="checkbox" checked="checked">
                            <input type="hidden" value="${checklistCardHiddenScriptValue}">
                            <span class="custom-checkmark"></span>
                        </label>
                    </div>
                </div>
                <div class="grid-checklist-card-title">
                    <div class="flex-checklist-card-title">
                        <div class="checklist-card-title">
                            <a href="${checklistCardTitleLink}" target="_blank"><H4 name="checklistCardTitle">${checklistCardTitle}</H4></a> 
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
                        <p name="checklistCardDescription">${checklistCardDescription}</p>
                    </div>
                </div>
            </div>
        `;
        return checklistCardTemplate;
    } catch (error) {
        console.log(error);
        return;
    }
}

function assembleCards(data) {
    const checklistCardId = document.getElementById('checklistCards');
    const checklistCards = [];

    for (let i = 0; i < data.length; i++) {
        if (currentOS == 'mac') {
            if (data[i].macEnabled == false) {
                continue;
            } else {
                checklistCards.push(generateCard(data[i], data[i].macScript));
            }
        } else if (currentOS == 'linux') {
            if (data[i].linuxEnabled == false) {
                continue;
            } else {
                checklistCards.push(generateCard(data[i], data[i].linuxScript));
            }
        } else if (currentOS == 'windows') {
            if (data[i].windowsEnabled == false) {
                continue;
            } else {
                checklistCards.push(generateCard(data[i], data[i].windowsScript));
            }
        } else {
            continue;
        }
    }

    // Set Checklist HTML
    if (checklistCards.length) {
        return checklistCardId.innerHTML = checklistCards.join('\n');
    } else {
        return checklistCardId.innerHTML = '';
    }
}

// Match Checkbox to Script Value
async function matchCheckboxes(data, checklistId) {
    for (let i = 0; i < data.length; i++) {
        if (currentOS == 'mac') {
            if (data[i].macEnabled == true) {
                if (data[i].id == checklistId) {
                    return data[i].macScript;
                }
            } else {
                return;
            }
        } else if (currentOS == 'linux') {
            if (data[i].linuxEnabled == true) {
                if (data[i].id == checklistId) {
                    return data[i].linuxScript;
                }
            } else {
                return;
            }
        } else if (currentOS == 'windows') {
            if (data[i].windowsEnabled == true) {
                if (data[i].id == checklistId) {
                    return data[i].windowsScript;
                }
            } else {
                return;
            }
        } else {
            return;
        }
    }

}

// Assemble and Return Array of Script Values
async function assembleScript (cardData) {
    const checklist = document.getElementsByName('checklistCheckbox');
    const checkboxes = [];

    // Add OS Specific Configuration
    if (currentOS == 'mac') {
        checkboxes.push(`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`);
    } else if (currentOS == 'linux') {
        // checkboxes.push();
    } else if (currentOS == 'windows') {
        // checkboxes.push();
    } else {
        console.log('OS Specific Configuration Failed')
    }

    // Aggregate Card Configs
    for (const checkboxId of checklist) {
        if (await getVisibility(checkboxId)) {
            if (checkboxId.type == 'checkbox' && checkboxId.checked == true) {
                checkboxes.push(await matchCheckboxes(cardData, checkboxId.id));
            }
        }
    }
    return checkboxes;
}

// Debounce Search Input
function debounceSearch(func, timeout = 350) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  function processInput() {
    try {
        const checklistSearchBar = document.getElementById('checklistSearchBar');
        const searchList = document.getElementsByName('checklistCard');
        const keyword = checklistSearchBar.value.toLocaleLowerCase();

        if (keyword == '') {
            // Display All Cards
            for (let i = 0; i < searchList.length; i++) {
                const cardIndex = searchList[i];
                const cardCheckbox = cardIndex.querySelector('input[name="checklistCheckbox"]');
                cardIndex.style.display = 'grid';
                cardCheckbox.style.display = 'block';
                cardIndex.scrollIntoView();
            }
        } else {
            // Display Matched Cards
            for (let i = 0; i < searchList.length; i++) {
                const cardIndex = searchList[i];
                const cardCheckbox = cardIndex.querySelector('input[name="checklistCheckbox"]');
                const cardTitle = cardIndex.getElementsByTagName('h4')[0];
                const cardTitleAttribute = cardTitle.getAttribute('name');
                const cardTitleText = cardTitle.innerHTML.toLocaleLowerCase();
                const cardDescription = cardIndex.getElementsByTagName('p')[0]
                const cardDescriptionAttribute = cardDescription.getAttribute('name');
                const cardDescriptionText = cardDescription.innerHTML.toLocaleLowerCase();


                if (cardTitleAttribute == 'checklistCardTitle' || cardDescriptionAttribute == 'checklistCardDescription') {
                    if (cardTitleText.includes(keyword) || cardDescriptionText.includes(keyword)) {
                        cardIndex.style.display = 'grid';
                        cardCheckbox.style.display = 'block';
                        cardIndex.scrollIntoView();
                    } else {
                        cardIndex.style.display = 'none';
                        cardCheckbox.style.display = 'none';
                    }
                }
            }
        }
    } catch (error) {
        console.log('Search Query Failed: ', error);
    }
}

// Process Search Query
const searchQuery = debounceSearch(() => processInput());

// Generate Elements on Page Load
window.onload = async () => {
    // Get Card Data
    let cardData = await getData();

    // Define App Control Buttons
    const selectMacOS = document.getElementById('radioMac');
    const selectLinuxOS = document.getElementById('radioLinux');
    const selectWindowsOS = document.getElementById('radioWindows');
    const selectChecklistButton = document.getElementById('selectChecklistButton');
    const generateScriptButton = document.getElementById('generateScriptButton');
    const scriptBox = document.getElementById('scriptBox');
    const checklistSearchBar = document.getElementById('checklistSearchBar');

    // Generate Initial Cards
    assembleCards(cardData);

    // Listen for Mac OS Selection
    selectMacOS.addEventListener('change', (event) => {
        try {
            if (selectMacOS.checked == true) {
                currentOS = 'mac'
                scriptBox.value = '';
                assembleCards(cardData);
            } else {
                console.log('OS Selection Failed')
            }
        } catch (error) {
            console.log(error);
        }
    });

    // Listen for Linux OS Selection
    selectLinuxOS.addEventListener('change', (event) => {
        try {
            if (selectLinuxOS.checked == true) {
                currentOS = 'linux'
                scriptBox.value = '';
                assembleCards(cardData);
            } else {
                console.log('OS Selection Failed')
            }
        } catch (error) {
            console.log(error);
        }
    });

    // Listen for Windows OS Selection
    selectWindowsOS.addEventListener('change', (event) => {
        try {
            if (selectWindowsOS.checked == true) {
                currentOS = 'windows'
                scriptBox.value = '';
                assembleCards(cardData);
            } else {
                console.log('OS Selection Failed')
            }
        } catch (error) {
            console.log(error);
        }
    });

    // Enable Mass Selection or Deselection
    selectChecklistButton.addEventListener('click', (event) => {
        try {
            const checklist = document.getElementsByName('checklistCheckbox');
            if (checklist.length) {
                if (selectChecklistButton.value == 'Select All') {
                    for (var i = 0; i < checklist.length; i++) {
                        if (checklist[i].type == 'checkbox') {
                            checklist[i].checked = true;
                        }
                    }
                    selectChecklistButton.setAttribute('value', 'Deselect All');
                } else {
                    for (var i = 0; i < checklist.length; i++) {
                        if (checklist[i].type == 'checkbox') {
                            checklist[i].checked = false;
                        }
                    }
                    selectChecklistButton.setAttribute('value', 'Select All');
                }
            }
        } catch (error) {
            console.log(error);
        }
    });

    // Script Generation
    generateScriptButton.addEventListener('click', async(event) => {
        try {
            // Start Script Generation
            const scriptComponents = await assembleScript(cardData);

            if (scriptComponents.length) {
                return scriptBox.value = scriptComponents.join('\n');
            } else {
                return scriptBox.value = 'No Script to Generate!';
            }

        } catch (error) {
            console.log(error);
        }
    });

    // Copy Generated Script
    scriptBox.addEventListener('click', async(event) => {
        const data = event.target.value;

        if (!navigator.clipboard) {
            console.error("Clipboard API Not Available");
            return
        } else {
            try {
                console.log("Copying Script to Clipboard...");
                await navigator.clipboard.writeText(data)
                // event.target.value = 'Copied to clipboard'
            } catch (err) {
                console.error('Failed to copy!', err)
            }
        }
    });

    checklistSearchBar.addEventListener('keyup', searchQuery);
    

};
