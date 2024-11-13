package model

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Status      string  `json:"status"`
	Published   bool    `json:"published"`
	Price       float64 `json:"price"`
	Stocks      []Stock `json:"stocks" gorm:"foreignKey:ProductID"`
	TotalStock  int     `json:"totalStock" gorm:"-"`
}
