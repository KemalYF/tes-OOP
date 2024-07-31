// OOP
const hex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const rgb = (r, g, b) => {
  return `rgb(${r}, ${g}, ${b})`;
};

// Menggunakan Factory Function (Object Literal)
function convertColor (r, g, b) {
    const color = {};

    color.r = r;
    color.g = g;
    color.b = b;

    color.rgb = function () {
        // const { r, g, b } = this;
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    color.hex = function () {
        const { r, g, b } = this;
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    return color;
}

// Menggunakan Constructor Function (prototype)
// function Color(r, g, b) {
//     this.r = r;
//     this.g = g;
//     this.b = b;
// }

// Color.prototype.rgb = function () {
//     const { r, g, b } = this;
//     return `rgb(${r}, ${g}, ${b})`;
// }

// Color.prototype.hex = function () {
//     const { r, g, b } = this;
//     return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
// }

// Color.prototype.rgba = function (a = 1.0) {
//     const { r, g, b } = this;
//     return `rgba(${r}, ${g}, ${b}, ${a})`;
// }

// Menggunakan Class
class Color {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calcHSL();
    }

    innerRGB() {
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`;
    }

    colorName() {
        console.log(`The color name is ` + this.name);
    }

    rgb() {
        return `rgb(${this.innerRGB()})`;
    }

    hex() {
        const { r, g, b } = this;
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    rgba(a = 1.0) {
        return `rgba(${this.innerRGB()}, ${a})`;
    }
    
    // HSL
    hsl() {
        const { h, s, l } = this;
        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    fullySaturated() {
        const { h, l } = this;
        return `hsl(${h}, 100%, ${l}%)`;
    }

    opposite() {
        const {h, s, l} = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue}, ${s}%, ${l}%)`;
    }

    calcHSL() {
		let { r, g, b } = this;
		// Make r, g, and b fractions of 1
		r /= 255;
		g /= 255;
		b /= 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r)
			// Red is max
			h = ((g - b) / delta) % 6;
		else if (cmax == g)
			// Green is max
			h = (b - r) / delta + 2;
		// Blue is max
		else h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;
		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		this.h = h;
		this.s = s;
		this.l = l;
	}
}


class Peliharaan {
    constructor(nama, umur) {
        console.log("Peliharaan baru");
        this.nama = nama;
        this.umur = umur;
    }

    makan() {
        console.log(`${this.nama} sedang makan`);
    }
}

class Kucing extends Peliharaan {
    constructor(nama, umur, lives) {
        console.log("Kucing baru");
        super(nama, umur);
        this.lives = lives;
    }

    meong() {
        console.log(`Meong, namaku adalah ${this.nama}`);
    }

    umurKucing() {
        console.log(`Umurku adalah ${this.umur} tahun`);
    }

    kehilanganNyawa() {
        this.lives--;
        console.log(`Nyawa ${this.nama} berkurang menjadi ${this.lives}`);
    }
}

class Anjing extends Peliharaan {
    constructor(nama, umur, lives) {
        console.log("Anjing baru");
        super(nama, umur);
        this.lives = lives;
    }

    gonggong() {
        console.log(`Gonggong, namaku adalah ${this.nama}`);
    }

    umurAnjing() {
        console.log(`Umurku adalah ${this.umur} tahun`);
    }
}

// Ubah warna background body
function warnaBackground(r, g, b) {
    const warna = document.querySelector(".warna");
    for (let i = 0; i < 10; i++) {
        r = Math.floor(Math.random() * 255);
        g = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);
        
        const div = document.createElement("div");
        div.style.backgroundColor = rgb(r, g, b);
        div.style.width = "50px";
        div.style.height = "50px";
        div.style.margin = "5px";
        div.style.display = "inline-block";
        div.style.cursor = "pointer";
        div.style.borderRadius = "5px";
        div.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.4)";
        
        warna.appendChild(div);
    }

    return warna;
}

warnaBackground().addEventListener("click", function (e) {
    if (e.target.tagName === "DIV") {
        const judul = document.querySelector(".judul");
        document.body.style.backgroundColor = e.target.style.backgroundColor;
        judul.style.color = "white";
    }
});