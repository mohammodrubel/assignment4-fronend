import { Alert, Button, Form, Input, InputNumber, Modal, Pagination, Select, Spin, Table, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { useDeleteProductMutation, useGetAllProductQuery, useUpdateProductMutation } from '../app/fetchers/product/productApi';
import { product, Tmeta } from '../types/globalTypes';
import { toast } from 'sonner';

export type TableDataType = Pick<product, "_id" | "name" | "image" | "brand" | "category" | "inStock" | "quantity">
const AllProduct = () => {
  const [params, setParams] = useState([])
  const [search, setSearchTerm] = useState('')
  const [limit, _setLimit] = useState(5)
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [_modalText, setModalText] = useState('Content of the modal');
  const [selectedProduct, setSelectedProduct] = useState<TableDataType | null>(null);
  const [updateProduct] = useUpdateProductMutation()
  const [handleDelete] = useDeleteProductMutation()



  const handleOk = () => {
    setModalText('Updating product...');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setSelectedProduct(null); // Reset the selected product after update
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedProduct(null); // Reset the selected product when the modal is closed
  };

  const { data, isLoading, isError, refetch } = useGetAllProductQuery(
    [
      { name: 'search', value: search },
      { name: 'limit', value: limit },
      { name: 'page', value: page },
      ...params
    ]
  );

  const tableData = data?.data?.map(({ _id, name, image, price, description, brand, category, inStock, quantity }) => ({
    _id,
    name,
    image,
    price,
    brand,
    description,
    category,
    inStock,
    quantity,
  }));

  const total: Tmeta = data?.meta!
  const categoryOptions = data?.data
    ?.map((item: product) => ({ text: item.category, value: item.category }))
    ?.filter((item, index, self) => index === self.findIndex(t => t.value === item.value));
  const brandOptions = data?.data
    ?.map((item: product) => ({ text: item.brand, value: item.brand }))
    ?.filter((item, index, self) => index === self.findIndex(t => t.value === item.value));

  const handleUpdateProduct = (productId: string) => {
    const productToUpdate = tableData?.find(product => product._id === productId);
    if (productToUpdate) {
      setSelectedProduct(productToUpdate);
      setOpen(true);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try{
      const res = await handleDelete(productId).unwrap()
      if(res?.success){
        toast.error(res?.message)
        refetch()
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const columns: TableProps<TableDataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (img) => <img src={img} alt='image' style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      filters: brandOptions,
      onFilter: (value, record) => record.brand === value,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: categoryOptions,
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'InStock',
      key: 'inStock',
      dataIndex: 'inStock',
      render: (text) => <Tag>{text === true ? "Yes" : "No"}</Tag>,
      filters: [
        { text: 'available', value: true },
        { text: 'not-available', value: false }
      ]
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Update Product',
      render: (product) => (
        <Button type='primary' onClick={() => handleUpdateProduct(product._id)}>
          Update Product
        </Button>
      ),
    },
    {
      title: 'Delete Product',
      render: (product) => (
        <Button type='primary' danger onClick={() => handleDeleteProduct(product._id)}>
          Delete Product
        </Button>
      ),
    },
  ];

  const onChange: TableProps<TableDataType>['onChange'] = (_pagination, filters, _sorter, extra) => {
    if (extra.action === 'filter') {
      const queryParams: any = []
      filters.brand?.forEach((item) => (queryParams.push({ name: 'brand', value: item })))
      filters.category?.forEach((item) => queryParams.push({ name: "category", value: item }))
      filters.inStock?.forEach((item) => queryParams.push({ name: "inStock", value: item }))
      setParams(queryParams)
    }
  };

  if (isLoading) return <Spin />;
  if (isError) return <Alert message="Error loading products" type="error" />;

  const onChangeHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onFinish = async (data: any) => {

    try {
      const id = selectedProduct?._id
      const res = await updateProduct({ id, data }).unwrap()
      if (res?.success){
        toast.success(res?.message)
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className='w-[50%] py-5 mx-auto'>
        <Input type="text" placeholder='Search Product' onChange={onChangeHandeler} />
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="key"
        pagination={false}
        loading={isLoading}
        onChange={onChange}
        scroll={{ x: "max-content" }}
      />
      <div className='mt-5'>
        <Pagination onChange={(value) => setPage(value)} pageSize={total.limit} total={total.total} />
      </div>
      <Modal
        title="Update Product"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {selectedProduct && (
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedProduct}
          >
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <Input placeholder="Image URL Link" />
            </Form.Item>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter the product name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: true, message: "Please select a category!" }]}
              >
                <Select>
                  <Select.Option value="Trek">Trek</Select.Option>
                  <Select.Option value="Giant">Giant</Select.Option>
                  <Select.Option value="Specialized">Specialized</Select.Option>
                  <Select.Option value="Cannondale">Cannondale</Select.Option>
                  <Select.Option value="Scott">Scott</Select.Option>
                  <Select.Option value="Santa Cruz">Santa Cruz</Select.Option>
                  <Select.Option value="Bianchi">Bianchi</Select.Option>
                  <Select.Option value="Cervélo">Cervélo</Select.Option>
                  <Select.Option value="Yeti">Yeti</Select.Option>
                  <Select.Option value="Merida">Merida</Select.Option>
                </Select>
              </Form.Item>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4">
              <Form.Item
                label="Price ($)"
                name="price"
                rules={[{ required: true, message: "Please enter the price!" }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: "Please enter the quantity!" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select a category!" }]}
              >
                <Select>
                  <Select.Option value="Road Bikes">Road Bikes</Select.Option>
                  <Select.Option value="Mountain Bikes">Mountain Bikes</Select.Option>
                  <Select.Option value="Hybrid Bikes">Hybrid Bikes</Select.Option>
                  <Select.Option value="Electric Bikes">Electric Bikes</Select.Option>
                  <Select.Option value="Folding Bikes">Folding Bikes</Select.Option>
                  <Select.Option value="Cruiser Bikes">Cruiser Bikes</Select.Option>
                  <Select.Option value="BMX Bikes">BMX Bikes</Select.Option>
                  <Select.Option value="Track Bikes">Track Bikes</Select.Option>
                  <Select.Option value="Touring Bikes">Touring Bikes</Select.Option>
                  <Select.Option value="Kids Bikes">Kids Bikes</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter the description!" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <div className="mx-auto w-[50%]">
                <Button className="w-full" type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default AllProduct;