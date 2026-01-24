package models

import (
	"time"
)

type Thread struct {
	Title     string    `json:"title"`
	ThreadId  int       `json:"threadId"`
	Body      string    `json:"body"`
	AuthorId  int       `json:"authorId"`
	CreatedAt time.Time `json:"created_at"`
	EditedAt  time.Time `json:"edited_at"`
}
