package models

import (
	"time"
)

type Comment struct {
	CommentId int       `json:"commentId"`
	ThreadId  int       `json:"threadId"`
	Body      string    `json:"body"`
	AuthorId  int       `json:"authorId"`
	CreatedAt time.Time `json:"created_at"`
	EditedAt  time.Time `json:"edited_at"`
}
