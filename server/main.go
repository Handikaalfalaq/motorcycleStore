package main

import (
	"fmt"
	"ktm_store/database"
	mysql "ktm_store/pkg/database"
	"ktm_store/routes"

	"github.com/labstack/echo/v4"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	e := echo.New()

	mysql.DatabaseConnection()
	database.RunMigration()

	routes.RouteInit(e.Group("/ktm_store/api/v1"))
	fmt.Println("server running localhost:5000")
	e.Start("localhost:5000")
}
