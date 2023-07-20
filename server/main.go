package main

import (
	"fmt"
	"ktm_store/database"
	mysql "ktm_store/pkg/database"
	"ktm_store/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func main() {
	godotenv.Load()
	e := echo.New()

	mysql.DatabaseConnection()
	database.RunMigration()

	routes.RouteInit(e.Group("/ktmstore/api/v1"))
	fmt.Println("server running localhost:5000")
	e.Logger.Fatal(e.Start("localhost:5000"))
}
