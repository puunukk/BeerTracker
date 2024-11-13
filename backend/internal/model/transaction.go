package model

import (
	"gorm.io/gorm"
	"time"
)

type Transaction struct {
	gorm.Model
	ProductID int       `json:"productId"`
	Product   Product   `json:"product" gorm:"foreignKey:ProductID"`
	UserID    int       `json:"userId"`
	User      User      `json:"user" gorm:"foreignKey:UserID"`
	Quantity  int       `json:"quantity"`
	Type      string    `json:"type"` // "add" or "remove"
	Timestamp time.Time `json:"timestamp"`
}
