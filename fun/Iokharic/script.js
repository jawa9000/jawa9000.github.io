const englishInput = document.getElementById('englishInput');
const draconicOutput = document.getElementById('draconicOutput');
const warning = document.getElementById('warning');

const validRegex = /[^a-zA-Z0-9\s]/g;

englishInput.addEventListener('input', () => {
    let val = englishInput.value;
    
    if (validRegex.test(val)) {
        warning.innerText = "Only letters, numbers, and returns allowed.";
        val = val.replace(validRegex, '');
        englishInput.value = val;
    } else {
        warning.innerText = "";
    }

    // Sync to the div
    draconicOutput.innerText = val;
});

// The specialized Download Logic
downloadBtn.addEventListener('click', () => {
    const wrapper = document.getElementById('outputWrapper');
    
    html2canvas(wrapper, {
        backgroundColor: "#2d2d2d", // Matches your background
        scale: 3, // High resolution
        logging: false,
        // This ensures the capture includes the full expanded height
        height: wrapper.scrollHeight, 
        windowHeight: wrapper.scrollHeight,
        onclone: (clonedDoc) => {
            // Ensure the cloned version is fully expanded for the photo
            const clonedWrapper = clonedDoc.getElementById('outputWrapper');
            clonedWrapper.style.height = 'auto';
            clonedWrapper.style.width = wrapper.offsetWidth + 'px';
        }
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'draconic-scroll.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
});