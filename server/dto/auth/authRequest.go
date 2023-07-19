package authdto

type AuthRequest struct {
	Id          int    `json:"id" gorm:"primary_key, auto_increment"`
	Email       string `json:"email" gorm:"varchar(255)" validation:"required"`
	Password    string `json:"password" gorm:"varchar(255)" validation:"required"`
	FullName    string `json:"fullName" gorm:"varchar(255)" validation:"required"`
	Role        string `json:"role"`
	Token       string `json:"token"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}
