package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"backend/models"
	"backend/repository"

	"github.com/go-chi/chi"
)

func GetCommentsHandler(w http.ResponseWriter, r *http.Request) {
	page := parseIntQuery(r, "page", 1)
	limit := parseIntQuery(r, "limit", 20)
	offset := (page - 1) * limit

	threadId_string := chi.URLParam(r, "threadId")
	threadId, _ := strconv.Atoi(threadId_string)
	comments, total, err := repository.GetComments(threadId, limit, offset)
	if err != nil {
		http.Error(w, "Failed to fetch comments", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]any{
		"items": comments,
		"page":  page,
		"limit": limit,
		"total": total,
	})
}

func GetUserCommentsHandler(w http.ResponseWriter, r *http.Request) {
	userId_string := chi.URLParam(r, "userId")
	userId, _ := strconv.Atoi(userId_string)
	comments, err := repository.GetUserComments(userId)
	if err != nil {
		http.Error(w, "Failed to fetch user comments!", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(comments)
}

func CreateCommentHandler(w http.ResponseWriter, r *http.Request) {
	threadId_string := chi.URLParam(r, "threadId")
	threadId, _ := strconv.Atoi(threadId_string)
	var newComment models.Comment
	json.NewDecoder(r.Body).Decode(&newComment)

	id, err := repository.CreateComment(threadId, newComment.Body, newComment.AuthorId)
	if err != nil {
		http.Error(w, "Failed to create comment", http.StatusInternalServerError)
		return
	}
	newComment.CommentId = int(id)
	json.NewEncoder(w).Encode(newComment)
}

func EditCommentHandler(w http.ResponseWriter, r *http.Request) {
	var newbody string
	commentId_string := chi.URLParam(r, "commentId")
	commentId, _ := strconv.Atoi(commentId_string)
	json.NewDecoder(r.Body).Decode(&newbody)
	id, err := repository.EditComment(newbody, commentId)
	if err != nil {
		http.Error(w, "Failed to edit comment", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(id)
}

func DeleteCommentHandler(w http.ResponseWriter, r *http.Request) {
	var deleteId int
	deleteId_string := chi.URLParam(r, "commentId")
	deleteId, _ = strconv.Atoi(deleteId_string)
	err := repository.DeleteComment(deleteId)
	if err != nil {
		http.Error(w, "Failed to delete comment", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
