// --- PROTECTION DES MODÈLES MNL ---
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    console.warn("MNL Security : Action protégée pour préserver les concepts virtuels.");
});

document.addEventListener('dragstart', function(e) {
    if (e.target.nodeName === 'IMG') {
        e.preventDefault();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});

console.log("MNL Industries OS v1.0 initialisé - Sécurité active.");

