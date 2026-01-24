package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"backend/models"
	"backend/repository"

	"github.com/go-chi/chi"
)

func parseIntQuery(r *http.Request, key string, def int) int {
	s := r.URL.Query().Get(key)
	if s == "" {
		return def
	}
	v, err := strconv.Atoi(s)
	if err != nil || v <= 0 {
		return def
	}
	return v
}

func GetThreadsHandler(w http.ResponseWriter, r *http.Request) {
	page := parseIntQuery(r, "page", 1)
	limit := parseIntQuery(r, "limit", 20)
	offset := (page - 1) * limit

	threads, total, err := repository.GetThreads(limit, offset)
	if err != nil {
		http.Error(w, "failed to fetch threads", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{
		"items": threads,
		"page":  page,
		"limit": limit,
		"total": total,
	})
}

func GetThreadHandler(w http.ResponseWriter, r *http.Request) {
	threadId_string := chi.URLParam(r, "threadId")
	threadId, _ := strconv.Atoi(threadId_string)

	thread, err := repository.GetThread(threadId)
	if err != nil {
		http.Error(w, "Failed to fetch thread", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(thread)
}

func GetUserThreadsHandler(w http.ResponseWriter, r *http.Request) {
	authorId_string := chi.URLParam(r, "userId")
	authorId, _ := strconv.Atoi(authorId_string)

	threads, err := repository.GetUserThreads(authorId)
	if err != nil {
		http.Error(w, "Failed to fetch user threads", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(threads)
}

func CreateThreadHandler(w http.ResponseWriter, r *http.Request) {
	var newThread models.Thread
	json.NewDecoder(r.Body).Decode(&newThread)

	id, err := repository.CreateThread(newThread.Title, newThread.Body, newThread.AuthorId)
	if err != nil {
		http.Error(w, "Failed to create thread", http.StatusInternalServerError)
		return
	}
	newThread.ThreadId = int(id)
	json.NewEncoder(w).Encode(newThread)
}

func EditThreadHandler(w http.ResponseWriter, r *http.Request) {
	var newtitle string
	threadId_string := chi.URLParam(r, "threadId")
	threadId, _ := strconv.Atoi(threadId_string)
	json.NewDecoder(r.Body).Decode(&newtitle)
	id, err := repository.EditThread(newtitle, threadId)
	if err != nil {
		http.Error(w, "Failed to edit thread", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(id)
}

func DeleteThreadHandler(w http.ResponseWriter, r *http.Request) {
	var deleteId int
	deleteId_string := chi.URLParam(r, "threadId")
	deleteId, _ = strconv.Atoi(deleteId_string)
	_, err := repository.DeleteThread(deleteId)
	if err != nil {
		http.Error(w, "Failed to delete thread", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
