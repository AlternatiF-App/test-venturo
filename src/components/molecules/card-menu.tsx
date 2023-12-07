import { useContext } from "react"
import { CartContext } from "../../context/cart-context"
import { basePrice } from "../../helpers/currency"
import { Button } from "../atomic/button"
import Text from "../atomic/text"

const CardMenu = ({ data }: { data: any }) => {
  const { dataCart, setDataCart } = useContext<any>(CartContext)
  
  const handleAddToCart = () => {
    // const handleAddToCart = dataCart.map((item: any) => {
    //   if (data.id === item.data.id) {
    //     return  {...item, total: item.total + 1};
    //   } else {
    //     setDataCart([...dataCart, { data, total: 1, catatan: '' }])
    //   }
    // })
    // setDataCart(handleAddToCart)
    setDataCart([...dataCart, { data, total: 1, catatan: '' }])
  }

  return (
    <article className='bg-white px-4 py-2 rounded-md shadow-md'>
      <div>
        <img
          src={data.gambar}
          alt={data.nama}
          title={data.nama}
          className='w-48 h-40 object-cover rounded-md'
        />
      </div>
      <div className='mt-4'>
        <Text
          variant='black'
          size='h4'
          weight='600'
          className='block'
        >
          { data.nama }
        </Text>
        <Text
          variant='primary'
          size='h4'
          className='block'
        >
          { basePrice(data.harga) }
        </Text>
        <Button
          variant='primary'
          className='mt-2'
          onClick={() => handleAddToCart()}
        >
          <Text
            variant='white'
            size='h4'
          >
            Tambahkan ke Keranjang
          </Text>
        </Button>
      </div>
    </article>
  )
}

export default CardMenu
