/* =========================================================
   ATURAN KELOMPOK DARI DATABASE
   Admin mengubahnya melalui panel admin di bawah hasil.
========================================================= */

let GROUP_RULES = {};

const FIRST_TURN_MEMBER =
    "Citra Rahmatina";


/* =========================================================
   ELEMENT
========================================================= */


const memberInput =
    document.getElementById("memberInput");


const memberCount =
    document.getElementById("memberCount");


const draftStatus =
    document.getElementById("draftStatus");


const resultStats =
    document.getElementById("resultStats");


const resultMemberStat =
    document.getElementById("resultMemberStat");


const resultGroupStat =
    document.getElementById("resultGroupStat");


const resultLeaderStat =
    document.getElementById("resultLeaderStat");

const inputStatus =
    document.getElementById("inputStatus");

const amountInput =
    document.getElementById("amountInput");


const amountLabel =
    document.getElementById("amountLabel");


const leaderToggle =
    document.getElementById("leaderToggle");


const leaderCount =
    document.getElementById("leaderCount");


const leaderCountWrapper =
    document.getElementById("leaderCountWrapper");


const spinButton =
    document.getElementById("spinButton");


const resetButton =
    document.getElementById("resetButton");


const groupsContainer =
    document.getElementById("groupsContainer");


const emptyResult =
    document.getElementById("emptyResult");


const resultStatus =
    document.getElementById("resultStatus");


const statusBadge =
    document.getElementById("statusBadge");


const spinOverlay =
    document.getElementById("spinOverlay");


const spinStage =
    document.getElementById("spinStage");


const rollingNames =
    document.getElementById("rollingNames");


const spinSubtext =
    document.getElementById("spinSubtext");


const loadingProgress =
    document.getElementById("loadingProgress");


const exportActions =
    document.getElementById("exportActions");


const copyButton =
    document.getElementById("copyButton");


const exportButton =
    document.getElementById("exportButton");

const printButton =
    document.getElementById("printButton");

const adminCard =
    document.getElementById("adminCard");

const themeToggle =
    document.getElementById("themeToggle");

const themeToggleMobile =
    document.getElementById("themeToggleMobile");

const themeButtons =
    [themeToggle, themeToggleMobile];

const storyMemberCount =
    document.getElementById("storyMemberCount");

const storyGroupCount =
    document.getElementById("storyGroupCount");

const storyLeaderCount =
    document.getElementById("storyLeaderCount");

const storyChatState =
    document.getElementById("storyChatState");

const memberSearch =
    document.getElementById("memberSearch");

const railName =
    document.getElementById("railName");

const railAvatar =
    document.getElementById("railAvatar");

const adminGroupsEditor =
    document.getElementById("adminGroupsEditor");


const adminAddGroupButton =
    document.getElementById("adminAddGroupButton");


const adminSaveRulesButton =
    document.getElementById("adminSaveRulesButton");


const adminStatus =
    document.getElementById("adminStatus");

const individualWheel =
    document.getElementById("individualWheel");

const individualWheelCaption =
    document.getElementById("individualWheelCaption");

const individualWheelLabels =
    document.getElementById("individualWheelLabels");

const individualMemberInput =
    document.getElementById("individualMemberInput");

const individualEntryCount =
    document.getElementById("individualEntryCount");

const individualResultCount =
    document.getElementById("individualResultCount");

const individualResultName =
    document.getElementById("individualResultName");

const individualStatus =
    document.getElementById("individualStatus");

const individualEntriesTab =
    document.getElementById("individualEntriesTab");

const individualResultsTab =
    document.getElementById("individualResultsTab");

const individualEntriesPane =
    document.getElementById("individualEntriesPane");

const individualResultsPane =
    document.getElementById("individualResultsPane");

const individualShuffleButton =
    document.getElementById("individualShuffleButton");

const individualSortButton =
    document.getElementById("individualSortButton");

const individualImageButton =
    document.getElementById("individualImageButton");

const individualImageInput =
    document.getElementById("individualImageInput");


/* =========================================================
   SOUND ENGINE
   Tidak membutuhkan file MP3/WAV.
   Jadi tetap bisa digunakan secara offline.
========================================================= */


let audioContext = null;


function initAudio() {

    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {

            return null;

        }

        audioContext =
            new AudioContext();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }


    return audioContext;

}


/* Suara satu beep */

function playTone(
    frequency,
    duration,
    type = "sine",
    volume = 0.045,
    delay = 0
) {

    const ctx =
        initAudio();


    if (!ctx) {

        return;

    }


    const oscillator =
        ctx.createOscillator();


    const gain =
        ctx.createGain();


    oscillator.type =
        type;


    oscillator.frequency.setValueAtTime(
        frequency,
        ctx.currentTime + delay
    );


    gain.gain.setValueAtTime(
        0.0001,
        ctx.currentTime + delay
    );


    gain.gain.exponentialRampToValueAtTime(
        volume,
        ctx.currentTime + delay + 0.01
    );


    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime +
            delay +
            duration
    );


    oscillator.connect(gain);

    gain.connect(ctx.destination);


    oscillator.start(
        ctx.currentTime + delay
    );


    oscillator.stop(
        ctx.currentTime +
            delay +
            duration +
            0.02
    );

}


/* Suara ketika nama sedang berputar */

function playRollSound() {

    playTone(
        260 + Math.random() * 180,
        0.055,
        "square",
        0.025
    );

}


/* Suara ketika tim ditentukan */

function playTeamSound() {

    playTone(
        520,
        0.09,
        "sine",
        0.05
    );

    playTone(
        680,
        0.12,
        "sine",
        0.05,
        0.08
    );

}


/* Suara selesai */

function playCompleteSound() {

    playTone(
        523.25,
        0.14,
        "sine",
        0.06
    );

    playTone(
        659.25,
        0.14,
        "sine",
        0.06,
        0.12
    );

    playTone(
        783.99,
        0.22,
        "sine",
        0.07,
        0.24
    );

}


/* Suara klik */

function playClickSound() {

    playTone(
        500,
        0.06,
        "sine",
        0.03
    );

}


/* =========================================================
   UTILITAS
========================================================= */


function sleep(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}


/* Fisher-Yates */

function shuffle(array) {

    const result =
        [...array];


    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            result[i],
            result[j]
        ] =
        [
            result[j],
            result[i]
        ];

    }


    return result;

}

function isFirstTurnMember(name) {

    return name.trim().toLowerCase() ===
        FIRST_TURN_MEMBER.toLowerCase();

}


function prioritizeFirstTurnMember(groups) {

    const firstTurnGroupIndex =
        groups.findIndex(
            group =>
                group.members.some(
                    isFirstTurnMember
                )
        );


    if (
        firstTurnGroupIndex < 0
    ) {

        return groups;

    }


    const firstTurnGroup =
        groups[firstTurnGroupIndex];

    const firstTurnMemberIndex =
        firstTurnGroup.members.findIndex(
            isFirstTurnMember
        );

    const [
        firstTurnMember
    ] =
        firstTurnGroup.members.splice(
            firstTurnMemberIndex,
            1
        );

    firstTurnGroup.members.unshift(
        firstTurnMember
    );


    if (
        firstTurnGroupIndex === 0
    ) {

        return groups;

    }


    return [
        firstTurnGroup,
        ...groups.slice(
            0,
            firstTurnGroupIndex
        ),
        ...groups.slice(
            firstTurnGroupIndex + 1
        )
    ];

}


/* =========================================================
   NAMA
========================================================= */


const DRAFT_STORAGE_KEY =
    "pembagian-tim-draft";


const THEME_STORAGE_KEY =
    "pembagian-tim-theme";


let draftSaveTimer =
    null;


function setDraftStatus(message) {

    draftStatus.textContent =
        message;

}


function saveDraft() {

    try {
        localStorage.setItem(
            DRAFT_STORAGE_KEY,
            JSON.stringify(
                {
                    members:
                        memberInput.value,
                    amount:
                        amountInput.value,
                    mode:
                        document.querySelector(
                            'input[name="distributionMode"]:checked'
                        )?.value
                        || "groups",
                    leadersEnabled:
                        leaderToggle.checked,
                    leaderCount:
                        leaderCount.value
                }
            )
        );

        setDraftStatus(
            "Tersimpan lokal"
        );

    } catch (error) {
        setDraftStatus(
            "Draft lokal tidak tersedia"
        );
    }

}


function queueDraftSave() {

    setDraftStatus(
        "Menyimpan draft..."
    );

    clearTimeout(
        draftSaveTimer
    );

    draftSaveTimer =
        setTimeout(
            saveDraft,
            350
        );

}


function restoreDraft() {

    try {
        const saved =
            JSON.parse(
                localStorage.getItem(
                    DRAFT_STORAGE_KEY
                )
            );

        if (!saved) {
            return;
        }

        memberInput.value =
            typeof saved.members === "string"
                ? saved.members
                : "";

        amountInput.value =
            saved.amount
            || "10";

        document
            .querySelectorAll(
                'input[name="distributionMode"]'
            )
            .forEach(
                radio => {
                    radio.checked =
                        radio.value ===
                        (
                            saved.mode
                            || "groups"
                        );
                }
            );

        leaderToggle.checked =
            saved.leadersEnabled !==
            false;

        leaderCount.value =
            saved.leaderCount
            || "1";

        setDraftStatus(
            "Draft dipulihkan"
        );

    } catch (error) {
        localStorage.removeItem(
            DRAFT_STORAGE_KEY
        );
    }

}


