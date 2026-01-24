package main

import (
	"backend/repository"
	"log"
	"net/http"

	"github.com/rs/cors"
)

func main() {
	repository.InitDB()
	r := setupRoutes()
	handler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PATCH", "DELETE"},
		AllowedHeaders: []string{"Content-Type"},
	}).Handler(r)
	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
