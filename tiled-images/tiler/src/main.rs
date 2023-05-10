use image;
use image::imageops::FilterType::Triangle;

fn main() {
    println!("Resize image");
    let img = image::open("../server/cat.jpg").unwrap();
    let n: u32 = 256;
    for z in 0..6 {
        println!("Save: {}.jpg", z);
        img.resize_to_fill(n * u32::pow(2, z), n * u32::pow(2, z), Triangle)
            .save(format!("{}.jpg", z))
            .unwrap();
    }
    println!("Finished");
}