function initialsFrom(value) {

    const parts =
        String(value || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (parts.length === 0) {
        return "?";
    }

    return parts
        .slice(0, 2)
        .map(part => part[0])
        .join("")
        .toUpperCase();

}


function applyTheme(theme) {

    const nextTheme =
        theme === "light"
            ? "light"
            : "dark";

    document.documentElement.dataset.theme =
        nextTheme;

    const themeMeta =
        document.querySelector(
            'meta[name="theme-color"]'
        );

    if (themeMeta) {
        themeMeta.content =
            nextTheme === "dark"
                ? "#08356f"
                : "#ffffff";
    }

    const isDark =
        nextTheme === "dark";

    themeButtons.forEach(button => {

        const label =
            button.querySelector(".theme-label");

        if (label) {
            label.textContent =
                isDark
                    ? "Mode terang"
                    : "Mode gelap";
        }

        button.setAttribute(
            "aria-pressed",
            String(isDark)
        );

        button.setAttribute(
            "aria-label",
            isDark
                ? "Aktifkan mode terang"
                : "Aktifkan mode gelap"
        );

    });

    try {
        localStorage.setItem(
            THEME_STORAGE_KEY,
            nextTheme
        );
    } catch (error) {
        // Preferensi tema tetap berlaku untuk sesi ini.
    }

}


function initializeTheme() {

    let savedTheme =
        "";

    try {
        savedTheme =
            localStorage.getItem(
                THEME_STORAGE_KEY
            )
            || "";
    } catch (error) {
        savedTheme =
            "";
    }

    const preferredTheme =
        savedTheme === "dark"
        || savedTheme === "light"
            ? savedTheme
            : "light";

    applyTheme(
        preferredTheme
    );

}


themeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            applyTheme(
                document.documentElement.dataset.theme === "dark"
                    ? "light"
                    : "dark"
            );

        }
    );

});


initializeTheme();
restoreDraft();

function getNames() {

    return memberInput.value

        .split("\n")

        .map(
            name =>
                name.trim()
        )

        .filter(
            name =>
                name.length > 0
        )

        .filter(
            (name, index, array) =>
                array.indexOf(name) === index
        );

}

let individualResultTotal =
    0;

let individualWheelRotation =
    0;

let individualSpinCount =
    0;

let individualSpinInProgress =
    false;

const INDIVIDUAL_SPIN_DURATION =
    2200;


function getIndividualNames() {

    return individualMemberInput.value
        .split("\n")
        .map(
            name =>
                name.trim()
        )
        .filter(
            name =>
                name.length > 0
        )
        .filter(
            (name, index, array) =>
                array.indexOf(name) === index
        );

}

const INDIVIDUAL_WHEEL_COLORS =
    [
        "#4aa8d8",
        "#f7dc62",
        "#73d7a4",
        "#a765c9"
    ];


function renderIndividualWheel() {

    const names =
        getIndividualNames();

    individualWheelLabels.innerHTML =
        "";

    if (
        names.length === 0
    ) {

        individualWheel.style.backgroundImage =
            "";

        individualWheelCaption.textContent =
            "Ketuk untuk memutar";

        return;

    }

    const segmentSize =
        360 /
        names.length;

    const stops =
        names
            .map(
                (_, index) => {

                    const start =
                        index *
                        segmentSize;

                    const end =
                        (
                            index + 1
                        ) *
                        segmentSize;

                    const color =
                        INDIVIDUAL_WHEEL_COLORS[
                            index %
                            INDIVIDUAL_WHEEL_COLORS.length
                        ];

                    return `${color} ${start}deg ${end}deg`;

                }
            )
            .join(", ");

    individualWheel.style.backgroundImage =
        `conic-gradient(from -90deg, ${stops})`;

    individualWheelCaption.textContent =
        "Ketuk untuk memutar";

    const labelRadius =
        individualWheel.clientWidth *
        0.34;

    names.forEach(
        (name, index) => {

            const label =
                document.createElement(
                    "span"
                );

            const midpoint =
                (
                    index +
                    0.5
                ) *
                segmentSize;

            label.className =
                "individual-wheel-label";

            label.textContent =
                name;

            label.title =
                name;

            label.style.transform =
                `translate(-50%, -50%) rotate(${midpoint}deg) translateY(-${labelRadius}px) rotate(${-midpoint}deg)`;

            individualWheelLabels.appendChild(
                label
            );

        }
    );

}


window.addEventListener(
    "resize",
    renderIndividualWheel
);


function updateIndividualCount() {

    individualEntryCount.textContent =
        String(
            getIndividualNames().length
        );
    renderIndividualWheel();
}


function setIndividualStatus(message = "") {

    individualStatus.textContent =
        message;

}


function setIndividualTab(tab) {

    const showResults =
        tab === "results";

    individualEntriesTab.classList.toggle(
        "active",
        !showResults
    );

    individualResultsTab.classList.toggle(
        "active",
        showResults
    );

    individualEntriesTab.setAttribute(
        "aria-selected",
        String(!showResults)
    );

    individualResultsTab.setAttribute(
        "aria-selected",
        String(showResults)
    );

    individualEntriesPane.hidden =
        showResults;

    individualResultsPane.hidden =
        !showResults;

}


function spinIndividualWheel() {

    if (
        individualSpinInProgress
    ) {

        return;

    }

    const names =
        getIndividualNames();

    if (
        names.length === 0
    ) {

        setIndividualStatus(
            "Masukkan minimal satu nama untuk memutar roda."
        );

        setIndividualTab(
            "entries"
        );

        individualMemberInput.focus();

        return;

    }

    const firstTurnIndex =
        names.findIndex(
            isFirstTurnMember
        );

    if (
        firstTurnIndex < 0
    ) {

        setIndividualStatus(
            `Tambahkan ${FIRST_TURN_MEMBER}; tiga spin pertama dikunci ke nama itu.`
        );

        setIndividualTab(
            "entries"
        );

        individualMemberInput.focus();

        return;

    }

    const nextSpinNumber =
        individualSpinCount + 1;

    const firstThreeSpins =
        nextSpinNumber <= 3;

    const selectedName =
        firstThreeSpins
            ? FIRST_TURN_MEMBER
            : names[
                Math.floor(
                    Math.random() *
                    names.length
                )
            ];

    const selectedIndex =
        firstThreeSpins
            ? firstTurnIndex
            : names.findIndex(
                name =>
                    name ===
                    selectedName
            );

    const segmentSize =
        360 /
        names.length;

    const selectedMidpoint =
        (
            selectedIndex +
            0.5
        ) *
        segmentSize;

    const currentRotation =
        (
            individualWheelRotation %
            360 +
            360
        ) %
        360;

    const pointerAlignment =
        (
            90 -
            selectedMidpoint -
            currentRotation +
            360
        ) %
        360;

    individualWheelRotation +=
        1800 +
        Math.floor(
            Math.random() *
            360
        ) +
        pointerAlignment;

    individualSpinCount =
        nextSpinNumber;

    individualSpinInProgress =
        true;

    individualWheel.style.transform =
        `rotate(${individualWheelRotation}deg)`;

    individualWheel.setAttribute(
        "aria-busy",
        "true"
    );

    individualStatus.textContent =
        firstThreeSpins
            ? `Spin ${nextSpinNumber}/3 dikunci ke ${FIRST_TURN_MEMBER}.`
            : "Roda sedang berputar...";

    playClickSound();

    window.setTimeout(
        () => {

            individualResultTotal++;

            individualResultName.textContent =
                selectedName;

            individualResultCount.textContent =
                String(
                    individualResultTotal
                );

            individualSpinInProgress =
                false;

            individualWheel.removeAttribute(
                "aria-busy"
            );

            setIndividualStatus(
                `Hasil terakhir: ${selectedName}`
            );

            setIndividualTab(
                "results"
            );

        },
        INDIVIDUAL_SPIN_DURATION
    );

}


individualMemberInput.addEventListener(
    "input",
    () => {
        updateIndividualCount();
        setIndividualStatus();
    }
);

individualEntriesTab.addEventListener(
    "click",
    () => setIndividualTab("entries")
);

individualResultsTab.addEventListener(
    "click",
    () => setIndividualTab("results")
);

individualShuffleButton.addEventListener(
    "click",
    () => {

        const names =
            shuffle(
                getIndividualNames()
            );

        individualMemberInput.value =
            names.join("\n");

        updateIndividualCount();

    }
);

individualSortButton.addEventListener(
    "click",
    () => {

        const names =
            getIndividualNames()
                .sort(
                    (a, b) =>
                        a.localeCompare(
                            b,
                            "id",
                            {
                                sensitivity:
                                    "base"
                            }
                        )
                );

        individualMemberInput.value =
            names.join("\n");

        updateIndividualCount();

    }
);

