use crate::util::file_manager::ConfigManager;
use crate::util::utils;
use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Serialize, Deserialize, Debug)]

pub enum ConfigStatus {
    Complete,
    Setup,
    UserSetup,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ConfigState {
    pub config_file: utils::Configs,
    pub status: ConfigStatus,
    pub message: String,
}

fn get_config_path() -> Result<PathBuf, String> {
    let base_path = utils::get_base_path();
    let config_path = std::env::var("CONFIG_FILE").map_err(|e| e.to_string())?;
    Ok(base_path.join(config_path))
}

#[tauri::command]
pub fn get_configs() -> Result<ConfigState, String> {
    let path = get_config_path()?;
    let config_content = utils::Configs::load_or_create(&path).map_err(|e| e.to_string())?;
    let mut is_user_complete = true;
    let mut is_setup_complete = true;

    if config_content.user_data.name == "" || config_content.user_data.pw == "" {
        is_user_complete = false;
    };

    if config_content.specialty == "" || config_content.email == "" || config_content.api_key == ""
    {
        is_setup_complete = false;
    };

    let mut config_state = ConfigState {
        config_file: config_content,
        status: ConfigStatus::Complete,
        message: "Welcome back".to_string(),
    };

    if !is_user_complete {
        config_state.status = ConfigStatus::UserSetup;
        config_state.message = "Missing user data".to_string();
    } else if !is_setup_complete {
        config_state.status = ConfigStatus::Setup;
        config_state.message = "Missing basic setup".to_string();
    }

    Ok(config_state)
}

#[tauri::command]
pub fn update_user(name: String, pw: String) -> Result<utils::Configs, String> {
    let path = get_config_path()?;
    let mut config_file = utils::Configs::load_or_create(&path).map_err(|e| e.to_string())?;
    config_file.user_data.name = name;
    config_file.user_data.pw = pw;
    config_file.update(&path).map_err(|e| e.to_string())?;
    Ok(config_file)
}

#[tauri::command]
pub fn update_base_data(
    api_key: String,
    email: String,
    specialty: String,
) -> Result<utils::Configs, String> {
    let path = get_config_path()?;
    let mut config_file = utils::Configs::load_or_create(&path).map_err(|e| e.to_string())?;
    config_file.api_key = api_key;
    config_file.email = email;
    config_file.specialty = specialty;
    config_file.update(&path).map_err(|e| e.to_string())?;
    Ok(config_file)
}

#[tauri::command]
pub fn update_config(
    api_key: Option<String>,
    specialty: Option<String>,
    email: Option<String>,
    name: Option<String>,
    pw: Option<String>,
) -> Result<utils::Configs, String> {
    let path = get_config_path()?;
    let mut config_file = utils::Configs::load_or_create(&path).map_err(|e| e.to_string())?;
    if let Some(key) = api_key {
        config_file.api_key = key;
    }
    if let Some(s) = specialty {
        config_file.specialty = s;
    }
    if let Some(e) = email {
        config_file.email = e;
    }
    if let Some(n) = name {
        config_file.user_data.name = n;
    }
    if let Some(p) = pw {
        config_file.user_data.pw = p;
    }
    config_file.update(&path).map_err(|e| e.to_string())?;
    Ok(config_file)
}
