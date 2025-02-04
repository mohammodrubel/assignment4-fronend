import { Button, Input, Pagination, Radio, Slider } from "antd";
import { useState } from "react";
import { useCategoryBrandQuery, useGetAllProductQuery } from "../app/fetchers/product/productApi";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import Error from "../components/ui/Error";
import Loading from "../components/ui/Loading";

function Shop() {
    const { data: categoryBrand } = useCategoryBrandQuery(undefined);
    const [page, setPage] = useState(1);
    const [limit, _setLimit] = useState(6);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');


    // Get all products with query parameters
    const { isLoading, isError, data } = useGetAllProductQuery(
        [
            { name: 'search', value: search },
            { name: 'limit', value: limit },
            { name: 'page', value: page },
            { name: 'category', value: selectedCategory },
            { name: 'brand', value: selectedBrand }
        ]
    );

    const clearFilters = () => {
        setSearch('');
        setSelectedCategory('');
        setSelectedBrand('');
    };

    // Handle loading and error states
    let content;
    if (isLoading) {
        content = <Loading />;
    } else if (isError || !data?.data?.length) {
        content = <Error children="Something went wrong or no data found" />;
    }

    const categories = categoryBrand?.data?.map((item: { category: any; }) => item.category);
    const categoryOptions = categories?.filter((cat: string, index: number) => categories.indexOf(cat) === index)
        .map((category: string) => ({
            name: category,
            value: category,
            label: category
        }));

    const brands = categoryBrand?.data?.map((item: { brand: any; }) => item.brand);
    const brandOptions = brands?.filter((cat: string, index: number) => brands.indexOf(cat) === index)
        .map((brand: string) => ({
            name: brand,
            value: brand,
            label: brand
        }));

    const onChangeCategory = (e: any) => {
        setSelectedCategory(e.target.value);
    };
    const maindata = data?.data || []

    const onChangeBrand = (e: any) => {
        setSelectedBrand(e.target.value);
    };
    const maxPrice = Math.max(...maindata.map(product => product.price));


    const meta = data?.meta;

    return (
        <>
            <div>{content}</div>
            <div className="font-bold bg-gray-200 h-[30vh] flex justify-center items-center text-4xl md:text-6xl lg:text-8xl">
                SHOP
            </div>
            <div>
                <Container>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-3 gap-4">
                            <div className="flex p-5 mt-5 border border-gray-200 justify-between items-center">
                                <p className="font-bold text-gray-800">Filter</p>
                                <Button onClick={clearFilters} type="primary">Clear Filter</Button>
                            </div>
                            <div>
                                <p className="font-medium px-1 text-[#2cb1ec]">Price Range</p>
                                <Slider
                                    min={0}
                                    max={maxPrice}  // Maximum value set dynamically from the data
                                    defaultValue={0}
                                    step={100}
                                    tipFormatter={value => `₹${value}`}  // Format tooltip as currency
                                />
                            </div>
                            <div className="my-5 p-5 border border-gray-100">
                                <p className="font-medium text-[#2cb1ec]">Search your Product</p>
                                <Input
                                    placeholder="Search Your Product"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="my-5 -gray-100">
                                <div className="flex justify-between items-center border-b py-2 border-b-gray-200">
                                    <p className="font-medium px-1 text-[#2cb1ec]">Category</p>
                                    <div className="w-6 h-1 bg-[#2cb1ec]" />
                                </div>
                                <Radio.Group
                                    onChange={onChangeCategory}
                                    value={selectedCategory}
                                >
                                    {categoryOptions?.map((item: { value: unknown; label: string }, index: number) => (
                                        <Radio key={index} className="mt-4 mx-2! block! py-3" value={item.value}>
                                            {item.label}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                                <div className="flex justify-between items-center border-b py-2 border-b-gray-200">
                                    <p className="font-medium px-1 text-[#2cb1ec]">Brand</p>
                                    <div className="w-6 h-1 bg-[#2cb1ec]" />
                                </div>
                                <Radio.Group
                                    onChange={onChangeBrand}
                                    value={selectedBrand}
                                >
                                    {brandOptions?.map((item: { value: unknown; label: string }, index: number) => (
                                        <Radio key={index} className="mt-4 mx-2! block! py-3" value={item.value}>
                                            {item.label}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-9 gap-4">
                            <div className="grid justify-between items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                                {data?.data?.length ? (
                                    data.data.map((item, index) => <Card key={index} item={item} />)
                                ) : (
                                    <p>No products found</p>
                                )}
                            </div>
                            <div className="mt-10">
                                <Pagination
                                    align="center"
                                    onChange={(value) => setPage(value)}
                                    pageSize={meta?.limit}
                                    total={meta?.total}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Shop;