individualWheel.addEventListener(
    "click",
    spinIndividualWheel
);

individualWheel.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
            || event.key === " "
        ) {

            event.preventDefault();
            spinIndividualWheel();

        }

    }
);

individualImageButton.addEventListener(
    "click",
    () => individualImageInput.click()
);

individualImageInput.addEventListener(
    "change",
    () => {

        const file =
            individualImageInput.files?.[0];

        if (
            !file
        ) {

            return;

        }

        const reader =
            new FileReader();

        reader.addEventListener(
            "load",
            () => {

                individualWheel.style.backgroundImage =
                    `url("${reader.result}")`;

                individualWheel.style.backgroundSize =
                    "cover";

                individualWheel.style.backgroundPosition =
                    "center";

            }
        );

        reader.readAsDataURL(
            file
        );

    }
);

updateIndividualCount();


function updateMemberCount() {

    const names =
        getNames();

    memberCount.textContent =
        `${names.length} anggota`;

    if (storyMemberCount) {
        storyMemberCount.textContent =
            String(names.length);
    }

}

function setInputStatus(message = "", isError = false) {

    inputStatus.textContent =
        message;

    inputStatus.classList.toggle(
        "error",
        isError
    );

}


memberInput.addEventListener(
    "input",
    () => {
        updateMemberCount();
        setInputStatus();
        queueDraftSave();
        highlightMemberSearch();
    }
);

memberSearch.addEventListener(
    "input",
    highlightMemberSearch
);

function highlightMemberSearch() {

    const query =
        memberSearch.value
            .trim()
            .toLowerCase();

    const matched =
        !query
        || getNames().some(name =>
            name.toLowerCase().includes(query)
        );

    memberSearch.setAttribute(
        "aria-invalid",
        query && !matched
            ? "true"
            : "false"
    );

    setInputStatus(
        query
            ? (
                matched
                    ? `Ada nama yang cocok dengan “${memberSearch.value.trim()}”.`
                    : "Tidak ada nama yang cocok."
            )
            : "",
        Boolean(query && !matched)
    );

}

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey
            && event.key === "Enter"
            && document.activeElement === memberInput
        ) {
            event.preventDefault();
            spinButton.click();
        }

        if (
            event.key === "Escape"
            && document.activeElement !== chatInput
            && document.activeElement !== authPasswordInput
            && !spinButton.disabled
        ) {
            resetButton.click();
        }

    }
);


/* =========================================================
   MODE PEMBAGIAN
========================================================= */


document
    .querySelectorAll(
        'input[name="distributionMode"]'
    )
    .forEach(
        radio => {

            radio.addEventListener(
                "change",
                () => {
                    updateDistributionLabel();
                    queueDraftSave();
                }
            );

        }
    );


function updateStoryPreview() {

    if (storyGroupCount) {
        const mode =
            document.querySelector(
                'input[name="distributionMode"]:checked'
            ).value;

        storyGroupCount.textContent =
            mode === "groups"
                ? String(amountInput.value || 0)
                : "Auto";
    }

    if (storyLeaderCount) {
        storyLeaderCount.textContent =
            leaderToggle.checked
                ? String(leaderCount.value || 0)
                : "0";
    }

}


function updateDistributionLabel() {

    const mode =
        document.querySelector(
            'input[name="distributionMode"]:checked'
        ).value;


    if (mode === "groups") {

        amountLabel.textContent =
            "Jumlah tim";

    } else {

        amountLabel.textContent =
            "Anggota per tim";

    }

    updateStoryPreview();

}


/* =========================================================
   TOGGLE PERWAKILAN
========================================================= */


leaderToggle.addEventListener(
    "change",
    () => {

        leaderCountWrapper.style.display =
            leaderToggle.checked
                ? "block"
                : "none";

        updateStoryPreview();
        queueDraftSave();

    }
);


amountInput.addEventListener(
    "input",
    () => {
        updateStoryPreview();
        queueDraftSave();
    }
);


leaderCount.addEventListener(
    "input",
    () => {
        updateStoryPreview();
        queueDraftSave();
    }
);


/* =========================================================
   JUMLAH TIM
========================================================= */


function getMinimumConfiguredGroupCount() {

    return Object.keys(
        GROUP_RULES
    )
        .map(
            Number
        )
        .filter(
            number =>
                Number.isInteger(number)
                && number > 0
                && number <= 10
        )
        .reduce(
            (maximum, number) =>
                Math.max(
                    maximum,
                    number
                ),
            0
        );

}


function calculateGroupCount(
    totalMembers
) {

    const mode =
        document.querySelector(
            'input[name="distributionMode"]:checked'
        ).value;


    const amount =
        parseInt(
            amountInput.value,
            10
        );


    if (
        !Number.isFinite(amount) ||
        amount < 1
    ) {

        return 0;

    }

    const configuredMinimum =
        Math.min(
            getMinimumConfiguredGroupCount(),
            totalMembers
        );


    if (mode === "groups") {

        return Math.max(
            Math.min(
                amount,
                totalMembers
            ),
            configuredMinimum
        );

    }


    return Math.max(
        Math.ceil(
            totalMembers / amount
        ),
        configuredMinimum
    );

}



/* =========================================================
   CREATE GROUP
========================================================= */


function createGroups(names) {

    const groupCount =
        calculateGroupCount(
            names.length
        );


    if (groupCount < 1) {

        return [];

    }


    const groups =
        Array.from(
            {
                length:
                    groupCount
            },
            (_, index) => ({

                number:
                    index + 1,

                members:
                    []

            })
        );


    /*
       Hitung target anggota.
    */

    const baseSize =
        Math.floor(
            names.length /
            groupCount
        );


    let extra =
        names.length %
        groupCount;


    const targetSizes =
        groups.map(
            () => {

                if (extra > 0) {

                    extra--;

                    return baseSize + 1;

                }

                return baseSize;

            }
        );


    const nameMap =
        new Map(
            names.map(
                name => [
                    name.toLowerCase(),
                    name
                ]
            )
        );


    const assignedHidden =
        new Set();


    /*
       Masukkan anggota yang ditentukan admin.
    */

    Object.entries(
        GROUP_RULES
    )
        .forEach(
            ([groupNumber, ruleNames]) => {

                const number =
                    Number(groupNumber);


                if (
                    number < 1 ||
                    number > groupCount
                ) {

                    return;

                }


                const targetGroup =
                    groups[
                        number - 1
                    ];


                ruleNames
                    .filter(
                        name =>
                            nameMap.has(
                                name.toLowerCase()
                            )
                    )
                    .forEach(
                        name => {

                            const actualName =
                                nameMap.get(
                                    name.toLowerCase()
                                );

                            if (
                                !assignedHidden.has(
                                    actualName
                                )
                            ) {

                                targetGroup.members
                                    .push(actualName);


                                assignedHidden.add(
                                    actualName
                                );

                            }

                        }
                    );

            }
        );


    /*
       Sisa anggota.
    */

    let remaining =
        names.filter(
            name =>
                !assignedHidden.has(
                    name
                )
        );


    /*
       Acak sisa anggota.
    */

    remaining =
        shuffle(
            remaining
        );


    /*
       Distribusi seimbang.
    */

    for (
        const name of remaining
    ) {

        const availableGroups =
            groups.filter(
                (group, index) =>
                    group.members.length <
                    targetSizes[index]
            );


        if (
            availableGroups.length === 0
        ) {

            const smallest =
                [...groups]
                    .sort(
                        (a, b) =>
                            a.members.length -
                            b.members.length
                    )[0];


            smallest.members.push(
                name
            );


            continue;

        }


        const minimum =
            Math.min(
                ...availableGroups.map(
                    group =>
                        group.members.length
                )
            );


        const candidates =
            availableGroups.filter(
                group =>
                    group.members.length ===
                    minimum
            );


        const selected =
            candidates[
                Math.floor(
                    Math.random() *
                    candidates.length
                )
            ];


        selected.members.push(
            name
        );

    }


    /*
       Acak urutan nama di dalam kelompok.
    */

    groups.forEach(
        group => {

            group.members =
                shuffle(
                    group.members
                );

        }
    );


    return prioritizeFirstTurnMember(
        groups
    );

}


/* =========================================================
   ROLLING NAME
========================================================= */


function showRollingName(name) {

    rollingNames.innerHTML =
        "";


    const element =
        document.createElement(
            "div"
        );


    element.className =
        "rolling-name";


    element.textContent =
        name;


    rollingNames.appendChild(
        element
    );

}


/* =========================================================
   RANDOM NAME ANIMATION
========================================================= */


async function randomNameAnimation(
    names,
    duration = 2000
) {

    const start =
        Date.now();


    while (
        Date.now() - start <
        duration
    ) {

        const randomName =
            names[
                Math.floor(
                    Math.random() *
                    names.length
                )
            ];


        showRollingName(
            randomName
        );


        /*
           Sound setiap beberapa pergantian
           supaya tidak terlalu berisik.
        */

        if (
            Math.random() > 0.45
        ) {

            playRollSound();

        }


        const elapsed =
            Date.now() -
            start;


        const progress =
            elapsed /
            duration;


        const delay =
            45 +
            progress * 80;


        await sleep(
            delay
        );

    }

}


