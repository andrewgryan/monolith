use image;
use image::imageops::FilterType::Triangle;

fn main() {
    println!("Resize image");
    let img = image::open("../fantasy-square.jpg").unwrap();
    let n: u32 = 256;
    for z in 0..6 {
        let tile = img.resize_to_fill(n * u32::pow(2, z), n * u32::pow(2, z), Triangle);
        for x in 0..u32::pow(2, z) {
            for y in 0..u32::pow(2, z) {
                println!("Save: {}/{}/{}", z, x, y);
                tile.crop_imm(x * n, y * n, n, n)
                    .save(format!("{}-{}-{}.jpg", z, x, y))
                    .unwrap();
            }
        }
    }
    println!("Finished");
}
