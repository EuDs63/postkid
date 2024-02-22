// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::OnceLock;
use reqwest;

static CLIENT: OnceLock<reqwest::Client> = OnceLock::new();

fn get_client() -> &'static reqwest::Client {
    CLIENT.get_or_init(|| reqwest::Client::new())
}

#[tauri::command]
fn greet(name:&str) -> String {
  format!("Hello, {}!", name)
}

// 发送请求
#[tauri::command]
async fn send_request(method: &str, url: &str) -> Result<String, String> {
    let client = get_client();
    // let client = reqwest::Client::new();
    let res = match method {
        "GET" => client.get(url).send().await,
        "POST" => client.post(url).send().await,
        "PUT" => client.put(url).send().await,
        "DELETE" => client.delete(url).send().await,
        _ => return Err("Method not supported".to_string()),
    };

    match res {
        Ok(response) => {
            if response.status().is_success() {
                match response.text().await {
                    Ok(body) => Ok(body),
                    Err(err) => Err(format!("Error reading response body: {}", err)),
                }
            } else {
                Err(format!("Request failed with status code: {}", response.status()))
            }
        }
        Err(err) => Err(format!("Error sending request: {}", err)),
    }
}

fn main() {

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet,send_request])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
