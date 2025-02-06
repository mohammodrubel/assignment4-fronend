"use client"

import {
  CarOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
} from "@ant-design/icons"
import { Button, Image, Rate, Spin } from "antd"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useGetSingleProductQuery } from "../app/fetchers/product/productApi"
import { addToCart } from "../app/fetchers/product/productSlice"
import { useAppDispatch, useAppSelector } from "../app/hook"
import { userCurrentInformation } from "../app/fetchers/auth/authSlice"
import { toast } from "sonner"

// Define product type
interface Product {
  _id: string
  name: string
  image: string
  price: number
  quantity: number
  inStock: boolean
  description: string
  orderQuantity: number
  category: string
  brand: string
  rating: number
  reviews: number
  features: string[]
  specifications: { [key: string]: string }
}

const ProductDetails = () => {
  const user = useAppSelector(userCurrentInformation)
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useGetSingleProductQuery(id)
  const dispatch = useAppDispatch()
  const [previewVisible, setPreviewVisible] = useState(false)

  const handlePreview = () => {
    setPreviewVisible(true)
  }

  // Safely extract product data
  const singleProduct: Product | undefined = data?.data

  const addToCartHandler = (product: Product) => {
    if(!user){
      toast.warning('Please log in to add items to your cart.')
      return 
    }
    dispatch(addToCart(product))
  }

  if (isLoading) return <Spin size="large" className="flex justify-center items-center h-screen" />
  if (!singleProduct) return <div className="flex justify-center items-center h-screen">Product not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <Image
            src={singleProduct.image || "/placeholder.svg"}
            alt={singleProduct.name}
            className="w-full h-auto object-contain rounded-lg shadow-lg"
            preview={{
              visible: previewVisible,
              onVisibleChange: (visible) => setPreviewVisible(visible),
            }}
            onClick={handlePreview}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{singleProduct.name}</h1>
            <p className="text-gray-500">by {singleProduct.brand}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Rate disabled defaultValue={singleProduct.rating} />
            <span className="text-sm text-gray-600">({singleProduct.reviews} reviews)</span>
          </div>

          <div className="border-t border-b py-4">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-green-600">{singleProduct.price.toLocaleString()} Tk</p>
              <p className="text-lg">
                Stock:{" "}
                {singleProduct.quantity === 0 ? (
                  <span className="font-bold text-red-500">Out of stock</span>
                ) : (
                  <span className="font-bold text-green-500">{singleProduct.quantity} available</span>
                )}
              </p>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="flex space-x-4">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={() => addToCartHandler(singleProduct)}
              disabled={singleProduct.quantity === 0}
              className="flex-1 h-12 text-lg"
            >
              Add to Cart
            </Button>
            <Button icon={<HeartOutlined />} className="flex-1 h-12 text-lg">
              Add to Wishlist
            </Button>
          </div>
                <div>
                  {singleProduct?.description}
                </div>
          {/* Benefits */}
          <div className="grid grid-cols-3 gap-4 py-8">
            {[
              { label: "Free Delivery", icon: <CarOutlined /> },
              { label: "30 Day Returns", icon: <SyncOutlined /> },
              { label: "2 Year Warranty", icon: <SafetyCertificateOutlined /> },
            ]?.map(({ label, icon }, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto text-blue-600 text-2xl">{icon}</div>
                <p className="font-semibold text-sm">{label}</p>
              </div>
            ))}
          </div>

          {/* Customer Support */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <PhoneOutlined className="text-blue-600" />
                <span>Call us at: +880 1234 567890</span>
              </div>
              <div className="flex items-center space-x-2">
                <MailOutlined className="text-blue-600" />
                <span>Email: support@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails




