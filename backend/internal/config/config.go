package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
	"strconv"
	"strings"
)

// AppEnvType defines the API backend environment value
type AppEnvType string

const (
	Dev     AppEnvType = "development"
	Staging AppEnvType = "staging"
	Prod    AppEnvType = "production"
)

// Config struct holds configuration settings read from environment variables or default values
type Config struct {
	// Application settings
	AcceptedOrigins []string   // List of accepted origins for CORS, default: ["http://staging.localhost:5173", "http://localhost:5173"]
	ServerEnv       AppEnvType // Application environment, default: "development"
	ServerPort      string     // Port on which the application runs, default: 8000
	// Database settings
	DBHost     string // Database host, default: "localhost"
	DBPort     string // Database port, default: 5432
	DBName     string // Database name, default: ""
	DBUser     string // Database user, default: ""
	DBPassword string // Database password, default: "default_password"
}

// ServerConfig is a global variable to hold the loaded configuration
var ServerConfig Config

// LoadConfig loads configuration settings from the .env file or environment variables
func LoadConfig() *Config {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error reading .env file, %s", err)
	}
	// Populate the AppConfig with values from environment variables or default values
	return &Config{
		// Application settings
		ServerEnv:  getEnv("SERVER_ENV", Dev).(AppEnvType),
		ServerPort: getEnv("SERVER_PORT", "8080").(string),
		AcceptedOrigins: getEnv("ACCEPTED_ORIGINS", []string{
			"http://staging.localhost:5173",
			"http://localhost:5173",
		}).([]string),
		// Database settings
		DBHost:     getEnv("DB_HOST", "localhost").(string),
		DBPort:     getEnv("DB_PORT", "5432").(string),
		DBUser:     getEnv("DB_USER", "").(string),
		DBPassword: getEnv("DB_PASSWORD", "").(string),
		DBName:     getEnv("DB_NAME", "product_tracker").(string),
	}
}

// getEnv reads an environment variable and returns its value or a default value if the variable is not set
func getEnv(key string, defaultValue interface{}) interface{} {
	if value, exists := os.LookupEnv(key); exists {
		switch v := defaultValue.(type) {
		case string:
			return value
		case bool:
			return value == "true" || value == "1"
		case []string:
			return strings.Split(value, ",")
		case int:
			if intValue, err := strconv.Atoi(value); err == nil {
				return intValue
			}
		case AppEnvType:
			switch AppEnvType(value) {
			case Dev, Staging, Prod:
				return AppEnvType(value)
			default:
				return string(Dev)
			}
		case nil:
			return value
		default:
			log.Fatalf("Unsupported default value type: %T", v)
		}
	}
	return defaultValue
}
