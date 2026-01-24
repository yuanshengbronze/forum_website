package models

type User struct {
	UserId   int    `json:"userId"`
	Username string `json:"username"`
	Password string `json:"password"`
}
