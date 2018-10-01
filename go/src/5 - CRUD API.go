package main

import (
	"fmt"

	"github.com/gin-contrib/cors" // Why do we need this package?
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error

type Person struct {
	ID        uint   `json:"id"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	UserName  string `json:"username"`
	Password  string `json:"password"`
	Superuser uint   `json:"superuser"`
}
type Question struct {
	ID       uint   `json:"id"`
	Genre    string `json:"genre"`
	QuizNum  string `json:"quiznum"`
	Question string `json:"question"`
	A        string `json:"a"`
	B        string `json:"b"`
	C        string `json:"c"`
	D        string `json:"d"`
	CorrectA uint   `json:"correcta"`
	CorrectB uint   `json:"correctb"`
	CorrectC uint   `json:"correctc"`
	CorrectD uint   `json:"correctd"`
}

type Score struct {
	ID       uint   `json:"id"`
	UserName string `json:"username"`
	Genre    string `json:"genre"`
	QuizNum  string `json:"quiznum"`
	Score    uint   `json:"score"`
}

type Taken struct {
	ID        uint   `json:"id"`
	UserName  string `json:"username"`
	Genre     string `json:"genre"`
	QuizNum   string `json:"quiznum"`
	Attempted uint   `json:"attempt"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&Question{})
	db.AutoMigrate(&Person{})
	db.AutoMigrate(&Score{})
	r := gin.Default()
	r.GET("/people/", GetPeople)
	r.GET("/quiz/:gen/:num", GetQuizQues)
	r.GET("/score/:gen/:num", GetScore)
	r.GET("/question/", GetQuestion)
	r.GET("/people/:id", GetPerson)
	r.POST("/signup", SignUp)
	r.POST("/score", AddScore)
	r.POST("/quizcount", CountQuiz)
	r.GET("/retquizcount/:user", RetCountQuiz)
	r.POST("/addques", CreateQuestion)
	r.PUT("/people/:id", UpdatePerson)
	r.DELETE("/people/:id", DeletePerson)
	r.DELETE("/quiz/:gen/:num", DeleteQuiz)
	r.DELETE("/question/:id", DeleteQuestion)
	r.Use((cors.Default()))
	r.Run(":8080")
}
func GetScore(c *gin.Context) {
	var scor []Score
	db.Order("score desc").Where("genre=? AND quiz_num=?", c.Params.ByName("gen"), c.Params.ByName("num")).Find(&scor)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, scor)
}
func CountQuiz(c *gin.Context) {
	var scor Taken
	var check Taken
	c.BindJSON(&scor)
	db.Where("user_name = ? AND genre=? AND quiz_num=?", scor.UserName, scor.Genre, scor.QuizNum).Find(&check)
	scor.Attempted = 1 + check.Attempted
	db.Where("user_name = ? AND genre=? AND quiz_num=?", scor.UserName, scor.Genre, scor.QuizNum).Delete(&Taken{})
	db.Create(&scor)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, scor)
}
func RetCountQuiz(c *gin.Context) {
	var scor []Taken
	db.Where("user_name = ?", c.Params.ByName("user")).Find(&scor)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, scor)
}
func AddScore(c *gin.Context) {
	var scor Score
	var check Score
	c.BindJSON(&scor)
	db.Where("user_name = ? AND genre=? AND quiz_num=?", scor.UserName, scor.Genre, scor.QuizNum).Find(&check)
	if (check != Score{}) {
		if check.Score < scor.Score {
			db.Where("user_name = ? AND genre=? AND quiz_num=?", scor.UserName, scor.Genre, scor.QuizNum).Delete(&Score{})
			db.Create(&scor)
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, scor)
		} else {
			c.Header("access-control-allow-origin", "*")
			c.JSON(301, scor)
		}
	} else {

		db.Create(&scor)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, scor)
	}
}
func GetQuizQues(c *gin.Context) {
	gen := c.Params.ByName("gen")
	num := c.Params.ByName("num")
	var ques []Question
	db.Select("*").Where("genre = ? AND quiz_num=?", gen, num).Find(&ques)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, ques)
}
func DeleteQuiz(c *gin.Context) {
	gen := c.Params.ByName("gen")
	num := c.Params.ByName("num")
	var ques Question
	db.Where("genre = ? AND quiz_num=?", gen, num).Delete(&ques)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, ques)
}
func CreateQuestion(c *gin.Context) {
	var ques Question
	c.BindJSON(&ques)
	db.Create(&ques)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, ques)
}
func DeletePerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Person
	db.Where("id = ?", id).Delete(&person)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeleteQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var ques Question
	db.Where("id = ?", id).Delete(&ques)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func UpdatePerson(c *gin.Context) {
	var person Person
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&person)
	db.Save(&person)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, person)
}

func SignUp(c *gin.Context) {
	var person Person
	var check Person
	c.BindJSON(&person)
	db.Where("user_name = ?", person.UserName).Find(&check)
	if (check != Person{}) {
		c.Header("access-control-allow-origin", "*")
		c.JSON(301, person)
	} else {
		db.Create(&person)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, person)
	}
}

func GetPerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Person
	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, person)
	}
}

func GetPeople(c *gin.Context) {
	var people []Person
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, people)
	}
}
func GetQuestion(c *gin.Context) {
	var ques []Question
	if err := db.Find(&ques).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, ques)
	}
}
