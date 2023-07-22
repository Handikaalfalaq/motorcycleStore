package main

import (
	"fmt"
	"ktm_store/database"
	postgres "ktm_store/pkg/database"
	"ktm_store/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	godotenv.Load()
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization", echo.HeaderOrigin, echo.HeaderAccept},
	}))

	postgres.DatabaseConnection()
	database.RunMigration()

	routes.RouteInit(e.Group("/ktmstore/api/v1"))
	fmt.Println("server running localhost:5000")
	e.Logger.Fatal(e.Start("localhost:5000"))
}
