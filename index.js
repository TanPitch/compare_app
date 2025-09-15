const DOMS = {
    img_container: document.querySelector("#img_container"),
    img: document.querySelector("#img_container img"),
    numbers: document.querySelectorAll("input[type=number]"),
    selects: document.querySelectorAll("select"),
    result_1: document.querySelector("#result_1"),
    result_2: document.querySelector("#result_2"),
    detail_1: document.querySelector("#detail_1"),
    detail_2: document.querySelector("#detail_2"),
    dark: document.querySelector("#dark_mode"),
};

var light = true;

// reset
const reset = () => {
    DOMS.result_1.textContent = "ระบุปริมาณ, หน่วย และราคา";
    DOMS.result_2.textContent = "จิ้มแก้มเพื่อคำนวน";
    DOMS.img.src = img("001");
    DOMS.img.style.transform = "";

    DOMS.detail_1.textContent = ``;
    DOMS.detail_2.textContent = ``;

    document.querySelectorAll(".green").forEach((el) => el.classList.remove("green"));
};
[...DOMS.numbers].forEach((el) => {
    el.addEventListener("focus", () => {
        reset();
    });
});
[...DOMS.selects].forEach((el) => {
    el.addEventListener("focus", () => {
        {
            reset();
        }
    });
});

// do calculated
DOMS.img_container.addEventListener("click", () => {
    if (DOMS.numbers[1].value === "") DOMS.numbers[1].value = 1;
    if (DOMS.numbers[4].value === "") DOMS.numbers[4].value = 1;

    if (![...DOMS.numbers].every((el) => el.value !== "")) {
        DOMS.result_1.textContent = "พังแล้ว";
        DOMS.result_2.textContent = "ข้อมูลไม่ครบ คำนวนไม่ได้";
        DOMS.img.src = img("004");
        return;
    }

    const price_A =
        (DOMS.selects[0].value * DOMS.numbers[0].value * DOMS.numbers[2].value) / DOMS.numbers[1].value;
    const price_B =
        (DOMS.selects[1].value * DOMS.numbers[3].value * DOMS.numbers[5].value) / DOMS.numbers[4].value;

    DOMS.detail_1.textContent = `${price_A} ต่อกรัม`;
    DOMS.detail_2.textContent = `${price_B} ต่อกรัม`;

    const result_1 = () => {
        const blocks = document.querySelectorAll(".main_block");
        if (price_A == price_B) {
            DOMS.img.src = img("005");
            blocks.forEach((el) => el.classList.add("green"));
            return "ราคาเท่ากัน";
        } else if (price_A > price_B) {
            DOMS.img.src = img("003");
            blocks[1].classList.add("green");
            return "ขวาถูกกว่า !";
        } else if (price_A < price_B) {
            DOMS.img.src = img("003");
            DOMS.img.style.transform = "scaleX(-1)";
            blocks[0].classList.add("green");
            return "ซ้ายถูกกว่า !";
        }
    };
    DOMS.result_1.textContent = result_1();

    const result_2 = () => {
        if (price_A == price_B) return "ซื้ออันไหนก็ได้";
        return `ราคาถูกกว่า ${100 - (100 * Math.min(price_A, price_B)) / Math.max(price_A, price_B)} %`;
    };
    DOMS.result_2.textContent = result_2();
});

// dark mode
DOMS.dark.addEventListener("click", () => {
    light = !light;
    document.body.classList.toggle("dark");

    // update all imgs
    document.querySelectorAll("img").forEach((im) => {
        const imgNo = im.src.split("/")[4].split(".")[0].split("-")[0];
        im.src = img(imgNo);
    });

    // store theme
    localStorage.setItem("theme", light ? "light" : "dark");
});
window.addEventListener("load", () => {
    const getTheme = localStorage.getItem("theme");
    if (!getTheme) {
        localStorage.setItem("theme", light ? "light" : "dark");
        return;
    }

    light = getTheme == "light";
    if (!light) {
        document.body.classList.toggle("dark");
        document.querySelectorAll("img").forEach((im) => {
            const imgNo = im.src.split("/")[4].split(".")[0].split("-")[0];
            im.src = img(imgNo);
        });
    }
});

function img(num) {
    return `./img/${num}${light ? "" : "-dark"}.jpg`;
}
