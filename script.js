// MittCV 2026

// Show/hide sections
function showSection(section) {
    let sections = document.querySelectorAll(".section")
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove("active")
    }
    let tabs = document.querySelectorAll(".header-tab")
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active")
    }
    document.getElementById(section + "-section").classList.add("active")
    event.target.classList.add("active")
}

// Template selector
let currentTemplate = "klassisk"

function setTemplate(template) {
    currentTemplate = template
    let btns = document.querySelectorAll(".template-btn")
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active")
    }
    event.target.classList.add("active")
    let preview = document.getElementById("cv-preview")
    preview.className = "cv-preview template-" + template
    updateCV()
}

// Counters
let erfaringCount = 0
let utdanningCount = 0
let sprakCount = 0

// Add erfaring
function addErfaring() {
    erfaringCount++
    let id = erfaringCount
    let div = document.createElement("div")
    div.className = "erfaring-item"
    div.id = "erfaring-" + id
    div.innerHTML = `
        <button class="remove-btn" onclick="removeItem('erfaring-${id}')">✕</button>
        <div class="form-group">
            <label>Stillingstittel</label>
            <input type="text" id="erf-tittel-${id}" placeholder="Kundeservicemedarbeider" oninput="updateCV()">
        </div>
        <div class="form-group">
            <label>Bedrift</label>
            <input type="text" id="erf-bedrift-${id}" placeholder="Norsk Bedrift AS" oninput="updateCV()">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Fra (mnd/år)</label>
                <input type="text" id="erf-fra-${id}" placeholder="Jan 2022" oninput="updateCV()">
            </div>
            <div class="form-group">
                <label>Til (mnd/år)</label>
                <input type="text" id="erf-til-${id}" placeholder="Nå" oninput="updateCV()">
            </div>
        </div>
        <div class="form-group">
            <label>Beskrivelse</label>
            <textarea id="erf-desc-${id}" rows="3" placeholder="Beskriv dine oppgaver og resultater..." oninput="updateCV()"></textarea>
        </div>
    `
    document.getElementById("erfaring-list").appendChild(div)
}

// Add utdanning
function addUtdanning() {
    utdanningCount++
    let id = utdanningCount
    let div = document.createElement("div")
    div.className = "utdanning-item"
    div.id = "utdanning-" + id
    div.innerHTML = `
        <button class="remove-btn" onclick="removeItem('utdanning-${id}')">✕</button>
        <div class="form-group">
            <label>Grad / Kurs</label>
            <input type="text" id="utd-grad-${id}" placeholder="Bachelor i økonomi" oninput="updateCV()">
        </div>
        <div class="form-group">
            <label>Skole / Institusjon</label>
            <input type="text" id="utd-skole-${id}" placeholder="Universitetet i Oslo" oninput="updateCV()">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Fra (år)</label>
                <input type="text" id="utd-fra-${id}" placeholder="2018" oninput="updateCV()">
            </div>
            <div class="form-group">
                <label>Til (år)</label>
                <input type="text" id="utd-til-${id}" placeholder="2021" oninput="updateCV()">
            </div>
        </div>
    `
    document.getElementById("utdanning-list").appendChild(div)
}

// Add språk
function addSprak() {
    sprakCount++
    let id = sprakCount
    let div = document.createElement("div")
    div.className = "sprak-item"
    div.id = "sprak-" + id
    div.innerHTML = `
        <button class="remove-btn" onclick="removeItem('sprak-${id}')">✕</button>
        <div class="form-row">
            <div class="form-group">
                <label>Språk</label>
                <input type="text" id="sprak-navn-${id}" placeholder="Norsk" oninput="updateCV()">
            </div>
            <div class="form-group">
                <label>Nivå</label>
                <select id="sprak-niva-${id}" onchange="updateCV()">
                    <option value="Morsmål">Morsmål</option>
                    <option value="Flytende">Flytende</option>
                    <option value="Meget godt">Meget godt</option>
                    <option value="Godt">Godt</option>
                    <option value="Grunnleggende">Grunnleggende</option>
                </select>
            </div>
        </div>
    `
    document.getElementById("sprak-list").appendChild(div)
    updateCV()
}

// Remove item
function removeItem(id) {
    let el = document.getElementById(id)
    if (el) el.remove()
    updateCV()
}

