console.log("loaded export.")

const save = (data, filename) => {
    const blob = new Blob([data], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
};

function mkExport() {
    showAlert("attempting to export", 1500, false)
    console.log("Export: attempting to export")
    var exportCode = document.getElementById("monaco-editor").firstChild.firstChild.children[1].innerText;
    if(exportCode != "" || String(exportCode) != templateCode) {
        console.log("Export: showing save file in os file manager")
        save(exportCode, "output.html");
    } else {
        console.log("Export: theres no code to export.")
        showAlert("write some code before trying to export!", 3, false);
    }
}