/* =========================================================
   PILIH PERWAKILAN
========================================================= */


function chooseLeaders(groups) {

    const result =
        {};


    if (
        !leaderToggle.checked
    ) {

        return result;

    }


    let count =
        parseInt(
            leaderCount.value,
            10
        );


    if (
        !Number.isFinite(count) ||
        count < 1
    ) {

        count = 1;

    }


    groups.forEach(
        group => {

            const leaderAmount =
                Math.min(
                    count,
                    group.members.length
                );

            const shuffledMembers =
                shuffle(
                    group.members
                );

            const firstTurnMember =
                group.members.find(
                    isFirstTurnMember
                );

            const orderedMembers =
                firstTurnMember
                    ? [
                        firstTurnMember,
                        ...shuffledMembers.filter(
                            member =>
                                member !==
                                firstTurnMember
                        )
                    ]
                    : shuffledMembers;

            result[
                group.number
            ] =
                orderedMembers.slice(
                    0,
                    leaderAmount
                );

        }
    );


    return result;

}


/* =========================================================
   BUAT CARD KELOMPOK
========================================================= */


function createGroupCard(
    group,
    index,
    selectedLeaders
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "group-card";


    card.style.animationDelay =
        `${index * 0.05}s`;


    const header =
        document.createElement(
            "div"
        );


    header.className =
        "group-header";


    const title =
        document.createElement(
            "div"
        );


    title.className =
        "group-title";


    const number =
        document.createElement(
            "div"
        );


    number.className =
        "group-number";


    number.textContent =
        group.number;


    const name =
        document.createElement(
            "div"
        );


    name.className =
        "group-name";


    name.textContent =
        `Tim ${group.number}`;


    title.appendChild(
        number
    );


    title.appendChild(
        name
    );


    const total =
        document.createElement(
            "div"
        );


    total.className =
        "member-total";


    total.textContent =
        `${group.members.length} anggota`;


    header.appendChild(
        title
    );


    header.appendChild(
        total
    );


    const membersContainer =
        document.createElement(
            "div"
        );


    membersContainer.className =
        "group-members";


    group.members.forEach(
        (member, memberIndex) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "member-item";


            const memberName =
                document.createElement(
                    "div"
                );


            memberName.className =
                "member-name";


            const indexCircle =
                document.createElement(
                    "div"
                );


            indexCircle.className =
                "member-index";


            indexCircle.textContent =
                memberIndex + 1;


            const text =
                document.createElement(
                    "div"
                );


            text.className =
                "member-name-text";


            text.textContent =
                member;


            memberName.appendChild(
                indexCircle
            );


            memberName.appendChild(
                text
            );


            item.appendChild(
                memberName
            );


            /*
               Tandai perwakilan.
            */

            if (
                selectedLeaders &&
                selectedLeaders[
                    group.number
                ] &&
                selectedLeaders[
                    group.number
                ].includes(
                    member
                )
            ) {

                const tag =
                    document.createElement(
                        "span"
                    );


                tag.className =
                    "leader-tag";


                tag.textContent =
                    "Perwakilan";


                item.appendChild(
                    tag
                );

            }


            membersContainer.appendChild(
                item
            );

        }
    );


    card.appendChild(
        header
    );


    card.appendChild(
        membersContainer
    );


    return card;

}


/* =========================================================
   REVEAL KELOMPOK
========================================================= */


async function revealGroups(
    groups,
    selectedLeaders
) {

    groupsContainer.innerHTML =
        "";


    emptyResult.style.display =
        "none";


    groupsContainer.style.display =
        "grid";


    for (
        let i = 0;
        i < groups.length;
        i++
    ) {

        const group =
            groups[i];


        /*
           Update tulisan.
        */

        spinStage.textContent =
            `MENENTUKAN TIM ${group.number}...`;


        spinSubtext.textContent =
            `Mengacak anggota Tim ${group.number}`;


        /*
           Sound transisi.
        */

        playTeamSound();


        /*
           Nama terus berputar.
        */

        await randomNameAnimation(
            group.members,
            900
        );


        /*
           Tampilkan nama tim.
        */

        showRollingName(
            `Tim ${group.number}`
        );


        await sleep(
            350
        );


        /*
           Tampilkan card.
        */

        const card =
            createGroupCard(
                group,
                i,
                selectedLeaders
            );


        groupsContainer.appendChild(
            card
        );


        /*
           Progress.
        */

        const progress =
            25 +
            (
                (i + 1) /
                groups.length
            ) *
            70;


        loadingProgress.style.width =
            `${progress}%`;


        await sleep(
            350
        );

    }

}


/* =========================================================
   ANIMASI UTAMA
========================================================= */


async function playSpinAnimation(
    names,
    groups,
    selectedLeaders
) {

    spinOverlay.classList.add(
        "active"
    );


    spinStage.textContent =
        "MENGACAK SEMUA ANGGOTA...";


    spinSubtext.textContent =
        "Semua anggota sedang diacak";


    loadingProgress.style.width =
        "0%";


    /*
       Suara awal.
    */

    playClickSound();


    await sleep(
        150
    );


    /*
       FASE 1
    */

    await randomNameAnimation(
        names,
        2200
    );


    loadingProgress.style.width =
        "25%";


    await sleep(
        300
    );


    /*
       FASE 2
    */

    await revealGroups(
        groups,
        selectedLeaders
    );


    loadingProgress.style.width =
        "100%";


    /*
       SELESAI
    */

    spinStage.textContent =
        "✓ PEMBAGIAN SELESAI!";


    spinSubtext.textContent =
        "Semua anggota telah mendapatkan kelompok";


    showRollingName(
        "Selesai!"
    );


    /*
       Sound kemenangan.
    */

    playCompleteSound();


    await sleep(
        1100
    );


    spinOverlay.classList.remove(
        "active"
    );

}


/* =========================================================
   FORMAT HASIL
========================================================= */


function renderResultStats(
    groups,
    names,
    selectedLeaders
) {

    const leaderTotal =
        Object.values(
            selectedLeaders
        )
            .reduce(
                (total, leaders) =>
                    total + leaders.length,
                0
            );

    resultMemberStat.textContent =
        `${names.length} anggota`;

    resultGroupStat.textContent =
        `${groups.length} kelompok`;

    resultLeaderStat.textContent =
        leaderTotal === 1
            ? "1 perwakilan"
            : `${leaderTotal} perwakilan`;

    resultStats.hidden =
        false;

    if (storyMemberCount) {
        storyMemberCount.textContent =
            String(names.length);
    }

    if (storyGroupCount) {
        storyGroupCount.textContent =
            String(groups.length);
    }

    if (storyLeaderCount) {
        storyLeaderCount.textContent =
            String(leaderTotal);
    }

}


function generateResultText() {

    const cards =
        groupsContainer.querySelectorAll(
            ".group-card"
        );


    if (
        cards.length === 0
    ) {

        return "";

    }


    let text =
        "HASIL PEMBAGIAN KELOMPOK\n";


    text +=
        "================================\n\n";


    cards.forEach(
        card => {

            const groupName =
                card.querySelector(
                    ".group-name"
                ).textContent;


            const members =
                card.querySelectorAll(
                    ".member-item"
                );


            text +=
                `${groupName}\n`;


            text +=
                "----------------------------\n";


            members.forEach(
                (member, index) => {

                    const name =
                        member.querySelector(
                            ".member-name-text"
                        ).textContent;


                    const leader =
                        member.querySelector(
                            ".leader-tag"
                        );


                    text +=
                        `${index + 1}. ${name}`;


                    if (leader) {

                        text +=
                            " [Perwakilan]";

                    }


                    text +=
                        "\n";

                }
            );


            text +=
                "\n";

        }
    );


    return text;

}


/* =========================================================
   SALIN HASIL
========================================================= */


copyButton.addEventListener(
    "click",
    async () => {

        const text =
            generateResultText();


        if (!text) {

            return;

        }


        playClickSound();


        try {

            await navigator.clipboard.writeText(
                text
            );


        } catch (error) {

            /*
               Fallback browser lama.
            */

            const textarea =
                document.createElement(
                    "textarea"
                );


            textarea.value =
                text;


            document.body.appendChild(
                textarea
            );


            textarea.select();


            document.execCommand(
                "copy"
            );


            textarea.remove();

        }


        const oldText =
            copyButton.textContent;


        copyButton.textContent =
            "✓ Berhasil Disalin";


        setTimeout(
            () => {

                copyButton.textContent =
                    oldText;

            },
            1500
        );

    }
);


/* =========================================================
   DOWNLOAD HASIL
========================================================= */


