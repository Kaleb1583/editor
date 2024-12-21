console.log("loaded CodeSaveLoader.")

if(scriptsLoaded != null) {
    scriptsLoaded.push("CodeSaverLoader");
}

function savePreviousFile() {
    try {

        var lastInputFileValue = document.getElementById("monaco-editor").firstChild.firstChild.children[1].innerText;
        lastInputFileValue = lastInputFileValue.replace(/\u00A0/g, ' ');
        localStorage.setItem("lastFile", lastInputFileValue);
        console.log("Saver/Loader: saved code.");

    } catch(err) {
        
        console.log("Saver/Loader: error saving code", err);

    }
}

function getPreviousFile() {
    try {
        var pF = localStorage.getItem("lastFile");
        if (pF != null && pF != "") {
            setTimeout(function() {
                if (editor != null) {
                    pF = pF.replace(/\u00A0/g, ' ');
                    editor.setValue(pF);
                    showAlert("code loaded", 2000, false);
                    console.log("Saver/Loader: got saved code.");
                } 
            }, 2000);
        }
    } catch(err) {
        console.log("Saver/Loader: error loading previous code", err)
    }
}
