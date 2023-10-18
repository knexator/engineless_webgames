// Example usage:

let gl: WebGLRenderingContext; // created somewhere else

let wall_sprite: WebGLTexture = textureFromAscii(gl,
    ["#A46422", "#493C2B"],
    `
      00010
      11111
      01000
      11111
      00010
    `
);

function rgbFromHex(hex_string: string): [number, number, number] {
    // "#030102" -> 0x030102 -> [3, 1, 2]
    let hex_number = Number(hex_string.replace("#", "0x"));
    return [hex_number >> 16, (hex_number >> 8) & 0xff, hex_number & 0xff];
}

function textureFromAscii(gl: WebGLRenderingContext, colors: string[], ascii: string): WebGLTexture {
    let ascii_lines = ascii.trim().split("\n").map(x => x.trim());
    let spr_h = ascii_lines.length;
    let spr_w = ascii_lines[0].length;
    if (ascii_lines.some(line => line.length !== spr_w)) {
        throw new Error(`The given ascii is not a proper rectangle: ${ascii}`);
    }

    let pixel_data = new Uint8Array(spr_h * spr_w * 4);

    for (let j=0; j<spr_h; j++) {
        for (let i=0; i<spr_w; i++) {
            let char = ascii_lines[j][i];
            if (char === ".") continue; // pixel_data is 0 by default
            let color_hex_string = colors[Number(char)].toLowerCase();
            let rgb_values = rgbFromHex(color_hex_string); 

            let base_index = (i + j * spr_w) * 4;
            pixel_data[base_index + 0] = rgb_values[0];
            pixel_data[base_index + 1] = rgb_values[1];
            pixel_data[base_index + 2] = rgb_values[2];
            pixel_data[base_index + 3] = 255;
        }
    }

    // To use the raw pixel values:
    // return {width: spr_w, height: spr_h, data: pixel_data};

    let texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, spr_w, spr_h, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel_data);
    // Required for pixel art textures:
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // Not really needed but a good practice:
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
}