exportButton.addEventListener(
    "click",
    () => {

        const text =
            generateResultText();


        if (!text) {

            return;

        }


        playClickSound();


        const blob =
            new Blob(
                [text],
                {
                    type:
                        "text/plain;charset=utf-8"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        const date =
            new Date();


        const filename =
            `Hasil_Pembagian_Kelompok_${date
                .getFullYear()}-${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}-${String(
                    date.getDate()
                ).padStart(2, "0")}.txt`;


        link.download =
            filename;


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        URL.revokeObjectURL(
            url
        );

    }
);

printButton.addEventListener(
    "click",
    () => {

        if (
            groupsContainer.children.length === 0
        ) {
            return;
        }

        playClickSound();
        window.print();

    }
);


/* =========================================================
   JALANKAN
========================================================= */


spinButton.addEventListener(
    "click",
    async () => {

        const names =
            getNames();


        /*
           Inisialisasi audio SEBELUM
           proses async agar browser mengizinkan suara.
        */

        initAudio();


        if (
            names.length < 2
        ) {

            setInputStatus(
                "Masukkan minimal 2 anggota yang berbeda.",
                true
            );

            return;

        }

        if (
            !names.some(
                isFirstTurnMember
            )
        ) {

            setInputStatus(
                `Daftar anggota harus menyertakan ${FIRST_TURN_MEMBER}.`,
                true
            );

            return;

        }


        const groupCount =
            calculateGroupCount(
                names.length
            );


        if (
            groupCount < 1
        ) {

            setInputStatus(
                "Jumlah tim atau anggota per tim tidak valid.",
                true
            );

            return;

        }


        /*
           Buat kelompok.
        */

        const groups =
            createGroups(
                names
            );


        if (
            !groups ||
            groups.length === 0
        ) {

            setInputStatus(
                "Gagal membuat kelompok. Periksa kembali datanya.",
                true
            );

            return;

        }


        /*
           Pilih perwakilan.
        */

        const selectedLeaders =
            chooseLeaders(
                groups
            );

        renderResultStats(
            groups,
            names,
            selectedLeaders
        );

        setInputStatus();


        /*
           Matikan kontrol.
        */

        spinButton.disabled =
            true;


        resetButton.disabled =
            true;


        amountInput.disabled =
            true;


        memberInput.disabled =
            true;


        document
            .querySelectorAll(
                'input[name="distributionMode"]'
            )
            .forEach(
                radio =>
                    radio.disabled =
                        true
            );


        leaderToggle.disabled =
            true;


        leaderCount.disabled =
            true;


        /*
           Status.
        */

        statusBadge.textContent =
            "Mengacak...";


        statusBadge.style.background =
            "#eef2ff";


        statusBadge.style.color =
            "#4f46e5";


        resultStatus.textContent =
            "Pembagian sedang diproses";


        groupsContainer.innerHTML =
            "";


        exportActions.style.display =
            "none";


        /*
           Jalankan.
        */

        await playSpinAnimation(
            names,
            groups,
            selectedLeaders
        );


        /*
           Tombol export muncul.
        */

        exportActions.style.display =
            "grid";


        /*
           Status selesai.
        */

        statusBadge.textContent =
            "Selesai";


        statusBadge.style.background =
            "#dcfce7";


        statusBadge.style.color =
            "#166534";


        resultStatus.textContent =
            `${groups.length} tim berhasil dibuat`;


        /*
           Aktifkan kembali kontrol.
        */

        spinButton.disabled =
            false;


        resetButton.disabled =
            false;


        amountInput.disabled =
            false;


        memberInput.disabled =
            false;


        document
            .querySelectorAll(
                'input[name="distributionMode"]'
            )
            .forEach(
                radio =>
                    radio.disabled =
                        false
            );


        leaderToggle.disabled =
            false;


        leaderCount.disabled =
            false;

    }
);


/* =========================================================
   RESET
========================================================= */


resetButton.addEventListener(
    "click",
    () => {

        playClickSound();


        memberInput.value =
            "";

        try {
            localStorage.removeItem(
                DRAFT_STORAGE_KEY
            );
        } catch (error) {
            // Reset tetap berjalan jika storage diblokir.
        }

        setDraftStatus(
            "Draft dihapus"
        );


        groupsContainer.innerHTML =
            "";


        groupsContainer.style.display =
            "none";


        exportActions.style.display =
            "none";

        resultStats.hidden =
            true;


        emptyResult.style.display =
            "flex";


        memberCount.textContent =
            "0 anggota";


        resultStatus.textContent =
            "Belum ada pembagian";


        statusBadge.textContent =
            "Menunggu";


        statusBadge.style.background =
            "#f3f4f6";


        statusBadge.style.color =
            "#6b7280";


        amountInput.value =
            "10";


        leaderCount.value =
            "1";

        leaderToggle.checked =
            true;

        leaderCountWrapper.style.display =
            "block";

        setInputStatus();


        loadingProgress.style.width =
            "0%";


        spinStage.textContent =
            "MENGACAK SEMUA ANGGOTA...";


        spinSubtext.textContent =
            "Harap tunggu...";


        rollingNames.textContent =
            "Nama";

    }
);


/* =========================================================
   INITIAL
========================================================= */


groupsContainer.style.display =
    "none";


leaderCountWrapper.style.display =
    leaderToggle.checked
        ? "block"
        : "none";


updateMemberCount();

updateDistributionLabel();
/* =========================================================
   AUTHENTICATION & LIVE CHAT
   Supabase Auth menyimpan akun username dan realtime chat.
========================================================= */

const authLoginForm =
    document.getElementById("authLoginForm");


const authUsernameInput =
    document.getElementById("authUsernameInput");


const authPasswordInput =
    document.getElementById("authPasswordInput");


const loginButton =
    document.getElementById("loginButton");


const signupButton =
    document.getElementById("signupButton");


const logoutButton =
    document.getElementById("logoutButton");


const authLoggedOut =
    authLoginForm;


const authLoggedIn =
    document.getElementById("authLoggedIn");


const authAvatar =
    document.getElementById("authAvatar");


const authName =
    document.getElementById("authName");


const authEmail =
    document.getElementById("authEmail");


const authStatus =
    document.getElementById("authStatus");


const chatSignedOut =
    document.getElementById("chatSignedOut");


const chatWorkspace =
    document.getElementById("chatWorkspace");


const chatConnectionStatus =
    document.getElementById("chatConnectionStatus");


const chatUsers =
    document.getElementById("chatUsers");


const chatUserCount =
    document.getElementById("chatUserCount");

const chatSearch =
    document.getElementById("chatSearch");


const chatConversationHeader =
    document.getElementById("chatConversationHeader");


const chatMessages =
    document.getElementById("chatMessages");


const chatForm =
    document.getElementById("chatForm");


const chatInput =
    document.getElementById("chatInput");


const chatSendButton =
    document.getElementById("chatSendButton");


let supabaseClient = null;
let currentUser = null;
let selectedChatUser = null;
let selectedConversationId = null;
let usersChannel = null;
let messagesChannel = null;
let userRefreshTimer = null;
let pendingUsername = "";



function setAuthStatus(message, isError = false) {

    authStatus.textContent =
        message;

    authStatus.style.color =
        isError
            ? "#b91c1c"
            : "";

}

function getDatabaseErrorMessage(error) {

    const code =
        error?.code
        || "";

    if (
        code === "PGRST205"
        || code === "42P01"
    ) {
        return "tabel belum ada. Jalankan schema terbaru.";
    }

    if (
        code === "42501"
    ) {
        return "akses RLS ditolak. Jalankan ulang policy schema.";
    }

    if (
        code === "PGRST116"
    ) {
        return "query menghasilkan data ganda. Periksa constraint database.";
    }

    return error?.message
        ? error.message.slice(
            0,
            140
        )
        : "periksa schema, RLS, dan koneksi Supabase.";

}


function setChatConnectionStatus(message, state = "") {

    chatConnectionStatus.textContent =
        message;

    chatConnectionStatus.className =
        `chat-connection-status ${state}`;

}


function isSupabaseConfigured() {

    const config =
        window.SUPABASE_CONFIG;

    return Boolean(
        config
        && typeof config.url === "string"
        && config.url.startsWith("https://")
        && !config.url.includes("ISI_PROJECT_REF")
        && typeof config.anonKey === "string"
        && config.anonKey.length > 20
        && !config.anonKey.includes("ISI_")
    );

}


function clearChatChannels() {

    if (usersChannel) {
        supabaseClient
            .removeChannel(
                usersChannel
            );

        usersChannel =
            null;
    }

    if (messagesChannel) {
        supabaseClient
            .removeChannel(
                messagesChannel
            );

        messagesChannel =
            null;
    }

    if (userRefreshTimer) {
        clearTimeout(
            userRefreshTimer
        );

        userRefreshTimer =
            null;
    }

}


function renderSignedOut() {

    authLoggedOut.style.display =
        "block";

    authLoggedIn.style.display =
        "none";

    chatSignedOut.style.display =
        "flex";

    chatWorkspace.style.display =
        "none";

    chatUsers.innerHTML =
        "";

    chatMessages.innerHTML =
        "";

    chatInput.value =
        "";

    chatSearch.value =
        "";

    authPasswordInput.value =
        "";

    chatInput.disabled =
        true;

    chatSendButton.disabled =
        true;

    selectedChatUser =
        null;

    selectedConversationId =
        null;

    adminCard.style.display =
        "none";

    GROUP_RULES =
        {};

    adminGroupsEditor.innerHTML =
        "";

    if (railName) {
        railName.textContent =
            "pembagian.tim";
    }

    if (railAvatar) {
        railAvatar.textContent =
            "PT";
    }

    if (storyChatState) {
        storyChatState.textContent =
            "Off";
    }

    clearChatChannels();

    setChatConnectionStatus(
        "Login diperlukan"
    );

}


function renderSignedIn(user, displayName) {

    const name =
        displayName
        || "Pengguna";

    authLoggedOut.style.display =
        "none";

    authLoggedIn.style.display =
        "flex";

    chatSignedOut.style.display =
        "none";

    chatWorkspace.style.display =
        "grid";

    authName.textContent =
        name;

    authEmail.textContent =
        "Akun persisten";

    authAvatar.textContent =
        initialsFrom(name);

    authAvatar.setAttribute(
        "aria-label",
        `Avatar ${name}`
    );

    if (railName) {
        railName.textContent =
            name;
    }

    if (railAvatar) {
        railAvatar.textContent =
            initialsFrom(name);
    }

    if (storyChatState) {
        storyChatState.textContent =
            "On";
    }

    setAuthStatus(
        "Username aktif"
    );

    setChatConnectionStatus(
        "Terhubung",
        "connected"
    );

}


function getUserName(user) {

    return user.display_name
        || "Pengguna";

}


function getUserAvatar(user) {

    return user.avatar_url
        || "";

}


function getUserPair(firstUserId, secondUserId) {

    return [
        firstUserId,
        secondUserId
    ].sort();

}


function formatMessageTime(timestamp) {

    if (!timestamp) {
        return "Mengirim...";
    }

    return new Date(
        timestamp
    ).toLocaleTimeString(
        "id-ID",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


function renderMessages(messages) {

    chatMessages.innerHTML =
        "";

    if (!messages || messages.length === 0) {

        const empty =
            document.createElement(
                "p"
            );

        empty.className =
            "chat-placeholder";

        empty.textContent =
            "Belum ada pesan. Sapa anggota ini!";

        chatMessages.appendChild(
            empty
        );

        return;

    }

    messages.forEach(
        message => {

            const messageElement =
                document.createElement(
                    "div"
                );

            messageElement.className =
                "chat-message";

            if (
                message.sender_id ===
                currentUser.id
            ) {
                messageElement.classList.add(
                    "mine"
                );
            }

            const text =
                document.createElement(
                    "span"
                );

            text.textContent =
                message.body;

            const time =
                document.createElement(
                    "small"
                );

            time.className =
                "chat-message-time";

            time.textContent =
                formatMessageTime(
                    message.created_at
                );

            messageElement.append(
                text,
                time
            );

            chatMessages.appendChild(
                messageElement
            );

        }
    );

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


async function loadMessages() {

    if (
        !selectedConversationId
        || !supabaseClient
    ) {
        return;
    }

    const result =
        await supabaseClient
            .from("messages")
            .select("id, sender_id, receiver_id, body, created_at")
            .eq(
                "conversation_id",
                selectedConversationId
            )
            .order(
                "created_at",
                {
                    ascending: true
                }
            )
            .limit(100);

    if (result.error) {
        console.error(
            "Gagal memuat pesan:",
            result.error
        );

        setChatConnectionStatus(
            "Chat tidak tersedia",
            "error"
        );

        return;
    }

    renderMessages(
        result.data
    );

}


function subscribeToMessages() {

    if (
        messagesChannel
    ) {
        supabaseClient.removeChannel(
            messagesChannel
        );

        messagesChannel =
            null;
    }

    try {
        const channel =
            supabaseClient
                .channel(
                    `messages-${currentUser.id}-${selectedConversationId}`
                )
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table: "messages",
                        filter:
                            `conversation_id=eq.${selectedConversationId}`
                    },
                    loadMessages
                );

        messagesChannel =
            channel;

        channel.subscribe(
            status => {
                if (
                    status === "CHANNEL_ERROR"
                    || status === "TIMED_OUT"
                ) {
                    setChatConnectionStatus(
                        "Chat aktif, realtime sedang offline",
                        "error"
                    );
                }
            }
        );

    } catch (error) {
        console.warn(
            "Realtime pesan gagal:",
            error
        );

        messagesChannel =
            null;
    }

}


async function getOrCreateConversation(user) {

    const pair =
        getUserPair(
            currentUser.id,
            user.id
        );

    let result =
        await supabaseClient
            .from("conversations")
            .select("id")
            .eq("user_one", pair[0])
            .eq("user_two", pair[1])
            .maybeSingle();

    if (result.error) {
        throw result.error;
    }

    if (!result.data) {
        result =
            await supabaseClient
                .from("conversations")
                .insert(
                    {
                        user_one: pair[0],
                        user_two: pair[1]
                    }
                )
                .select("id")
                .single();

        if (
            result.error
            && result.error.code !== "23505"
        ) {
            throw result.error;
        }

        if (!result.data) {
            result =
                await supabaseClient
                    .from("conversations")
                    .select("id")
                    .eq("user_one", pair[0])
                    .eq("user_two", pair[1])
                    .single();
        }
    }

    if (
        result.error
        || !result.data
    ) {
        throw result.error
            || new Error(
                "Percakapan tidak ditemukan."
            );
    }

    return result.data.id;

}


async function selectChatUser(user) {

    selectedChatUser =
        user;

    chatConversationHeader.textContent =
        `Chat dengan ${getUserName(user)}`;

    chatInput.disabled =
        true;

    chatSendButton.disabled =
        true;

    chatMessages.innerHTML =
        "";

    try {
        selectedConversationId =
            await getOrCreateConversation(
                user
            );

        chatInput.disabled =
            false;

        chatSendButton.disabled =
            false;

        renderUsers(
            window.chatUsersCache || []
        );

        await loadMessages();
        subscribeToMessages();
        chatInput.focus();

    } catch (error) {
        console.error(
            "Gagal membuka percakapan:",
            error
        );

        setChatConnectionStatus(
            "Gagal membuka chat",
            "error"
        );
    }

}


function renderUsers(users = []) {

    window.chatUsersCache =
        users;

    chatUsers.innerHTML =
        "";

    const searchTerm =
        chatSearch.value
            .trim()
            .toLowerCase();

    const visibleUsers =
        users.filter(
            user =>
                getUserName(user)
                    .toLowerCase()
                    .includes(searchTerm)
        );

    chatUserCount.textContent =
        visibleUsers.length === users.length
            ? String(users.length)
            : `${visibleUsers.length}/${users.length}`;

    if (visibleUsers.length === 0) {

        const empty =
            document.createElement(
                "p"
            );

        empty.className =
            "chat-placeholder";

        empty.textContent =
            users.length === 0
                ? "Belum ada anggota lain yang login."
                : "Tidak ada anggota yang cocok.";

        chatUsers.appendChild(
            empty
        );

        return;

    }

    visibleUsers.forEach(
        user => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "chat-user";

            if (
                selectedChatUser
                && selectedChatUser.id === user.id
            ) {
                button.classList.add(
                    "selected"
                );
            }

            const avatarUrl =
                getUserAvatar(user);

            const avatar =
                document.createElement(
                    avatarUrl
                        ? "img"
                        : "span"
                );

            avatar.className =
                "chat-user-avatar";

            if (avatarUrl) {
                avatar.src =
                    avatarUrl;
                avatar.alt =
                    "";
            } else {
                avatar.textContent =
                    initialsFrom(
                        getUserName(user)
                    );
            }

            const copy =
                document.createElement(
                    "span"
                );

            copy.className =
                "chat-user-copy";

            const name =
                document.createElement(
                    "strong"
                );

            name.textContent =
                getUserName(user);

            const email =
                document.createElement(
                    "small"
                );

            email.textContent =
                "Anggota chat";

            copy.append(
                name,
                email
            );

            button.append(
                avatar,
                copy
            );

            button.addEventListener(
                "click",
                () =>
                    selectChatUser(user)
            );

            chatUsers.appendChild(
                button
            );

        }
    );

}


chatSearch.addEventListener(
    "input",
    () => {
        renderUsers(
            window.chatUsersCache || []
        );
    }
);


async function loadUsers() {

    const result =
        await supabaseClient
            .from("profiles")
            .select("id, display_name, avatar_url")
            .neq(
                "id",
                currentUser.id
            )
            .order(
                "display_name",
                {
                    ascending: true
                }
            );

    if (result.error) {
        console.error(
            "Gagal memuat pengguna:",
            result.error
        );

        setChatConnectionStatus(
            "Daftar anggota belum tersedia",
            "error"
        );

        return;
    }

    renderUsers(
        result.data
    );

}

function setAdminStatus(message, isError = false) {

    adminStatus.textContent =
        message;

    adminStatus.style.color =
        isError
            ? "#b91c1c"
            : "";

}


function getAdminRuleCards() {

    return [
        ...adminGroupsEditor.querySelectorAll(
            ".admin-rule-card"
        )
    ];

}


function normalizeAdminNames(value) {

    return value
        .split("\n")
        .map(
            name =>
                name.trim()
        )
        .filter(
            name =>
                name.length > 0
        )
        .filter(
            (name, index, array) =>
                array.findIndex(
                    candidate =>
                        candidate.toLowerCase() ===
                        name.toLowerCase()
                ) === index
        );

}


function updateAdminAddButton() {

    const cardCount =
        getAdminRuleCards().length;

    adminAddGroupButton.disabled =
        cardCount >= 10;

    adminAddGroupButton.textContent =
        cardCount >= 10
            ? "Maks. 10 Kelompok"
            : "＋ Tambah Kelompok";

}


function createAdminRuleCard(
    groupNumber = "",
    names = []
) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "admin-rule-card";

    const heading =
        document.createElement(
            "div"
        );

    heading.className =
        "admin-rule-card-heading";

    const title =
        document.createElement(
            "strong"
        );

    title.textContent =
        "Kelompok tetap";

    const removeButton =
        document.createElement(
            "button"
        );

    removeButton.type =
        "button";

    removeButton.className =
        "admin-remove-group";

    removeButton.textContent =
        "Hapus";

    removeButton.addEventListener(
        "click",
        () => {
            card.remove();

            if (
                getAdminRuleCards().length === 0
            ) {
                adminGroupsEditor.appendChild(
                    createAdminRuleCard()
                );
            }

            updateAdminAddButton();
        }
    );

    heading.append(
        title,
        removeButton
    );

    const field =
        document.createElement(
            "label"
        );

    field.className =
        "admin-rule-card-field";

    const fieldTitle =
        document.createElement(
            "span"
        );

    fieldTitle.textContent =
        "Pilih nomor kelompok";

    const select =
        document.createElement(
            "select"
        );

    select.className =
        "admin-group-select";

    const emptyOption =
        document.createElement(
            "option"
        );

    emptyOption.value =
        "";

    emptyOption.textContent =
        "Pilih kelompok...";

    select.appendChild(
        emptyOption
    );

    for (
        let number = 1;
        number <= 10;
        number++
    ) {
        const option =
            document.createElement(
                "option"
            );

        option.value =
            String(number);

        option.textContent =
            `Kelompok ${number}`;

        option.selected =
            Number(groupNumber) ===
            number;

        select.appendChild(
            option
        );
    }

    const membersLabel =
        document.createElement(
            "label"
        );

    membersLabel.className =
        "admin-rule-card-field";

    const membersTitle =
        document.createElement(
            "span"
        );

    membersTitle.textContent =
        "Nama anggota, satu per baris";

    const textarea =
        document.createElement(
            "textarea"
        );

    textarea.className =
        "admin-group-members-input";

    textarea.rows =
        5;

    textarea.placeholder =
        "Contoh:\nAndi\nBudi\nCitra";

    textarea.value =
        names.join("\n");

    field.append(
        fieldTitle,
        select
    );

    membersLabel.append(
        membersTitle,
        textarea
    );

    card.append(
        heading,
        field,
        membersLabel
    );

    return card;

}


function renderAdminRules() {

    adminGroupsEditor.innerHTML =
        "";

    const rules =
        Object.entries(
            GROUP_RULES
        )
            .filter(
                ([groupNumber]) =>
                    Number(groupNumber) >= 1
                    && Number(groupNumber) <= 10
            )
            .sort(
                ([first], [second]) =>
                    Number(first) - Number(second)
            )
            .slice(
                0,
                10
            );

    if (rules.length === 0) {
        adminGroupsEditor.appendChild(
            createAdminRuleCard()
        );
    } else {
        rules.forEach(
            ([groupNumber, names]) => {
                adminGroupsEditor.appendChild(
                    createAdminRuleCard(
                        groupNumber,
                        names
                    )
                );
            }
        );
    }

    updateAdminAddButton();

}


function addAdminRuleCard() {

    if (
        getAdminRuleCards().length >= 10
    ) {
        setAdminStatus(
            "Maksimal 10 kolom kelompok.",
            true
        );

        return;
    }

    const card =
        createAdminRuleCard();

    adminGroupsEditor.appendChild(
        card
    );

    updateAdminAddButton();

    card.querySelector(
        ".admin-group-select"
    ).focus();

}


function collectAdminRules() {

    const rules =
        [];

    const usedGroups =
        new Set();

    const usedNames =
        new Set();

    for (
        const card of getAdminRuleCards()
    ) {
        const groupNumber =
            parseInt(
                card.querySelector(
                    ".admin-group-select"
                ).value,
                10
            );

        const names =
            normalizeAdminNames(
                card.querySelector(
                    ".admin-group-members-input"
                ).value
            );

        if (
            !Number.isInteger(groupNumber)
            || groupNumber < 1
            || groupNumber > 10
        ) {
            return {
                error:
                    "Pilih nomor untuk setiap kolom kelompok."
            };
        }

        if (
            usedGroups.has(groupNumber)
        ) {
            return {
                error:
                    `Kelompok ${groupNumber} dipilih lebih dari sekali.`
            };
        }

        if (names.length === 0) {
            return {
                error:
                    `Isi minimal satu nama untuk Kelompok ${groupNumber}.`
            };
        }

        for (
            const name of names
        ) {
            const key =
                name.toLowerCase();

            if (
                usedNames.has(key)
            ) {
                return {
                    error:
                        `Nama "${name}" tidak boleh berada di dua kelompok.`
                };
            }

            usedNames.add(
                key
            );
        }

        usedGroups.add(
            groupNumber
        );

        rules.push(
            {
                group_number:
                    groupNumber,
                member_names:
                    names
            }
        );
    }

    return {
        rules
    };

}


async function loadGroupRules() {

    const result =
        await supabaseClient
            .from("group_rules")
            .select("group_number, member_names")
            .order(
                "group_number",
                {
                    ascending: true
                }
            );

    if (result.error) {
        throw result.error;
    }

    GROUP_RULES =
        Object.fromEntries(
            result.data.map(
                rule => [
                    rule.group_number,
                    rule.member_names
                ]
            )
        );

    if (
        adminCard.style.display !==
        "none"
    ) {
        renderAdminRules();
    }

}


async function loadAdminState(user) {

    const result =
        await supabaseClient
            .from("admin_users")
            .select("user_id")
            .eq(
                "user_id",
                user.id
            )
            .maybeSingle();

    if (result.error) {
        throw result.error;
    }

    const isAdmin =
        Boolean(result.data);

    adminCard.style.display =
        isAdmin
            ? "block"
            : "none";

    if (isAdmin) {
        renderAdminRules();
    }

}


async function saveAdminRules() {

    const collected =
        collectAdminRules();

    if (
        collected.error
    ) {
        setAdminStatus(
            collected.error,
            true
        );

        return;
    }

    adminSaveRulesButton.disabled =
        true;

    adminAddGroupButton.disabled =
        true;

    setAdminStatus(
        "Menyimpan aturan kelompok..."
    );

    const now =
        new Date().toISOString();

    const nextNumbers =
        new Set(
            collected.rules.map(
                rule =>
                    rule.group_number
            )
        );

    try {
        for (
            const oldNumber of Object.keys(
                GROUP_RULES
            ).map(
                Number
            )
        ) {
            if (
                !nextNumbers.has(
                    oldNumber
                )
            ) {
                const deleted =
                    await supabaseClient
                        .from("group_rules")
                        .delete()
                        .eq(
                            "group_number",
                            oldNumber
                        );

                if (
                    deleted.error
                ) {
                    throw deleted.error;
                }
            }
        }

        const result =
            await supabaseClient
                .from("group_rules")
                .upsert(
                    collected.rules.map(
                        rule => ({
                            ...rule,
                            updated_by:
                                currentUser.id,
                            updated_at:
                                now
                        })
                    ),
                    {
                        onConflict:
                            "group_number"
                    }
                );

        if (
            result.error
        ) {
            throw result.error;
        }

        GROUP_RULES =
            Object.fromEntries(
                collected.rules.map(
                    rule => [
                        rule.group_number,
                        rule.member_names
                    ]
                )
            );

        renderAdminRules();

        setAdminStatus(
            `Berhasil menyimpan ${collected.rules.length} kelompok tetap. Sisa anggota tetap acak.`
        );

    } catch (error) {
        console.error(
            "Aturan kelompok gagal disimpan:",
            error
        );

        setAdminStatus(
            "Gagal menyimpan aturan. Pastikan schema dan akses admin sudah benar.",
            true
        );

    } finally {
        adminSaveRulesButton.disabled =
            false;

        updateAdminAddButton();
    }

}


function subscribeToUsers() {

    if (
        usersChannel
        || !supabaseClient
    ) {
        return;
    }

    try {
        const channel =
            supabaseClient
                .channel(
                    `profiles-list-${currentUser.id}`
                )
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table: "profiles"
                    },
                    () => {
                        if (userRefreshTimer) {
                            clearTimeout(
                                userRefreshTimer
                            );
                        }

                        userRefreshTimer =
                            setTimeout(
                                loadUsers,
                                200
                            );
                    }
                );

        usersChannel =
            channel;

        channel.subscribe(
            status => {
                if (
                    status === "CHANNEL_ERROR"
                    || status === "TIMED_OUT"
                ) {
                    console.warn(
                        "Realtime daftar anggota tidak tersedia:",
                        status
                    );

                    setChatConnectionStatus(
                        "Terhubung, update anggota manual",
                        "connected"
                    );
                }
            }
        );

    } catch (error) {
        console.warn(
            "Realtime daftar anggota gagal:",
            error
        );

        usersChannel =
            null;
    }

}


