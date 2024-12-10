document.addEventListener("DOMContentLoaded", () => {
    console.log("Pexeso START");

    const karty = [
        { src: 'https://is1-ssl.mzstatic.com/image/thumb/Features124/v4/ae/25/77/ae25777e-eddf-937a-21c0-48a0d9ac6137/mza_220473596765865662.png/486x486bb.png' },
        { src: 'https://us-tuna-sounds-images.voicemod.net/df990110-ef6f-490a-b3c0-6ba684cdaddb-1705971890150.jpg' },
        { src: 'https://i.ytimg.com/vi/u_mwjIDB6fg/oardefault.jpg' },
        { src: 'https://preview.redd.it/doing-a-daily-edgar-pin-until-he-gets-reworked-day-13-what-v0-k1fdxq1x3foa1.png?auto=webp&s=8d2ec0addec56d9744907981354fead93677155e' },
        { src: 'https://tr.rbxcdn.com/180DAY-3522624b9386b15ce13120f54e1fab7d/420/420/Hat/Webp/noFilter' },
        { src: 'https://i.redd.it/a0qg5mazuted1.gif' },
        { src: 'https://i.pinimg.com/originals/fb/90/4b/fb904bddee883d86ef7f504df8c54bc6.jpg' },
        { src: 'https://tr.rbxcdn.com/732d895056cc76da9bb3b56bee353053/420/420/Hat/Png' }
    ];

    let el = document.getElementById("pexeso");
    let resetButton = document.getElementById("reset");
    let scoreEl = document.getElementById("score");

    let shuffledPole = [];
    let flippedCards = [];
    let matchedCards = [];
    let score = 0;

    // Funkce pro zamíchání pole
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Inicializace hry
    function initGame() {
        let pole = Array.from({ length: karty.length * 2 }, (_, i) => Math.floor(i / 2));
        shuffledPole = shuffle(pole);
        flippedCards = [];
        matchedCards = [];
        score = 0;
        scoreEl.textContent = "Skóre: 0";
        render();
    }

    // Vykreslení hrací plochy
    function render() {
        el.innerHTML = "";
        shuffledPole.forEach((prvek, index) => {
            const karta = document.createElement("img");
            karta.src = matchedCards.includes(index)
                ? "https://i.pinimg.com/originals/96/e5/c9/96e5c9c7dd567b35077dd3f3ef98e21c.png"
                : flippedCards.includes(index)
                ? karty[prvek].src
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG8PL6ODKXVIvNoJCxm060CELObXeljGudhw&s";

            karta.dataset.index = index;
            karta.addEventListener("click", () => handleCardClick(index));
            el.appendChild(karta);
        });
    }

    // Zpracování kliknutí na kartu
    function handleCardClick(index) {
        if (
            flippedCards.length === 2 ||
            flippedCards.includes(index) ||
            matchedCards.includes(index)
        ) {
            return;
        }

        flippedCards.push(index);
        render();

        if (flippedCards.length === 2) {
            const [first, second] = flippedCards;
            if (shuffledPole[first] === shuffledPole[second]) {
                matchedCards.push(first, second);
                score++;
                scoreEl.textContent = `Skóre: ${score}`;
            }

            setTimeout(() => {
                flippedCards = [];
                render();
            }, 1000);
        }
    }

    // Reset hry
    resetButton.addEventListener("click", initGame);

    // Inicializace při načtení stránky
    initGame();
    console.log("Pexeso END");
});
