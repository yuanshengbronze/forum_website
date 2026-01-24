package repository

import (
	"backend/models"
	"database/sql"
	"fmt"
)

func GetThreads(limit int, offset int) ([]models.Thread, int, error) {
	var total int
	if err := DB.QueryRow("SELECT COUNT(*) FROM threads").Scan(&total); err != nil {
		return nil, 0, err
	}

	rows, err := DB.Query(`SELECT * FROM threads ORDER BY created_at DESC LIMIT ? OFFSET ?`, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var threads []models.Thread

	for rows.Next() {
		var t models.Thread
		if err := rows.Scan(&t.ThreadId, &t.Title, &t.Body, &t.AuthorId, &t.CreatedAt, &t.EditedAt); err != nil {
			return nil, 0, err
		}
		threads = append(threads, t)
	}
	return threads, total, nil
}

func GetUserThreads(AuthorId int) ([]models.Thread, error) {
	rows, err := DB.Query("SELECT * FROM threads WHERE author_id=?", AuthorId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var threads []models.Thread

	for rows.Next() {
		var t models.Thread
		if err := rows.Scan(&t.ThreadId, &t.Title, &t.Body, &t.AuthorId, &t.CreatedAt, &t.EditedAt); err != nil {
			return nil, err
		}
		threads = append(threads, t)
	}
	return threads, nil
}

func GetThread(ThreadId int) (*models.Thread, error) {
	var t models.Thread
	err := DB.QueryRow("SELECT * FROM threads WHERE thread_id = ?", ThreadId).Scan(&t.ThreadId, &t.Title, &t.Body, &t.AuthorId, &t.CreatedAt, &t.EditedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("thread not found")
		}
		return nil, err
	}
	return &t, nil
}

func CreateThread(title string, body string, author_id int) (int64, error) {
	res, err := DB.Exec("INSERT INTO threads(title, body, author_id) VALUES (?, ?, ?)", title, body, author_id)

	if err != nil {
		return 0, err
	}
	id, _ := res.LastInsertId()
	return id, nil
}

func EditThread(newtitle string, thread_id int) (int, error) {
	_, err := DB.Exec("UPDATE threads SET title = ? WHERE thread_id = ? ", newtitle, thread_id)
	if err != nil {
		return 0, err
	}
	return thread_id, nil
}

func DeleteThread(thread_id int) (int, error) {
	_, err := DB.Exec("DELETE FROM threads WHERE thread_id= ? ", thread_id)
	if err != nil {
		return 0, err
	}
	return thread_id, nil
}