async function saveCurrentUser(user, username = "") {

    const metadata =
        user.user_metadata
        || {};

    const existing =
        await supabaseClient
            .from("profiles")
            .select("display_name")
            .eq(
                "id",
                user.id
            )
            .maybeSingle();

    if (existing.error) {
        throw existing.error;
    }

    const displayName =
        username
        || metadata.display_name
        || existing.data?.display_name
        || `Pengguna-${user.id.slice(0, 6)}`;

    const result =
        await supabaseClient
            .from("profiles")
            .upsert(
                {
                    id: user.id,
                    display_name: displayName,
                    email: "",
                    avatar_url: ""
                }
            )
            .select("display_name")
            .single();

    if (result.error) {
        throw result.error;
    }

    return result.data;

}


async function initializeChatUser(user, username = "") {

    currentUser =
        user;

    try {
        const profile =
            await saveCurrentUser(
                user,
                username
            );

        renderSignedIn(
            user,
            profile.display_name
        );

        await loadGroupRules();
        await loadAdminState(
            user
        );

        await loadUsers();
        subscribeToUsers();

    } catch (error) {
        console.error(
            "Gagal menyiapkan profil:",
            error
        );

        setChatConnectionStatus(
            "Database belum siap",
            "error"
        );

        setAuthStatus(
            `Login berhasil, tetapi setup database gagal: ${getDatabaseErrorMessage(error)}`,
            true
        );
    }

}


