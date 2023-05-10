use actix_cors::Cors;
use actix_web::{get, http, web, App, HttpRequest, HttpResponse, HttpServer, Responder};

#[get("/{z}/{x}/{y}.png")]
async fn cat(req: HttpRequest) -> impl Responder {
    // Parse URL
    let z: u32 = req.match_info().get("z").unwrap().parse().unwrap();
    let x: u32 = req.match_info().get("x").unwrap().parse().unwrap();
    let y: u32 = req.match_info().get("y").unwrap().parse().unwrap();

    // 404 greater than z=1
    if z > 5 {
        return HttpResponse::NotFound()
            .content_type("text/plain")
            .body("These are not the droids you were looking for...");
    }

    let file_name = format!("tiles/{}-{}-{}.png", z, x, y);
    let body: Vec<u8> = web::block(|| std::fs::read(file_name))
        .await
        .unwrap()
        .unwrap();

    HttpResponse::Ok().content_type("image/png").body(body)
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
