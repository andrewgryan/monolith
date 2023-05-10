use actix_cors::Cors;
use actix_web::{get, http, web, App, HttpResponse, HttpServer, Responder};

#[get("/{z}/{x}/{y}.jpg")]
async fn cat() -> impl Responder {
    let image_content: Vec<u8> = web::block(|| std::fs::read("cat.jpg"))
        .await
        .unwrap()
        .unwrap();
    HttpResponse::Ok()
        .content_type("image/jpeg")
        .body(image_content)
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
        App::new().wrap(cors).service(cat)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
