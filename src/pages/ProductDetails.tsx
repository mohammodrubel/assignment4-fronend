"use client"

import type React from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Image, Rate, Collapse, Spin } from "antd"
import {
  ShoppingCartOutlined,
  HeartOutlined,
  CarOutlined,
  SyncOutlined,
  SafetyCertificateOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons"
import { useGetSingleProductQuery } from "../app/fetchers/product/productApi"
import { addToCart } from "../app/fetchers/product/productSlice"
import { useAppDispatch } from "../app/hook"

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

const { Panel } = Collapse

const ProductDetails: React.FC = () => {
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

          {/* Product Description */}
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="Product Description" key="1">
              <p>{singleProduct.description}</p>
            </Panel>
            <Panel header="Key Features" key="2">
              <ul className="list-disc pl-5 space-y-2">
                {singleProduct.features?.length ? (
                  singleProduct.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))
                ) : (
                  <li>No features available</li>
                )}
              </ul>
            </Panel>
            <Panel header="Specifications" key="3">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(singleProduct.specifications || {}).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-semibold">{key}:</span> {value}
                  </div>
                ))}
              </div>
            </Panel>
          </Collapse>

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
