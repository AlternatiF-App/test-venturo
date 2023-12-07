import { useState } from "react"
import { basePrice } from "../../helpers/currency"
import { Button } from "../atomic/button"
import Text from "../atomic/text"

const CardCart = ({ data }: {
  data: any
}) => {
  const { id, gambar, nama, harga } = data
  const [total, setTotal] = useState(1)
  const [note, setNote] = useState('')

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
        onChange={(e) => setNote(e.target.value)}
      />
    </article>
  )
}

export default CardCart
