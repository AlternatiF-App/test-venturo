import { useContext, useState } from "react"
import { basePrice } from "../../helpers/currency"
import { Button } from "../atomic/button"
import Text from "../atomic/text"
import { CartContext } from "../../context/cart-context"

const CardCart = ({ data }: {
  data: any
}) => {
  const { dataCart, setDataCart } = useContext<any>(CartContext)
  const { id, gambar, nama, harga } = data.data
  const [total, setTotal] = useState(1)
  const [note, setNote] = useState('')

  const addNote = (value: string) => {
    const pushNote = dataCart.map((item: any) => {
      if (id === item.data.id) {
        return  {...item, catatan: value};
      }
      return item
    })
    setDataCart(pushNote)
  }

  const changeTotalMenu = (value: number) => {
    const pushTotal = dataCart.map((item: any) => {
      if (id === item.data.id) {
        return  {...item, total: value};
      }
      return item
    })
    setDataCart(pushTotal)
  }

  return (
    <article>
      <div className='flex items-center space-x-4'>
        <div className='w-1/4'>
          <img
            src={gambar}
            alt={nama}
            title={nama}
            className='w-24 h-24 object-cover rounded-md'
          />
        </div>
        <div className='w-1/2'>
          <Text
            variant='black'
            size='h4'
            weight='600'
            className='block'
            >
            { nama }
          </Text>
          <Text
            variant='primary'
            size='h5'
            className='block'
          >
            { basePrice(harga) }
          </Text>
          <Text
            variant='black'
            size='h5'
            className='block mt-4'
          >
            mantappp
          </Text>
        </div>
        <div className='w-1/4 flex flex-col mt-auto'>
          <div className='flex items-center space-x-4'>
            <Button
              variant='primary'
              rounded='md'
              size='icon'
              disabled={total === 1}
              onClick={() => {
                setTotal(total - 1)
                changeTotalMenu(total - 1)
              }}
            >
              <>-</>
            </Button>

            <Text
              variant='black'
              size='h5'
            >
              { total }
            </Text>

            <Button
              variant='primary'
              rounded='md'
              size='icon'
              onClick={() => {
                setTotal(total + 1)
                changeTotalMenu(total + 1)
              }}
            >
              <>+</>
            </Button>
          </div>
        </div>
      </div>

      <input
        className='outline-none px-4 py-2 mt-4 border border-gray-400 rounded-md w-full'
        placeholder='Masukkan catatan disini...'
        value={note}
        onChange={(e) => {
          setNote(e.target.value)
          addNote(e.target.value)
        }}
      />
    </article>
  )
}

export default CardCart
