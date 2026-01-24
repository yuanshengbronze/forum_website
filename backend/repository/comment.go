package repository

import (
	"backend/models"
)

func GetComments(ThreadId int, limit int, offset int) ([]models.Comment, int, error) {
	var total int
	if err := DB.QueryRow("SELECT COUNT(*) FROM comments WHERE thread_id = ?", ThreadId).Scan(&total); err != nil {
		return nil, 0, err
	}

	rows, err := DB.Query("SELECT * FROM comments WHERE thread_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?", ThreadId, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var comments []models.Comment
	for rows.Next() {
		var c models.Comment
		if err := rows.Scan(&c.CommentId, &c.ThreadId, &c.Body, &c.AuthorId, &c.CreatedAt, &c.EditedAt); err != nil {
			return nil, 0, err
		}
		comments = append(comments, c)
	}
	return comments, total, nil
}

func GetUserComments(AuthorId int) ([]models.Comment, error) {
	rows, err := DB.Query("SELECT * FROM comments WHERE author_id = ?", AuthorId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []models.Comment
	for rows.Next() {
		var c models.Comment
		if err := rows.Scan(&c.CommentId, &c.ThreadId, &c.Body, &c.AuthorId, &c.CreatedAt, &c.EditedAt); err != nil {
			return nil, err
		}
		comments = append(comments, c)
	}
	return comments, nil
}

func CreateComment(ThreadId int, body string, author_id int) (int64, error) {
	res, err := DB.Exec("INSERT INTO comments(thread_id, body, author_id) VALUES (?, ?, ?)", ThreadId, body, author_id)

	if err != nil {
		return 0, err
	}
	id, _ := res.LastInsertId()
	return id, nil
}

func EditComment(newbody string, comment_id int) (int, error) {
	_, err := DB.Exec("UPDATE comments SET body = ? WHERE comment_id = ? ", newbody, comment_id)
	if err != nil {
		return 0, err
	}
	return comment_id, nil
}

func DeleteComment(comment_id int) error {
	_, err := DB.Exec("DELETE FROM comments WHERE comment_id=?", comment_id)
	if err != nil {
		return err
	}
	return nil
}
