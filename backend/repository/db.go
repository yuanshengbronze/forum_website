package repository

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	var err error
	dsn := "root:HanaKanazawaMayuri1!@tcp(127.0.0.1:3306)/forum?parseTime=true&loc=Asia%2FSingapore"
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Connection to database failed", err)
	}
	if err := DB.Ping(); err != nil {
		log.Fatal("Failed to ping database", err)
	}
}
