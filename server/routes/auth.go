package routes

import (
	"ktm_store/handlers"
	postgres "ktm_store/pkg/database"
	"ktm_store/pkg/middleware"
	"ktm_store/repositories"

	"github.com/labstack/echo/v4"
)

func AutRoutes(e *echo.Group) {
	authRepository := repositories.RepositoryAuth(postgres.DB)
	h := handlers.HandlerAuth(authRepository)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login)
	e.GET("/check-auth", middleware.Auth(h.CheckAuth))
}
