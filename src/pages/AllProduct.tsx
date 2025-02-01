import { Alert, Input, Pagination, Spin, Table, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { useGetAllProductQuery } from '../app/fetchers/product/productApi';
import { product, Tmeta } from '../types/globalTypes';

export type TableDataType = Pick<product, "_id" | "name" | "image" | "brand" | "category" | "inStock" | "quantity">
type OptionsType={text:string,value:string}
const AllProduct = () => {
  const [params, setParams] = useState([])
  const [search, setSearchTerm] = useState('')
  const [limit, _setLimit] = useState(5)
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetAllProductQuery(
    [
      { name: 'search', value: search },
      { name: 'limit', value: limit },
      { name: 'page', value: page },
      ...params
    ]
  );
  const tableData = data?.data?.map(({ _id, name, image, brand, category, inStock, quantity }) => ({
    _id,
    name,
    image,
    brand,
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
      render:(text)=><Tag>{text === true ? "Yes" : "No"}</Tag>,
      filters:[
        {text:'available',value:true},
        {text:'not-available',value:false}
      ]
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
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
      />
      <div className='mt-5'>
      <Pagination onChange={(value) => setPage(value)} pageSize={total.limit} total={total.total} />
      </div>
    </>
  );
};

export default AllProduct;
