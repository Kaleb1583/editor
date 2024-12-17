    console.log("loaded options.")

    function resetOptions() {
        for (let i = 1; i <= optionCount; i++) {
                const optionId = `option${i}`;
                if(i==1||i==2||i==3||i==4||i==5) {  
                    // options that default to true   
                    localStorage.setItem(optionId, true);
                } else if(false) {
                    // options that default to false
                }
        }
        localStorage.setItem("fontSize", 14);
        checkForSavedOptions(true); // update
    }

    function saveOptions() {
        try {
            const options = {};

            for (let i = 1; i <= optionCount; i++) {
                const optionId = `option${i}`;
                const value = Boolean(document.getElementById(optionId).getAttribute('v'));
                options[optionId] = value;
                localStorage.setItem(optionId, value);
            }

            localStorage.setItem("fontSize", fontSize);

            const savedOptions = {
                "alerts": options.option1,
                "show fullscreen btn": options.option2,
                "show export btn": options.option3,
                "dark mode": options.option4,
                "font size": fontSize,
                "show line numbers": options.option5,
                "auto save / load": options.option6
            };

            console.log("Options: saved options", savedOptions);
            showAlert("saved options", 4000, false);
        } catch (err) {
            showAlert("error saving options", 4000, false);
            console.log("error saving options: " + err);
        }
    }


    function checkForSavedOptions(isReset = false) {
        const savedOptions = {};

        for (let i = 1; i <= optionCount; i++) {
            savedOptions[`option${i}`] = localStorage.getItem(`option${i}`);
        }
        savedOptions.fontSize = localStorage.getItem("fontSize");

        // !!!! ADD NEW OPTIONS HERE !!!!
        if (savedOptions.option1 && savedOptions.option2 && savedOptions.option3 && savedOptions.option4 && savedOptions.option5 && savedOptions.option6 && savedOptions.fontSize) {
            const message = isReset ? "reset options." : "options loaded";
            showAlert(message, 3000, false);
        }

        console.log("Options: loading saved options.", savedOptions);

        for (let i = 1; i <= optionCount; i++) {
            const optionValue = savedOptions[`option${i}`];
            if (optionValue !== null) {
                toggleOption(i, optionValue === "true");
            }
        }

        if (savedOptions.fontSize !== null) {
            monaco.editor.getEditors()[0].updateOptions({ fontSize: savedOptions.fontSize });
            fontSize = savedOptions.fontSize;
            document.getElementById("span").innerText = ` Font: ${fontSize} `;
        }
    }



    function toggleOptionMenu() {
        options = document.getElementById("options-container");
        if(options.style.display == "block") {
            options.style.display = "none";
            //document.getElementById("editorPage").style.display = "none";   
            output.hidden = false;
            //showAlert("showing output", 1500, true)  
            setTimeout(function() {updateOutput(false)}, 750);
            saveOptions();
            optionsBtn.innerText = "Options";
        } else {
            options.style.display = "block";
            output.hidden = true;
            //showAlert("showing options", 1500, true)
            optionsBtn.innerText = "Close Options";
        }
    };

    function toggleOption(option, v=null) {

        // v = value 
        // for loading previous options, toggleOption(1, true) sets option1 to true   if no value is given it just toggles it

        if(document.getElementById(`option${option}`) == null) {return;} // if option element not found dont try anything

        if(v == null) {
            // green if enabled / red if disabled
            if(document.getElementById(`option${option}`).style.color == "green") {
                document.getElementById(`option${option}`).style.color = "red";   
                document.getElementById(`option${option}`).setAttribute("v", "");
            } else if(document.getElementById(`option${option}`).style.color == "red"){
                document.getElementById(`option${option}`).style.color = "green";
                document.getElementById(`option${option}`).setAttribute("v", "true");
            }
        } else if(!(v == null)) {
            if(v == true) {
                document.getElementById(`option${option}`).style.color = "green";
                document.getElementById(`option${option}`).setAttribute("v", "true");
            } else if(v == false) {
                document.getElementById(`option${option}`).style.color = "red";   
                document.getElementById(`option${option}`).setAttribute("v", "");
            }
        }

        // code for the options

        if(document.getElementById("option1").getAttribute("v") == "true") {
            doAlert = true;
        } else if(document.getElementById("option1").getAttribute("v") == ""){ 
            doAlert = false;
        }

        if(document.getElementById("option2").getAttribute("v") == "true") {
            fullscreenBtn.hidden = false;
        } else if(document.getElementById("option2").getAttribute("v") == ""){
            fullscreenBtn.hidden = true;
        }   

        if(document.getElementById("option3").getAttribute("v") == "true") {
            exportBtn.hidden = false;
        } else if(document.getElementById("option3").getAttribute("v") == ""){
            exportBtn.hidden = true;
        }

        if(document.getElementById("option4").getAttribute("v") == "true") {
            monaco.editor.setTheme("vs-dark");
        } else if(document.getElementById("option4").getAttribute("v") == ""){
            monaco.editor.setTheme("vs");
        }
        
        if(document.getElementById("option5").getAttribute("v") == "true") {
            monaco.editor.getEditors()[0].updateOptions({lineNumbers: true})
        } else if(document.getElementById("option5").getAttribute("v") == "") {
            monaco.editor.getEditors()[0].updateOptions({lineNumbers: false})
        }

        if(document.getElementById("option6").getAttribute("v") == "true") {
            getPreviousFileOnLoad = true;
            saveCodeOnUpdate = true;
        } else if(document.getElementById("option6").getAttribute("v") == "") {
            getPreviousFileOnLoad = false;
            saveCodeOnUpdate = false;
        }

    }