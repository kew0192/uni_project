package main

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/jackc/pgx/v5"
)

var db *pgx.Conn

type Item struct {
	ID          string `json:"Id"`
	Name        string `json:"Name"`
	Description string `json:"Description"`
	Main        string `json:"Main"`
	Results     string `json:"Results"`
	Type_item   int    `json:"Type_item"`
	Author      string `json:"Author"`
}

func MiddleWare(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		next(w, r)
	}
}
func main() {
	str := "postgres://postgres:postgres@localhost:5432/uni?sslmode=disable"
	var errSQL error
	db, errSQL = pgx.Connect(context.Background(), str)
	if errSQL != nil {
		log.Fatal("Failed to connect to database:", errSQL)
	}
	http.HandleFunc("/createitem", MiddleWare(create_item))
	http.HandleFunc("/getallitems", get_all_items)
	http.HandleFunc("/get_item", MiddleWare(get_item_on_id))
	http.HandleFunc("/delete_item", MiddleWare(delete_item))
	http.HandleFunc("/updateitem", MiddleWare(update_item))
	http.HandleFunc("/search", MiddleWare((search)))
	log.Println("Сервер запущен")

	log.Fatal(http.ListenAndServe(":8080", nil))

}

func create_item(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	var request struct {
		Name        string `json:"Name"`
		Description string `json:"Description"`
		Main        string `json:"Main"`
		Results     string `json:"Results"`
		Type_item   int    `json:"Type_item"`
		Author      string `json:"Author"`
	}

	body, _ := io.ReadAll(r.Body)
	json.Unmarshal(body, &request)
	command := `INSERT INTO item (name, description, main, results, type, author) VALUES($1, $2, $3, $4, $5, $6)`
	db.Exec(context.Background(), command, request.Name, request.Description, request.Main, request.Results, request.Type_item, request.Author)
}
func delete_item(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	var request struct {
		Id int `json:"id"`
	}

	body, _ := io.ReadAll(r.Body)
	json.Unmarshal(body, &request)
	command := `DELETE FROM item WHERE id = $1`
	db.Exec(context.Background(), command, request.Id)
}
func get_all_items(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	rows, _ := db.Query(context.Background(), "SELECT id, name, description, main, results, type, author FROM item")
	defer rows.Close()
	items, _ := pgx.CollectRows(rows, pgx.RowToStructByPos[Item])
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func get_item_on_id(w http.ResponseWriter, r *http.Request) {
	var request struct {
		Id int `json:"id"`
	}
	body, _ := io.ReadAll(r.Body)
	json.Unmarshal(body, &request)

	var item Item
	err := db.QueryRow(context.Background(),
		"SELECT id, name, description, main, results, type, author FROM item WHERE id = $1",
		request.Id).Scan(&item.ID, &item.Name, &item.Description, &item.Main, &item.Results, &item.Type_item, &item.Author)

	if err != nil {
		http.Error(w, "Item not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(item)
}

func update_item(w http.ResponseWriter, r *http.Request) {
	var request struct {
		Id          int    `json:"Id"`
		Name        string `json:"Name"`
		Description string `json:"Description"`
		Main        string `json:"Main"`
		Results     string `json:"Results"`
	}

	body, _ := io.ReadAll(r.Body)
	json.Unmarshal(body, &request)
	command := `UPDATE item SET name = $1, description = $2, main = $3, results = $4 WHERE id = $5;`
	db.Exec(context.Background(), command, request.Name, request.Description, request.Main, request.Results, request.Id)
}

func search(w http.ResponseWriter, r *http.Request) {
	var request struct {
		Search string `json:"search"`
	}
	body, _ := io.ReadAll(r.Body)
	json.Unmarshal(body, &request)
	query := `
        SELECT 
            id,
            name,
            description,
            main,
            results,
            type,
            author
        FROM item
        WHERE name % $1 OR description % $1
        ORDER BY similarity(name, $1) DESC
    `

	rows, _ := db.Query(context.Background(), query, request.Search)
	defer rows.Close()
	items, _ := pgx.CollectRows(rows, pgx.RowToStructByPos[Item])
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}
