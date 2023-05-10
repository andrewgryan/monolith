use actix_cors::Cors;
use actix_web::{get, http, web, App, HttpResponse, HttpServer, Responder};
use std::io::Cursor;

struct AppState {
    dynamic_image: image::DynamicImage,
}

#[get("/{z}/{x}/{y}.jpg")]
async fn cat(data: web::Data<AppState>) -> impl Responder {
    let dynamic_image = data
        .dynamic_image
        .resize(32, 32, image::imageops::FilterType::Triangle);

    let mut body: Vec<u8> = Vec::new();
    dynamic_image
        .write_to(
            &mut Cursor::new(&mut body),
            image::ImageOutputFormat::from(image::ImageFormat::Jpeg),
        )
        .expect("");

    // let _image_content: Vec<u8> = web::block(|| std::fs::read("cat.jpg"))
    //     .await
    //     .unwrap()
    //     .unwrap();
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
                    32,
                    32,
                    image::imageops::FilterType::Triangle,
                ),
            }))
            .service(cat)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