function setAuthControlsDisabled(disabled) {

    authUsernameInput.disabled =
        disabled;

    authPasswordInput.disabled =
        disabled;

    loginButton.disabled =
        disabled;

    signupButton.disabled =
        disabled;

}


function getUsername() {

    return authUsernameInput.value
        .trim()
        .replace(/\s+/g, " ");

}


function getAccountEmail(username) {

    const authDomain =
        new URL(
            window.SUPABASE_CONFIG.url
        ).hostname;

    return `${username.toLowerCase()}@${authDomain}`;

}


function isValidUsername(username) {

    return /^[A-Za-z0-9][A-Za-z0-9_.-]{1,29}$/
        .test(username);

}


async function authenticateWithUsername(mode) {

    if (!supabaseClient) {
        return;
    }

    const username =
        getUsername();

    const password =
        authPasswordInput.value;

    if (
        !isValidUsername(username)
        || password.length < 6
    ) {
        setAuthStatus(
            "Username 2-30 karakter dan password minimal 6 karakter.",
            true
        );

        return;
    }

    setAuthControlsDisabled(
        true
    );

    setAuthStatus(
        mode === "signup"
            ? "Membuat akun..."
            : "Memeriksa akun..."
    );

    const sessionResult =
        await supabaseClient.auth.getSession();

    if (sessionResult.error) {
        setAuthStatus(
            "Sesi akun gagal dibaca.",
            true
        );

        setAuthControlsDisabled(
            false
        );

        return;
    }

    if (sessionResult.data.session) {
        await supabaseClient.auth.signOut();
    }

    pendingUsername =
        username;

    const accountEmail =
        getAccountEmail(username);

    const result =
        mode === "signup"
            ? await supabaseClient.auth.signUp(
                {
                    email: accountEmail,
                    password,
                    options: {
                        data: {
                            display_name:
                                username
                        }
                    }
                }
            )
            : await supabaseClient.auth.signInWithPassword(
                {
                    email: accountEmail,
                    password
                }
            );

    if (result.error) {
        console.error(
            "Autentikasi username gagal:",
            result.error
        );

        const errorCode =
            result.error.code
            || "";

        const isExistingAccount =
            [
                "user_already_exists",
                "email_exists",
                "user_exists"
            ].includes(
                errorCode
            )
            || /already|registered|exists/i.test(
                result.error.message
            );

        const errorMessage =
            errorCode === "over_email_send_rate_limit"
                ? "Pastikan Confirm Email Off. Jika sudah Off, "
                    + "tunggu beberapa menit karena batas percobaan Supabase tercapai."
                : mode === "signup"
                    && isExistingAccount
                    ? "Username sudah terdaftar. Gunakan tombol Masuk."
                    : mode === "signup"
                        ? "Pendaftaran gagal. Periksa pengaturan Email Supabase."
                        : "Username atau password salah.";

        setAuthStatus(
            errorMessage,
            true
        );

        setAuthControlsDisabled(
            false
        );

        pendingUsername =
            "";

        return;
    }

    if (
        mode === "signup"
        && !result.data.session
    ) {
        setAuthStatus(
            "Nonaktifkan Confirm Email di provider Email Supabase, lalu daftar lagi.",
            true
        );

        setAuthControlsDisabled(
            false
        );

        pendingUsername =
            "";
    }

}


