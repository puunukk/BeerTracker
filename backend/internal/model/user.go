package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username  string `json:"username" gorm:"unique"`
	Email     string `json:"email" gorm:"unique"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

type Manager struct {
	gorm.Model
	UserID uint `json:"userId" gorm:"foreignKey:UserID"`
	Active bool `json:"active"`
}
