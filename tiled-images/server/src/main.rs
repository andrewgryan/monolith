use actix_cors::Cors;
use actix_web::{get, http, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use image::GenericImageView;
use std::io::Cursor;

struct AppState {
    dynamic_image: image::DynamicImage,
}

#[get("/{z}/{x}/{y}.jpg")]
async fn cat(req: HttpRequest) -> impl Responder {
    // Parse URL
    let z: u32 = req.match_info().get("z").unwrap().parse().unwrap();
    let x: u32 = req.match_info().get("x").unwrap().parse().unwrap();
    let y: u32 = req.match_info().get("y").unwrap().parse().unwrap();

    // 404 greater than z=1
    if z > 6 {
        return HttpResponse::NotFound()
            .content_type("text/plain")
            .body("These are not the droids you were looking for...");
    }

    // Estimate crop location
    let n: u32 = 64;

    // Crop image
    let i: u32 = x * n;
    let j: u32 = y * n;

    let dynamic_image = image::open(format!("{}.jpg", z)).expect("");

    let mut body: Vec<u8> = Vec::new();
    dynamic_image
        .crop_imm(i, j, n, n)
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
