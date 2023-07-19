package models

type User struct {
	Id          int       `json:"id" gorm:"primary_key, auto_increment"`
	Email       string    `json:"email" gorm:"varchar(255)"`
	Password    string    `json:"password" gorm:"varchar(255)"`
	FullName    string    `json:"fullName" gorm:"varchar(255)"`
	Role        string    `json:"role"`
	Token       string    `json:"token"`
}