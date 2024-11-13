package main

import (
	"fmt"
	"github.com/puunukk/BeerTracker/backend/internal/config"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/puunukk/BeerTracker/backend/internal/database"
	"github.com/puunukk/BeerTracker/backend/internal/handler"
	"github.com/rs/cors"
)

func main() {
	// Initialize database connection
	cfg := config.LoadConfig()

	database.InitDB(cfg)
	database.Migrate()
	database.Seed()

	// Initialize router
	r := mux.NewRouter()

	// Define routes
	r.HandleFunc("/", handler.GetProducts).Methods("GET")
	r.HandleFunc("/products", handler.GetAllProducts).Methods("GET")
	r.HandleFunc("/products", handler.CreateProduct).Methods("POST")
	r.HandleFunc("/products/{id}", handler.UpdateProduct).Methods("PUT")
	r.HandleFunc("/products/{id}", handler.DeleteProduct).Methods("DELETE")

	r.HandleFunc("/transactions", handler.GetTransactions).Methods("GET")
	r.HandleFunc("/transactions", handler.CreateTransaction).Methods("POST")

	r.HandleFunc("/users", handler.GetUsers).Methods("GET")
	r.HandleFunc("/users", handler.CreateUser).Methods("POST")
	r.HandleFunc("/users/{id}", handler.UpdateUser).Methods("PUT")
	r.HandleFunc("/users/{id}", handler.DeleteUser).Methods("DELETE")

	// Configure CORS settings
	c := cors.New(cors.Options{
		//AllowedOrigins: []string{"*"}, // Allow your frontend origin
		AllowedOrigins: cfg.AcceptedOrigins, // Allow your frontend origin
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{
			"Content-Type",
			"Authorization",
			"Accept",
			"X-Requested-With",
			"Origin",
		},
		AllowCredentials: true,
	})

	// Wrap the router with the CORS middleware
	handler := c.Handler(r)

	// Start server
	log.Println(fmt.Sprintf("Server starting %v app on port %s...", cfg.ServerEnv, cfg.ServerPort))
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", cfg.ServerPort), handler))
}
