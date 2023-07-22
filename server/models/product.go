package models

type Product struct {
	Id        int    `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	NamaMotor string `json:"namaMotor" form:"namaMotor"`
	HargaJual int `json:"hargaJual" form:"hargaJual"`
	HargaBeli int `json:"hargaBeli" form:"hargaBeli"`
	Stok      int `json:"stok" form:"stok"`
	Image     string `json:"image" form:"image"`
}
