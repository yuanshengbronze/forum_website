package repository

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
)

func CheckCredentials(r *http.Request) (int, error) {
	var creds models.User
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		return 0, fmt.Errorf("invalid request")
	}
	var result models.User
	err := DB.QueryRow(`SELECT user_id FROM users WHERE username = ? AND password = ?`, creds.Username, creds.Password).Scan(&result.UserId)

	if err != nil {
		return 0, fmt.Errorf("invalid username or password")
	}
	return result.UserId, nil
}

func Login(w http.ResponseWriter, r *http.Request) {
	userId, _ := CheckCredentials(r)

	sessionId := uuid.NewString()
	expires := time.Now().Add(24 * time.Hour)

	_, _ = DB.Exec(`INSERT INTO sessions (session_id, user_id, expires_at) VALUES (?, ?, ?)`, sessionId, userId, expires)

	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    sessionId,
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
		Path:     "/",
		Expires:  expires,
	})

	json.NewEncoder(w).Encode(userId)
}
