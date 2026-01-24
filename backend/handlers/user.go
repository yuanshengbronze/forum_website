package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"backend/models"
	"backend/repository"

	"github.com/go-chi/chi"
)

func GetUserHandler(w http.ResponseWriter, r *http.Request) {
	userId_string := chi.URLParam(r, "userId")
	userId, _ := strconv.Atoi(userId_string)

	user, err := repository.GetUser(userId)
	if err != nil {
		http.Error(w, "Failed to fetch user", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(user)

}

func GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	users, err := repository.GetUsers()
	if err != nil {
		http.Error(w, "Failed to fetch users", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(users)

}

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	var newUser models.User
	json.NewDecoder(r.Body).Decode(&newUser)

	id, err := repository.CreateUser(newUser.Username, newUser.Password)
	if err != nil {
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		return
	}
	newUser.UserId = int(id)
	json.NewEncoder(w).Encode(newUser)
}
