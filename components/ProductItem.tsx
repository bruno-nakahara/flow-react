import { memo, useState } from "react"
import dynamic from 'next/dynamic';
import {AddProductToWishListProps} from './AddProductToWishList';
//Se a aplicação for SPA, tem a opção do lazy(biblioteca)

const AddProductToWishList = dynamic<AddProductToWishListProps>(async () => {
    return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
    loading: () => <span>...Carregando</span>
})

interface ProductItemProps {
    product: {
        id: number;
        price: number;
        title: string;
        priceFormatted: string;
    }
    onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
    const [isAddingToWishList, setIsAddingToWishList] = useState(false)

    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>
            <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
            { isAddingToWishList && (
                <AddProductToWishList onRequestClose={() => setIsAddingToWishList(false)} onAddToWishList={() => onAddToWishList(product.id)}/>
            )}
        </div>
    )
}
//
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product)
})