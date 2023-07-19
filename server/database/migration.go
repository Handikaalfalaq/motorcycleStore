package database

import (
	"ktm_store/models"
	mysql "ktm_store/pkg/database"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(&models.User{})

	if err != nil {
		panic("Migration Failed")
	}
}
