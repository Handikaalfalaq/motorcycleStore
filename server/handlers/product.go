package handlers

import (
	productdto "ktm_store/dto/product"
	resultdto "ktm_store/dto/result"
	"ktm_store/models"
	"ktm_store/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

var downloadFile = "http://localhost:5000/uploads/"

type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandlerProduct(ProductRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) CreateNewProduct(c echo.Context) error {
	dataImage := c.Get("dataImage").(string)

	request := new(productdto.CreateProductRequest)

	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	HargaJual, err := strconv.Atoi(c.FormValue("hargaJual"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Harga jual harus berupa angka"})
	}

	HargaBeli, err := strconv.Atoi(c.FormValue("hargaBeli"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Harga beli harus berupa angka"})
	}

	Stok, err := strconv.Atoi(c.FormValue("stok"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Stok harus berupa angka"})
	}

	product := models.Product{
		NamaMotor: c.FormValue("namaMotor"),
		HargaJual: HargaJual,
		HargaBeli: HargaBeli,
		Stok:      Stok,
		Image:     dataImage,
	}

	data, err := h.ProductRepository.CreateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseProduct(data)})
}

func (h *handlerProduct) GetAllProduct(c echo.Context) error {
	products, err := h.ProductRepository.FindProducts()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: products})
}

func (h *handlerProduct) GetProductById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: product})
}

func (h *handlerProduct) UpdateDataProduct(c echo.Context) error {
	dataImageUpdate := c.Get("dataImage").(string)

	id, _ := strconv.Atoi(c.Param("id"))
	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var namaMotor = c.FormValue("namaMotor")
	if namaMotor != "" {
		product.NamaMotor = namaMotor
	}

	var hargaJualStr = c.FormValue("hargaJual")
	if hargaJualStr != "" {
		hargaJual, err := strconv.Atoi(hargaJualStr)
		if err != nil {
			return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
				Code:    http.StatusBadRequest,
				Message: "Harga jual harus berupa angka"})
			}
		product.HargaJual = hargaJual
	}

	var hargaBeliStr = c.FormValue("hargaBeli")
	if hargaBeliStr != "" {
		hargaBeli, err := strconv.Atoi(hargaBeliStr)
		if err != nil {
			return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
				Code:    http.StatusBadRequest,
				Message: "Harga Beli harus berupa angka"})
			}
		product.HargaBeli = hargaBeli
	}

	var stokStr = c.FormValue("stok")
	if stokStr != "" {
		stok, err := strconv.Atoi(stokStr)
		if err != nil {
			return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
				Code:    http.StatusBadRequest,
				Message: "Harga Beli harus berupa angka"})
			}
		product.Stok = stok
	}

	var dataImage = dataImageUpdate
	if dataImage != "" {
		product.Image = dataImage
	}

	data, err := h.ProductRepository.UpdateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseProduct(data)})
}

func (h *handlerProduct) DeleteDataProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.ProductRepository.DeleteProduct(product, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseProduct(data)})
}

func convertResponseProduct(u models.Product) productdto.ProductResponse {
	return productdto.ProductResponse{
		Id:        u.Id,
		NamaMotor: u.NamaMotor,
		HargaBeli: u.HargaJual,
		HargaJual: u.HargaBeli,
		Stok:      u.HargaBeli,
		Image:     u.Image,
	}
}
