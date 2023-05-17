use actix_web::{get, post, web, App, HttpServer, Responder, Result};
use geojson::GeoJson;

#[get("/polygons")]
async fn save_get() -> Result<impl Responder> {
    let body: String = web::block(|| std::fs::read_to_string("post.json"))
        .await
        .unwrap()
        .unwrap();
    let gj = body.parse::<GeoJson>().unwrap();
    Ok(web::Json(gj))
}

#[post("/polygons")]
async fn save_post(polygons: web::Json<GeoJson>) -> Result<impl Responder> {
    let content = polygons.to_string();
    web::block(|| std::fs::write("post.json", content))
        .await
        .unwrap()
        .unwrap();
    Ok(web::Json(polygons))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(save_get).service(save_post))
        .bind(("127.0.0.1", 7070))?
        .run()
        .await
}
