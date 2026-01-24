package main

import (
	"backend/handlers"

	"github.com/go-chi/chi"
)

func setupRoutes() *chi.Mux {
	r := chi.NewRouter()
	r.Get("/api/users", handlers.GetUsersHandler)
	r.Get("/api/users/{userId}", handlers.GetUserHandler)
	r.Get("/api/threads", handlers.GetThreadsHandler)
	r.Get("/api/users/{userId}/threads", handlers.GetUserThreadsHandler)
	r.Get("/api/threads/{threadId}", handlers.GetThreadHandler)
	r.Get("/api/threads/{threadId}/comments", handlers.GetCommentsHandler)
	r.Get("/api/users/{userId}/comments", handlers.GetUserCommentsHandler)
	r.Post("/api/threads", handlers.CreateThreadHandler)
	r.Post("/api/threads/{threadId}/comments", handlers.CreateCommentHandler)
	r.Post("/api/users", handlers.CreateUserHandler)
	r.Patch("/api/threads/{threadId}/edit", handlers.EditThreadHandler)
	r.Patch("/api/threads/{threadId}/{commentId}/edit", handlers.EditCommentHandler)
	r.Delete("/api/threads/{threadId}/delete", handlers.DeleteThreadHandler)
	r.Delete("/api/threads/{threadId}/{commentId}/delete", handlers.DeleteCommentHandler)
	return r
}
