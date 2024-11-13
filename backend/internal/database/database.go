package database

import (
	"fmt"
	"log"

	"github.com/puunukk/BeerTracker/backend/internal/config"
	"github.com/puunukk/BeerTracker/backend/internal/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB(config *config.Config) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
		config.DBHost, config.DBUser, config.DBPassword, config.DBName, config.DBPort)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Connected to the database")
}

func Migrate() {
	DB.AutoMigrate(
		&model.Product{},
		&model.Stock{},
		&model.Transaction{},
		&model.User{},
		&model.Manager{},
	)
	log.Println("Database migration completed")
}

func Seed() {
	products := []model.Product{
		{Name: "Beer", Description: "Refreshing beverage", Status: "pending", Published: true},
		{Name: "Wine", Description: "Fine red wine", Status: "draft", Published: false},
		{Name: "Whiskey", Description: "Smooth scotch whiskey", Status: "available", Published: true, Price: 45.99},
	}

	for _, product := range products {
		DB.FirstOrCreate(&product, model.Product{Name: product.Name})
	}

	users := []model.User{
		{Username: "admin", Email: "admin@example.com"},
		{Username: "john_doe", Email: "john@example.com"},
		{Username: "jane_doe", Email: "jane@example.com"},
	}

	for _, user := range users {
		DB.FirstOrCreate(&user, model.User{Username: user.Username})
		if user.Username == "admin" {
			DB.FirstOrCreate(&user, model.Manager{UserID: user.Model.ID})
		}
	}

	stocks := []model.Stock{
		{ProductID: 1, Quantity: 50},
		{ProductID: 3, Quantity: 10},
	}
	for _, item := range stocks {
		DB.FirstOrCreate(&item, model.Stock{ProductID: item.ProductID, Quantity: item.Quantity})
	}
	log.Println("Database seeding completed")
}
