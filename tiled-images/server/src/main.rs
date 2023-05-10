use actix_cors::Cors;
use actix_web::{get, http, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use std::io::Cursor;

struct AppState {
    dynamic_image: image::DynamicImage,
}

#[get("/{z}/{x}/{y}.jpg")]
async fn cat(req: HttpRequest, data: web::Data<AppState>) -> impl Responder {
    // Parse URL
    let z: u32 = req.match_info().get("z").unwrap().parse().unwrap();
    let x: u32 = req.match_info().get("x").unwrap().parse().unwrap();
    let y: u32 = req.match_info().get("y").unwrap().parse().unwrap();

    // Estimate crop location
    let xp: u32;
    let yp: u32;
    if z > 1 {
        xp = x / (u32::pow(2, z - 1));
        yp = y / (u32::pow(2, z - 1));
    } else {
        xp = x;
        yp = y;
    }
    let i: u32 = xp * 32;
    let j: u32 = yp * 32;

    // Crop image
    let dynamic_image = data.dynamic_image.crop_imm(i, j, 32, 32);

    let mut body: Vec<u8> = Vec::new();
    dynamic_image
        .write_to(
            &mut Cursor::new(&mut body),
            image::ImageOutputFormat::from(image::ImageFormat::Jpeg),
        )
        .expect("");

    HttpResponse::Ok().content_type("image/jpeg").body(body)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);
        App::new()
            .wrap(cors)
            .app_data(web::Data::new(AppState {
                dynamic_image: image::open("cat.jpg").expect("").resize(
                    64,
                    64,
                    image::imageops::FilterType::Triangle,
                ),
            }))
            .service(cat)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
