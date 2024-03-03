import React, { useEffect } from 'react';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Product } from '@/api/product.types';

type ItemCardProps = {
	isLoading: boolean;
	error: Error | null;
	product: Product;
};

// TODO: conditionally render a loading card when isLoading is true
function ItemCard({ isLoading, error, product }: ItemCardProps) {
	const router = useRouter();

	return (
		<Card
			className='py-2 w-60'
			isPressable
			onClick={() => {
				if (!error && !isLoading) {
					router.push(`/product/${product.productId}`);
				}
			}}
		>
			<CardHeader className='py-2 px-4 flex-col items-start'>
				<h4 className='font-bold text-xl'>{product && product.name}</h4>
			</CardHeader>
			<CardBody className='overflow-visible py-2'>
				<Image
					alt='Card background'
					className='object-cover rounded-xl pb-2'
					src={product && product.imgSrc}
					width={270}
				/>
				<p>${product && product.price.toFixed(2)}</p>
				<p>{product && product.description}</p>
			</CardBody>
		</Card>
	);
}

export default ItemCard;