async function signInWithUsername() {

    await authenticateWithUsername(
        "signin"
    );

}


async function signUpWithUsername() {

    await authenticateWithUsername(
        "signup"
    );

}


async function signOutUser() {

    if (!supabaseClient) {
        return;
    }

    const result =
        await supabaseClient.auth.signOut();

    if (result.error) {
        console.error(
            "Logout gagal:",
            result.error
        );

        setAuthStatus(
            "Logout gagal. Coba lagi.",
            true
        );
    }

}


async function initializeSupabaseChat() {

    renderSignedOut();

    if (
        !isSupabaseConfigured()
        || typeof supabase === "undefined"
    ) {

        setAuthControlsDisabled(
            true
        );

        setAuthStatus(
            "Isi konfigurasi Supabase terlebih dahulu.",
            true
        );

        setChatConnectionStatus(
            "Konfigurasi belum siap",
            "error"
        );

        return;

    }

    try {
        supabaseClient =
            supabase.createClient(
                window.SUPABASE_CONFIG.url,
                window.SUPABASE_CONFIG.anonKey
            );

        setAuthStatus(
            "Belum login"
        );


        supabaseClient.auth.onAuthStateChange(
            (event, session) => {

                setTimeout(
                    async () => {

                        clearChatChannels();

                        if (
                            session
                            && !session.user.is_anonymous
                        ) {
                            const username =
                                pendingUsername;

                            pendingUsername =
                                "";

                            await initializeChatUser(
                                session.user,
                                username
                            );
                        } else {
                            currentUser =
                                null;

                            renderSignedOut();

                            setAuthStatus(
                                "Belum login"
                            );

                            if (session) {
                                await supabaseClient.auth.signOut();
                            }
                        }

                    },
                    0
                );

            }
        );

    } catch (error) {
        console.error(
            "Inisialisasi Supabase gagal:",
            error
        );

        setAuthControlsDisabled(
            true
        );

        setAuthStatus(
            "Supabase gagal diinisialisasi.",
            true
        );

        setChatConnectionStatus(
            "Inisialisasi gagal",
            "error"
        );
    }

}


chatForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        const text =
            chatInput.value.trim();

        if (
            !text
            || !currentUser
            || !selectedChatUser
            || !selectedConversationId
            || !supabaseClient
        ) {
            return;
        }

        if (text.length > 2000) {
            setChatConnectionStatus(
                "Pesan maksimal 2.000 karakter",
                "error"
            );

            return;
        }

        chatInput.disabled =
            true;

        chatSendButton.disabled =
            true;

        try {
            const result =
                await supabaseClient
                    .from("messages")
                    .insert(
                        {
                            conversation_id:
                                selectedConversationId,
                            sender_id:
                                currentUser.id,
                            receiver_id:
                                selectedChatUser.id,
                            body: text
                        }
                    );

            if (result.error) {
                throw result.error;
            }

            chatInput.value =
                "";

            setChatConnectionStatus(
                "Terhubung",
                "connected"
            );

        } catch (error) {
            console.error(
                "Pesan gagal dikirim:",
                error
            );

            setChatConnectionStatus(
                "Pesan gagal dikirim",
                "error"
            );

        } finally {
            chatInput.disabled =
                false;

            chatSendButton.disabled =
                false;

            chatInput.focus();
        }

    }
);


authLoginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();
        signInWithUsername();

    }
);


signupButton.addEventListener(
    "click",
    signUpWithUsername
);


adminAddGroupButton.addEventListener(
    "click",
    addAdminRuleCard
);


adminSaveRulesButton.addEventListener(
    "click",
    saveAdminRules
);

logoutButton.addEventListener(
    "click",
    signOutUser
);


initializeSupabaseChat();


