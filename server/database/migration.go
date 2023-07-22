package database

import (
	"ktm_store/models"
	postgres "ktm_store/pkg/database"
)

func RunMigration() {
	err := postgres.DB.AutoMigrate(&models.User{}, &models.Product{})

	if err != nil {
		panic("Migration Failed")
	}
}
