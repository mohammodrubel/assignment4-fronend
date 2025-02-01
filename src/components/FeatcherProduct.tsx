import { Alert, Button, Card, Input, Pagination, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useGetAllProductQuery } from '../app/fetchers/product/productApi';
import { addToCart } from '../app/fetchers/product/productSlice';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { product, Tmeta } from '../types/globalTypes';
import Container from './ui/Container';

export type TableDataType = Pick<product, "_id" | "name" | "image" | "brand" | "category" | "inStock" | "quantity">

const FeatcherProduct = () => {
    const user = useAppSelector((state) => state?.auth?.user)
    const [params, _setParams] = useState([])
    const [search, setSearchTerm] = useState('')
    const [limit, _setLimit] = useState(6)
    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch()
    const { data, isLoading, isError } = useGetAllProductQuery(
        [
            { name: 'search', value: search },
            { name: 'limit', value: limit },
            { name: 'page', value: page },
            ...params
        ]
    );

    const total: Tmeta = data?.meta!


    if (isLoading) return <Spin />;
    if (isError) return <Alert message="Error loading products" type="error" />;

    const onChangeHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const addToCartProduct = (data: product) => {
        if (!user) {
            return toast.error('Please log in to add products to your cart.');
        }
        dispatch(addToCart(data));
    };

    return (
        <>
            <h2 className='text-center mx-auto text-2xl md:text-4xl font-bold text-[#0e2431]'>Featcher Product</h2>
            <div className='w-[50%] py-5 mx-auto'>
                <Input type="text" placeholder='Search Product' onChange={onChangeHandeler} />
            </div>

            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 mx-auto md:grid-cols-3 xl:grid-cols-4 justify-center item-center'>
                    {
                        data?.data?.map((item) => <div className='my-5 mx-auto'>
                            <Card
                                style={{ width: '310px' }}
                                cover={
                                    <Link to={`/${item?._id}`}>
                                        <img
                                            alt="example"
                                            src={item.image}
                                            className="object-fill h-[250px]"
                                        />
                                    </Link>
                                }
                            >
                                <Link to={`/${item?._id}`}><Meta
                                    title={item?.name}
                                    description={item?.description}
                                /></Link>
                                <b>Stock:{item?.quantity === 0 ? <span className='text-red-500'>out of stock</span> : <span className='text-green-500 mx-2'>{item?.quantity}</span>}</b>
                                <div className='flex my-5 justify-between item-center'>
                                    <Button onClick={() => addToCartProduct(item)} disabled={item?.quantity === 0} type='primary'><i className="fa-solid fa-cart-shopping"></i> Add To Cart</Button>
                                    <Button disabled={item?.quantity === 0} type='primary'><i className="fa-solid fa-heart"></i>Favorite</Button>
                                </div>
                            </Card>
                        </div>)
                    }
                </div>
            </Container>

            <div className='flex justify-center py-10'>
                <Pagination className='text-center mx-auto' onChange={(value) => setPage(value)} pageSize={total.limit} total={total.total} />
            </div>
        </>
    );
};

export default FeatcherProduct;
