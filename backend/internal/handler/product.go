package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/puunukk/BeerTracker/backend/internal/database"
	"github.com/puunukk/BeerTracker/backend/internal/model"
)

type ProductResponse struct {
	ID          uint    `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Status      string  `json:"status"`
	Published   bool    `json:"published"`
	Price       float64 `json:"price"`
	TotalStock  int     `json:"totalStock"`
}

// Helper function to calculate total stock and create a response
func createProductResponse(product model.Product) ProductResponse {
	totalStock := 0
	for _, stock := range product.Stocks {
		totalStock += stock.Quantity
	}
	return ProductResponse{
		ID:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		Status:      product.Status,
		Published:   product.Published,
		Price:       product.Price,
		TotalStock:  totalStock,
	}
}
func GetProducts(w http.ResponseWriter, r *http.Request) {
	var products []model.Product
	database.DB.Preload("Stocks").Where("published = ?", true).Find(&products)

	// Create a response with total stock calculated
	var productResponses []ProductResponse
	for _, product := range products {
		productResponse := createProductResponse(product)
		productResponses = append(productResponses, productResponse)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(productResponses)
}

func GetAllProducts(w http.ResponseWriter, r *http.Request) {
	var products []model.Product
	database.DB.Find(&products)
	json.NewEncoder(w).Encode(products)
}

func CreateProduct(w http.ResponseWriter, r *http.Request) {
	var product model.Product
	json.NewDecoder(r.Body).Decode(&product)
	database.DB.Create(&product)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(product)
}

func UpdateProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])
	var product model.Product
	database.DB.First(&product, id)
	json.NewDecoder(r.Body).Decode(&product)
	database.DB.Save(&product)
	json.NewEncoder(w).Encode(product)
}

func DeleteProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])
	var product model.Product
	database.DB.Delete(&product, id)
	w.WriteHeader(http.StatusNoContent)
}
