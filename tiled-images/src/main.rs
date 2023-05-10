use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};

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
    HttpServer::new(|| App::new().service(cat))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
