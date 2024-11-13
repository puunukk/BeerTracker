package model

import (
	"gorm.io/gorm"
)

type Stock struct {
	gorm.Model
	ProductID int `json:"productID" gorm:"foreignKey:ProductID"`
	Quantity  int `json:"quantity"`
}
