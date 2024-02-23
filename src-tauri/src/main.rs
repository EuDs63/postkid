// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{collections::HashMap, sync::OnceLock};
use reqwest;
use serde_json::Value;

static CLIENT: OnceLock<reqwest::Client> = OnceLock::new();

fn get_client() -> &'static reqwest::Client {
    CLIENT.get_or_init(|| reqwest::Client::new())
}

#[tauri::command]
fn greet(name:&str) -> String {
  format!("Hello, {}!", name)
}

#[derive(serde::Deserialize)]
struct RequestBean {
    method: String,
    url: String,
    header_map: HashMap<String, String>,
    body_type: String, // body 类型，支持 json 和 form
    body: Value, // 通用的 body 字段，使用 serde_json::Value 类型
}

// 发送请求
#[tauri::command]
async fn send_request(requestBean:RequestBean) -> Result<String, String> {
    let client = get_client();
    let mut headers = reqwest::header::HeaderMap::new();

    // 设置请求头
    for (key, value) in requestBean.header_map.iter() {
        headers.insert(
            reqwest::header::HeaderName::from_bytes(key.as_bytes()).unwrap(),
            reqwest::header::HeaderValue::from_str(value).unwrap(),
        );
    }

    // 发送请求

    let res = match requestBean.method.as_str() {
        "GET" => client.get(&requestBean.url).headers(headers).send().await,
        "POST" => {
            let request_builder = client.post(&requestBean.url).headers(headers);
            // 根据 body 的类型进行不同的处理
            match requestBean.body_type.as_str() {
                "none" => request_builder.send().await,
                "form" => request_builder.form(&requestBean.body).send().await,
                "raw" => {
                            match requestBean.body {
                              Value::String(body_str) => request_builder.body(body_str).send().await,
                              Value::Object(body_obj) => {
                                  let mut request_builder = request_builder;
                                  for (key, value) in body_obj.iter() {
                                      request_builder = request_builder.query(&[(key, value.as_str().unwrap())]);
                                  }
                                  request_builder.send().await
                              }
                              // 处理其他类型的 body 数据...
                              _ => return Err("Unsupported body type".to_string()),
                      }
                }

                // 处理其他类型的 body_type 数据...
                _ => return Err("Unsupported body type".to_string()),
            }
        },
        "PUT" => client.put(&requestBean.url).send().await,
        "DELETE" => client.delete(&requestBean.url).send().await,
        _ => return Err("Method not supported".to_string()),
    };

    match res {
        Ok(response) => {
            if response.status().is_success() {
                match response.text().await {
                    Ok(body) => return Ok(body),
                    Err(err) =>  return Err(format!("Error reading response body: {}", err)),
                }
            } else {
                return Err(format!("Request failed with status code: {}", response.status()))
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
