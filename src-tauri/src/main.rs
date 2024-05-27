// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::create_dir_all;
extern crate dotenv;

mod comands;
mod util;

fn main() {
    dotenv::dotenv().ok();

    tauri::Builder::default()
        .setup(|_| {
            let path = util::utils::get_base_path();
            let base_folders = vec!["patients", "appointments", "bills"];

            if let Err(e) = create_dir_all(&path) {
                eprintln!("Failed to create directory: {}", e);
            };

            if let Err(e) = util::utils::create_base_setup(path.clone(), base_folders) {
                eprintln!("Failed to create base configs: {}", e)
            };

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![comands::config::get_configs])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
