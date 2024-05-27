use crate::util::file_manager::ConfigManager;
use crate::util::utils;

#[tauri::command]
pub fn get_configs() -> Result<utils::Configs, String> {
    let base_path = utils::get_base_path();
    let config_path = std::env::var("CONFIG_FILE").map_err(|e| e.to_string())?;
    let config_content =
        utils::Configs::load_or_create(&base_path.join(config_path)).map_err(|e| e.to_string())?;

    Ok(config_content)
}
