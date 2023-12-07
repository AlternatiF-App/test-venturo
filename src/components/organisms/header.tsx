/* eslint-disable react-hooks/rules-of-hooks */
import { IoFastFoodOutline } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx";
import { BsCart3 } from "react-icons/bs"
import Text from "../atomic/text"
import { Button } from "../atomic/button"
import { useContext, useEffect, useState } from "react"
import CardCart from "../molecules/card-cart";
import { BiSolidDiscount } from "react-icons/bi";
import { basePrice } from "../../helpers/currency";
import { CartContext } from "../../context/cart-context";

const Header = ({ valueVoucher, setValueVoucher, handleCheckout, useVoucher, nominalVoucher }: {
  valueVoucher: string
  setValueVoucher: Function
  handleCheckout: Function
  useVoucher: Function
  nominalVoucher: number
}) => {
  const [cartMenu, setCartMenu] = useState(false)
  const { dataCart } = useContext<any>(CartContext)
  const finalPrice = (nominalVoucher !== undefined && nominalVoucher !== 0 && dataCart.reduce((a: number, v: any) => a = (a + v.data.harga) * v.total, 0) < nominalVoucher) ? 0 : dataCart.reduce((a: number, v: any) => a = (a + v.data.harga) * v.total, 0) - nominalVoucher

  return (
    <div className='container mx-auto flex items-center justify-between p-4'>
      <div className='flex items-center space-x-2'>
        <IoFastFoodOutline className='h-5 w-5 text-teal-500' />
        <Text
          variant='black'
          size='h4'
          weight='700'
        >
          Main Course
        </Text>
      </div>
      <div>
        <Button
          variant='secondary'
          rounded='md'
          className='border border-teal-500'
          onClick={() => setCartMenu(true)}
        >
          <div className='flex items-center space-x-2'>
            <BsCart3 className="h-5 w-5 text-teal-500" />
            <Text
              variant='black'
              size='h4'          
            >
              Keranjang
            </Text>
          </div>
        </Button>
      </div>

      {/* Side Cart Menu */}
      <div data-menu={cartMenu} onClick={() => setCartMenu(false)} className='data-[menu=false]:hidden z-20 fixed inset-0 bg-gray-400/50' />
      <div data-menu={cartMenu} className='absolute z-30 right-0 inset-y-0 w-1/4 data-[menu=false]:hidden'>
        <div className='bg-white h-screen px-4 py-2 flex flex-col'>
          {/* Header cart */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <IoFastFoodOutline className='h-5 w-5 text-teal-500' />
              <Text
                variant='black'
                size='h4'
                weight='700'
              >
                Main Course
              </Text>
            </div>
            <RxCross2 onClick={() => setCartMenu(false)} className='h-5 w-5 text-black cursor-pointer' />
          </div>

          <div className='my-4 py-4 border-y border-gray-200/60'>
            <div className='flex flex-col space-y-4'>
              {
                dataCart?.map((item: any, index: number) => {
                  return <CardCart key={index} data={item} />
                })
              }
            </div>
          </div>
          <div>
            <Text
              variant='black'
              size='h4'
              className='flex items-center'
            >
              <BiSolidDiscount className='h-5 w-5 text-teal-500 mr-2' />
              Tambah Voucher
            </Text>
            <input
              value={valueVoucher}
              onChange={(e) => setValueVoucher(e.target.value)}
              onKeyDown={(e) => { e.key === 'Enter' && useVoucher() }}
              className='outline-none px-4 py-2 mt-2 border border-gray-400 rounded-md w-full'
              placeholder='Masukkan vouchermu disini...'
            />
            <Button
              variant='primary'
              size='primary'
              rounded='md'
              className='mt-2'
              onClick={() => useVoucher()}
            >
              <>Gunakan Voucher</>
            </Button>
          </div>

          {/* Button Checkout */}
          <div className='mt-auto'>
            <div className='bg-gray-200 px-4 py-2 flex justify-between items-center'>
              <Text
                variant='black'
                size='h4'
                weight='600'
              >
                Total
              </Text>
              <Text
                variant='black'
                size='h4'
              >
                { basePrice(finalPrice) }
              </Text>
            </div>
            <Button
              variant='primary'
              rounded='md'
              size='primary'
              className='mt-4'
              onClick={() => handleCheckout()}
            >
              <>
                Buat Pesanan
              </>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
