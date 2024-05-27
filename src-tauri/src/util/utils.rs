use dirs::home_dir;
use serde::{Deserialize, Serialize};
use std::fs::create_dir_all;
use std::io::Error;
use std::path::PathBuf;

use super::file_manager::ConfigManager;

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    name: String,
    pw: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Configs {
    pub specialty: String,
    pub api_key: String,
    pub email: String,
    pub user_data: User,
}

impl ConfigManager for Configs {
    fn default() -> Self {
        Configs {
            specialty: String::from(""),
            api_key: String::from(""),
            email: String::from(""),
            user_data: User {
                name: String::from(""),
                pw: String::from(""),
            },
        }
    }
}

pub fn get_base_path() -> PathBuf {
    let env_path = std::env::var("FS_ROUTE");

    let env_path = match env_path {
        Ok(env_path) => env_path,
        Err(err) => panic!("{}", err),
    };

    let mut path = home_dir().expect("Failed to get home directory");
    path.push(env_path);
    path
}

pub fn create_base_setup(base_path: PathBuf, folders: Vec<&str>) -> Result<(), Error> {
    for folder in &folders {
        let folder_path = base_path.join(folder);
        create_dir_all(&folder_path)?;
    }
    let config_env = std::env::var("CONFIG_FILE");
    let config_env = match config_env {
        Ok(config_env) => config_env,
        Err(err) => panic!("{}", err),
    };

    Configs::load_or_create(&base_path.join(config_env))?;

    Ok(())
}

#[cfg(test)]
mod test {
    use super::*;
    use tempfile::tempdir; // Import the tempdir function from the tempfile crate
    #[test]
    fn test_create_base_setup() {
        let folders = vec!["folder1", "folder2", "folder3"];
        let temp_dir = tempdir().expect("Failed to create temp dir");
        let base_path = temp_dir.path().to_path_buf();
        create_base_setup(base_path.clone(), folders.clone())
            .expect("Failed to create folders and file");
        for folder in &folders {
            let folder_path = base_path.join(folder);
            assert!(folder_path.is_dir(), "Folder {} was not created", folder);
        }
    }
}
