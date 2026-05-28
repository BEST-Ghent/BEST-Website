// Requires /static/scripts/random.js !!!
let canvas;
let ctx;
let hash;
let rng;

let size;
let total_bombs;
let game_started;
let game_over;

let tile_size = 30;

class Coord {
    constructor(x, y) {
        this.x = Math.round(x)+0;
        this.y = Math.round(y)+0;
    }
}

async function loadImage(url) {
  return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}

let img_uncovered_tile = await loadImage("uncovered_tile.png");
let img_1_tile = await loadImage("1_tile.png");
let img_2_tile = await loadImage("2_tile.png");
let img_3_tile = await loadImage("3_tile.png");
let img_4_tile = await loadImage("4_tile.png");
let img_5_tile = await loadImage("5_tile.png");
let img_6_tile = await loadImage("6_tile.png");
let img_7_tile = await loadImage("7_tile.png");
let img_8_tile = await loadImage("8_tile.png");
let img_covered_tile = await loadImage("covered_tile.png");
let img_flag_tile = await loadImage("flag_tile.png");
let img_bomb_tile = await loadImage("bomb_tile.png");

let bombs = [];
let field = [];

// Uncovered = 0
// Covered = 9
// Flag = 10
// Bomb = 11

function tile_to_img(tile) {
    switch (tile) {
        case 0: return img_uncovered_tile;
        case 1: return img_1_tile;
        case 2: return img_2_tile;
        case 3: return img_3_tile;
        case 4: return img_4_tile;
        case 5: return img_5_tile;
        case 6: return img_6_tile;
        case 7: return img_7_tile;
        case 8: return img_8_tile;
        case 9: return img_covered_tile;
        case 10: return img_flag_tile;
        case 11: return img_bomb_tile;
    }
}

function getNeighbourCoords(coord) {
    let res = [
        new Coord(coord.x-1, coord.y-1),
        new Coord(coord.x-1, coord.y),
        new Coord(coord.x-1, coord.y+1),
        new Coord(coord.x, coord.y-1),
        new Coord(coord.x, coord.y+1),
        new Coord(coord.x+1, coord.y-1),
        new Coord(coord.x+1, coord.y),
        new Coord(coord.x+1, coord.y+1),
    ];
    res = res.filter(coord => ((coord.x>=0 && coord.y>=0) && (coord.x<size.width && coord.y<size.height)));
    return res;
}

export function start_game(canvasDOM, start_hash, board_size, bomb_count) {
    canvas = canvasDOM;
    hash = start_hash;
    ctx = canvas.getContext("2d");
    rng = new RNG(start_hash);

    size = board_size;
    total_bombs = bomb_count;
    game_started = false; // To be activated when user clicks his first tile
    game_over = false;

    canvas.width = tile_size * size.width;
    canvas.height = tile_size * size.height;

    // Generate empty field
    field = Array.from({length:size.width}, () => Array.from({length:size.height}, () => 9));
    populate_bombs();

    canvas.onclick = (e) => {
        if (game_over) return true;
        const rect = canvas.getBoundingClientRect();
        const coord = new Coord(Math.floor((e.clientX - rect.left) * size.width / canvas.width), Math.floor((e.clientY - rect.top) * size.height / canvas.height));
        on_left_click(coord);
    }

    canvas.oncontextmenu = (e) => {
        if (game_over) return true;
        const rect = canvas.getBoundingClientRect();
        const coord = new Coord(Math.floor((e.clientX - rect.left) * size.width / canvas.width), Math.floor((e.clientY - rect.top) * size.height / canvas.height));
        on_right_click(coord);
        return false;
    }

    draw();
}

function uncover_field(coord) {
    if (field[coord.x][coord.y] == 9 && bombs[coord.x][coord.y] == 0) {
        field[coord.x][coord.y] = bombs[coord.x][coord.y];
        getNeighbourCoords(coord).forEach(neighbour=>{
            uncover_field(neighbour);
        });
    }
    else {
        field[coord.x][coord.y] = bombs[coord.x][coord.y];
    }
}

function on_left_click(coord) {
    if (!game_started) {
        while (bombs[coord.x][coord.y] == 11) {
            populate_bombs();
        }
        game_started = true;
    }

    if (field[coord.x][coord.y] == 10 || field[coord.x][coord.y] == 0) { // If it's a flag or empty, ignore and move on
        return;
    }
    
    if (bombs[coord.x][coord.y] == 11) { // If it's a bomb... game over
        game_over = true;
    }

    else if (field[coord.x][coord.y] == 9) { // If it's a covered tile, uncover it
        uncover_field(coord);
    }

    else { // It's a number 1-8
        const neighbours = getNeighbourCoords(coord);
        if (neighbours.map(neighbour => field[neighbour.x][neighbour.y]).filter(tile => tile==10).length == field[coord.x][coord.y]) { // The flag count matches the bombcount of that tile
            neighbours.filter(neighbour => field[neighbour.x][neighbour.y]!=10).forEach(c => {
                if (bombs[c.x][c.y] == 11) {
                    game_over = true;
                }
                uncover_field(c);
            });
        }
        // uncover tiles based on bomb/flag equality
    }
    
    draw();
}

function on_right_click(coord) {
    if (field[coord.x][coord.y] == 9) {
        field[coord.x][coord.y] = 10;
    }
    else if (field[coord.x][coord.y] == 10) {
        field[coord.x][coord.y] = 9;
    }

    draw();
}

function populate_bombs() {
    bombs = Array.from({length:size.width}, () => Array.from({length:size.height}, () => 0));
    for (let i = 0; i < total_bombs; i++) {
        let valid_location = false;
        let coord;
        while(!valid_location) {
            coord = new Coord(rng.int(0, size.width-1), rng.int(0, size.height-1));
            if (bombs[coord.x][coord.y] != 11) {
                valid_location = true;
            }
        }

        bombs[coord.x][coord.y] = 11;
        getNeighbourCoords(coord).forEach((coord)=>{
            if (bombs[coord.x][coord.y] < 9) {
                bombs[coord.x][coord.y]++;
            }
        });
    }
}

function draw() {
    ctx.fillStyle = "#FF000055"; // Error overlay
    if (game_over) {
        for (let x = 0; x < size.width; x++) {
            for (let y = 0; y < size.height; y++) {
                const b = bombs[x][y];
                let f = field[x][y];
                if (b == 11 && f == 9) {
                    f = b;
                }
                if (f == 10 && b != 11) {
                    ctx.drawImage(tile_to_img(f), tile_size * x, tile_size * y, tile_size, tile_size);
                    ctx.fillRect(tile_size * x, tile_size * y, tile_size, tile_size);
                }
                else {
                    ctx.drawImage(tile_to_img(f), tile_size * x, tile_size * y, tile_size, tile_size);
                }
            }
        }
    }
    else {
        field.forEach((col, i) => col.forEach((tile, j) => {
            ctx.drawImage(tile_to_img(tile), tile_size * i, tile_size * j, tile_size, tile_size);
        }));
    }
}
