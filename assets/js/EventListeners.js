try {
    setTimeout( function() {

        console.log("loaded event listeners. (delayed purposely)")

        // --- event listeners ---

        document.addEventListener("keydown", function (event) {
            try{
                if(!(isUsingMonacoEditor)) {return;} 
                if ((event.ctrlKey || event.metaKey) && event.key === "s") {
                    event.preventDefault();
                    toggleOptionMenu();
                }
            } catch(err) {
                //console.log(err)
            }
        });

        document.addEventListener("keydown", function (event) {
            try {
                if(!(isUsingMonacoEditor)) {return;} 
                if (event.key == "Escape") {
                    event.preventDefault();
                    toggleOptionMenu();
                }
            } catch(err) {
                //console.log(err)
            }
        });

        setTimeout(function() {
            try {
                if(!(isUsingMonacoEditor)) {return;}
                document.getElementById("output").contentWindow.document.body.addEventListener("keydown", function (event) {
                    if (event.key == "Escape") {
                        toggleOptionMenu();
                    }
                });
            } catch(err) {
                //console.log(err)
            }

        }, 5000);

        try {
            const fullscreenBtn = document.getElementById('fullscreenBtn');
            fullscreenBtn.addEventListener('click', () => {
                const isFullscreen = inputContainer.style.display === 'none';
                if (isFullscreen) {
                    inputContainer.style.display = 'flex';
                    divider.style.display = 'block';
                    fullscreenBtn.textContent = 'Full Screen';
                    outputContainer.style.flex = '1';
                } else {
                    inputContainer.style.display = 'none';
                    divider.style.display = 'none';
                    fullscreenBtn.textContent = 'Exit Full Screen';
                    outputContainer.style.flex = 'none';
                    outputContainer.style.width = '100%';
                }
            });
        } catch(err) {
            //console.log(err)
        }
        // -----------------------

    }, 2000);

} catch(err) {
    console.log("EventListeners: err", err)
}
