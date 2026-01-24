package repository

import (
	"backend/models"
	"database/sql"
	"fmt"
)

func GetUser(UserId int) (*models.User, error) {
	var u models.User
	err := DB.QueryRow("SELECT * FROM users WHERE user_id = ?", UserId).Scan(&u.UserId, &u.Username, &u.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user not found")
		}
		return nil, err
	}
	return &u, nil
}

func GetUsers() ([]models.User, error) {
	rows, err := DB.Query("SELECT * FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User

	for rows.Next() {
		var u models.User
		if err := rows.Scan(&u.UserId, &u.Username, &u.Password); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

func CreateUser(username string, password string) (int64, error) {
	res, err := DB.Exec("INSERT INTO users(username, password) VALUES (?, ?)", username, password)

	if err != nil {
		return 0, err
	}
	id, _ := res.LastInsertId()
	return id, nil
}
