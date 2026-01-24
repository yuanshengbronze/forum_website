package repository

import (
	"net/http"
	"time"
)

func Logout(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session_id")
	if err == nil {
		_, _ = DB.Exec(`UPDATE sessions SET revoked = TRUE WHERE session_id = ?`, cookie.Value)
		http.SetCookie(w, &http.Cookie{
			Name:     "session_id",
			Value:    "",
			Path:     "/",
			HttpOnly: true,
			Expires:  time.Unix(0, 0),
			MaxAge:   -1,
		})
	}
	w.WriteHeader(http.StatusNoContent)
}
