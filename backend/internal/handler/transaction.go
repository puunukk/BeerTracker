package handler

import (
	"encoding/json"
	"net/http"

	"github.com/puunukk/BeerTracker/backend/internal/database"
	"github.com/puunukk/BeerTracker/backend/internal/model"
)

func CreateTransaction(w http.ResponseWriter, r *http.Request) {
	var transaction model.Transaction
	json.NewDecoder(r.Body).Decode(&transaction)

	var product model.Product
	database.DB.First(&product, transaction.ProductID)

	var stock model.Stock
	database.DB.First(&stock, transaction.ProductID)

	if transaction.Type == "add" {
		stock.Quantity += transaction.Quantity
	} else if transaction.Type == "remove" {
		if stock.Quantity < transaction.Quantity {
			http.Error(w, "Insufficient quantity", http.StatusBadRequest)
			return
		}
		stock.Quantity -= transaction.Quantity
	}

	database.DB.Save(&stock)
	database.DB.Create(&transaction)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(transaction)
}

func GetTransactions(w http.ResponseWriter, r *http.Request) {
	var transactions []model.Transaction
	database.DB.Find(&transactions)
	json.NewEncoder(w).Encode(transactions)
}
