use serde::{Deserialize, Serialize};
use std::fs;
use std::io::{self, Write};
use std::path::PathBuf;

pub trait ConfigManager {
    fn default() -> Self;

    fn load_or_create(path: &PathBuf) -> io::Result<Self>
    where
        for<'de> Self: Sized + Serialize + Deserialize<'de>,
    {
        if path.exists() {
            // Read the config file if it exists
            let config_content = fs::read_to_string(&path)?;
            let config: Self = serde_json::from_str(&config_content)?;
            Ok(config)
        } else {
            // Create a new config file with default values if it doesn't exist
            let default_config = Self::default();

            let config_content = serde_json::to_string_pretty(&default_config)?;
            fs::create_dir_all(path.parent().unwrap())?;
            let mut file = fs::File::create(&path)?;
            file.write_all(config_content.as_bytes())?;

            Ok(default_config)
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use tempfile::tempdir; // Import the tempdir function from the tempfile crate
    #[derive(Serialize, Deserialize, Debug)]
    pub struct TestFile {
        pub name: String,
    }

    impl ConfigManager for TestFile {
        fn default() -> Self {
            TestFile {
                name: String::from(""),
            }
        }
    }

    #[test]
    fn test_load_or_create() {
        let test_name = "test.json".to_string();
        let temp_dir = tempdir().expect("Failed to create temp dir");
        let file_path = temp_dir.path().join(test_name);

        let new_file =
            TestFile::load_or_create(&file_path).expect("Error: Failed to load or create file");

        assert!(file_path.exists());
        assert_eq!(new_file.name, "");
    }
}
