use image;
use image::imageops::FilterType::Triangle;

fn main() {
    println!("Resize image");
    let img = image::open("../server/cat.jpg").unwrap();
    for z in 0..7 {
        println!("Save: {}.jpg", z);
        img.resize(64 * u32::pow(2, z), 64 * u32::pow(2, z), Triangle)
            .save(format!("{}.jpg", z))
            .unwrap();
    }
    println!("Finished");
}
