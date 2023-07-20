package database

import (
	"ktm_store/models"
	mysql "ktm_store/pkg/database"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(&models.User{}, &models.Product{})

	if err != nil {
		panic("Migration Failed")
	}
}
