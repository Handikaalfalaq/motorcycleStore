package productdto

type ProductResponse struct {
	Id              int    `json:"id"`
	NamaMotor          string `json:"namaMotor" form:"namaMotor"`
	Informasi          string `json:"informasi" form:"informasi"`
	HargaJual          string `json:"hargaJual" form:"hargaJual"`
	HargaBeli          string `json:"hargaBeli" form:"hargaBeli"`
	Stok          string `json:"stok" form:"stok"`
	Image           string `json:"image" form:"image"`
}