// Update CV preview
function updateCV() {
    let navn = document.getElementById("navn").value || "Ditt navn"
    document.getElementById("preview-navn").textContent = navn

    let telefon = document.getElementById("telefon").value
    let epost = document.getElementById("epost").value
    let linkedin = document.getElementById("linkedin").value
    let by = document.getElementById("by").value

    let contactParts = []
    if (telefon) contactParts.push(telefon)
    if (epost) contactParts.push(epost)
    if (by) contactParts.push(by)
    if (linkedin) contactParts.push(linkedin)
    document.getElementById("preview-contact").innerHTML = contactParts.join(" · ")

    // Profil
    let profil = document.getElementById("profil").value
    document.getElementById("preview-profil").innerHTML = profil ? `
        <div class="cv-section">
            <h2>Profil</h2>
            <p>${profil}</p>
        </div>` : ""

    // Erfaring
    let erfaringItems = document.querySelectorAll(".erfaring-item")
    let erfaringHTML = ""
    if (erfaringItems.length > 0) {
        erfaringHTML = `<div class="cv-section"><h2>Arbeidserfaring</h2>`
        erfaringItems.forEach(function(item) {
            let id = item.id.replace("erfaring-", "")
            let tittel = document.getElementById("erf-tittel-" + id)?.value || ""
            let bedrift = document.getElementById("erf-bedrift-" + id)?.value || ""
            let fra = document.getElementById("erf-fra-" + id)?.value || ""
            let til = document.getElementById("erf-til-" + id)?.value || ""
            let desc = document.getElementById("erf-desc-" + id)?.value || ""
            erfaringHTML += `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <div>
                            <div class="cv-item-title">${tittel}</div>
                            <div class="cv-item-company">${bedrift}</div>
                        </div>
                        <div class="cv-item-date">${fra}${til ? " – " + til : ""}</div>
                    </div>
                    ${desc ? `<div class="cv-item-desc">${desc}</div>` : ""}
                </div>`
        })
        erfaringHTML += `</div>`
    }
    document.getElementById("preview-erfaring").innerHTML = erfaringHTML

    // Utdanning
    let utdanningItems = document.querySelectorAll(".utdanning-item")
    let utdanningHTML = ""
    if (utdanningItems.length > 0) {
        utdanningHTML = `<div class="cv-section"><h2>Utdanning</h2>`
        utdanningItems.forEach(function(item) {
            let id = item.id.replace("utdanning-", "")
            let grad = document.getElementById("utd-grad-" + id)?.value || ""
            let skole = document.getElementById("utd-skole-" + id)?.value || ""
            let fra = document.getElementById("utd-fra-" + id)?.value || ""
            let til = document.getElementById("utd-til-" + id)?.value || ""
            utdanningHTML += `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <div>
                            <div class="cv-item-title">${grad}</div>
                            <div class="cv-item-company">${skole}</div>
                        </div>
                        <div class="cv-item-date">${fra}${til ? " – " + til : ""}</div>
                    </div>
                </div>`
        })
        utdanningHTML += `</div>`
    }
    document.getElementById("preview-utdanning").innerHTML = utdanningHTML

    // Ferdigheter
    let ferdigheter = document.getElementById("ferdigheter").value
    let ferdigheterHTML = ""
    if (ferdigheter) {
        let skills = ferdigheter.split(",").map(s => s.trim()).filter(s => s)
        let skillBadges = skills.map(s => `<span class="cv-skill">${s}</span>`).join("")
        ferdigheterHTML = `
            <div class="cv-section">
                <h2>Ferdigheter</h2>
                <div class="cv-skills">${skillBadges}</div>
            </div>`
    }
    document.getElementById("preview-ferdigheter").innerHTML = ferdigheterHTML

    // Språk
    let sprakItems = document.querySelectorAll(".sprak-item")
    let sprakHTML = ""
    if (sprakItems.length > 0) {
        sprakHTML = `<div class="cv-section"><h2>Språk</h2>`
        sprakItems.forEach(function(item) {
            let id = item.id.replace("sprak-", "")
            let navn2 = document.getElementById("sprak-navn-" + id)?.value || ""
            let niva = document.getElementById("sprak-niva-" + id)?.value || ""
            if (navn2) {
                sprakHTML += `<div class="cv-item-desc">${navn2} — ${niva}</div>`
            }
        })
        sprakHTML += `</div>`
    }
    document.getElementById("preview-sprak").innerHTML = sprakHTML
}

// Update søknadsbrev preview
function updateSoknadsbrev() {
    let navn = document.getElementById("sb-navn").value || ""
    let stilling = document.getElementById("sb-stilling").value || ""
    let bedrift = document.getElementById("sb-bedrift").value || ""
    let erfaring = document.getElementById("sb-erfaring").value || ""
    let motivasjon = document.getElementById("sb-motivasjon").value || ""
    let bidrag = document.getElementById("sb-bidrag").value || ""

    if (!navn && !stilling && !bedrift) {
        document.getElementById("soknadsbrev-preview").innerHTML = `<p class="empty-preview">Fyll inn informasjonen til venstre for å se forhåndsvisningen</p>`
        return
    }

    let today = new Date()
    let dato = today.toLocaleDateString("no-NO", { day: "numeric", month: "long", year: "numeric" })

    document.getElementById("soknadsbrev-preview").innerHTML = `
        <div style="font-size: 13px; color: #444; line-height: 1.9;">
            <p style="margin-bottom: 24px; color: #888;">${dato}</p>
            <p style="margin-bottom: 24px;"><strong>Søknad på stilling som ${stilling || "[stillingstittel]"}</strong></p>
            <p style="margin-bottom: 16px;">Kjære ${bedrift || "[bedriftsnavn]"},</p>
            ${erfaring ? `<p style="margin-bottom: 16px;">${erfaring}</p>` : ""}
            ${motivasjon ? `<p style="margin-bottom: 16px;">${motivasjon}</p>` : ""}
            ${bidrag ? `<p style="margin-bottom: 16px;">${bidrag}</p>` : ""}
            <p style="margin-bottom: 16px;">Jeg ser frem til å høre fra dere og håper på muligheten til å presentere meg nærmere i et intervju.</p>
            <p style="margin-top: 32px;">Med vennlig hilsen,<br><strong>${navn || "[ditt navn]"}</strong></p>
        </div>`
}

// Download CV as PDF
function downloadPDF() {
    let navn = document.getElementById("navn").value || "MittCV"
    let element = document.getElementById("cv-preview")

    let opt = {
        margin: 10,
        filename: navn + "-CV.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
            scale: 2,
            backgroundColor: "#ffffff",
            removeContainer: true
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    }

    html2pdf().set(opt).from(element).save()
}

// Download søknadsbrev as PDF
function downloadSoknadsbrevPDF() {
    let navn = document.getElementById("sb-navn").value || "Søknadsbrev"
    let element = document.getElementById("soknadsbrev-preview")

    let opt = {
        margin: 20,
        filename: navn + "-Søknadsbrev.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
            scale: 2,
            backgroundColor: "#ffffff",
            removeContainer: true
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    }

    html2pdf().set(opt).from(element).save()
}