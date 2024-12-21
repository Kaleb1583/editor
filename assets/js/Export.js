console.log("loaded export.")


if(scriptsLoaded != null) {
    scriptsLoaded.push("Export")
}


const save = (data, filename) => {
    const blob = new Blob([data], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
};

function mkExport() {
    showAlert("attempting to export", 1000, false)
    console.log("Export: attempting to export")
    try {
        var exportCode = document.getElementById("monaco-editor").firstChild.firstChild.children[1].innerText;
        if(exportCode != "" || String(exportCode) != templateCode) {
            console.log("Export: showing save file in os file manager")
            save(exportCode, "output.html");
        } else {
            console.log("Export: theres no code to export.")
            showAlert("write some code before trying to export!", 3, false);
        }
    } catch(err) {
        if(document.getElementById("monaco-editor").firstChild == null) {      
            setTimeout(function() {showAlert("no editor & no code to export.", 2000, false)}, 1100)
        } else {     
            setTimeout(function() {showAlert("Error: cant export code", 2000, false)}, 1100)
        }
        console.log("err making export", err)
    }
}
