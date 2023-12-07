import { useEffect, useState } from 'react';
import CardMenu from './components/molecules/card-menu';
import Header from './components/organisms/header'
import { CartContext } from './context/cart-context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './components/atomic/button';
import Text from './components/atomic/text';

const App = () => {
  const [dataCart, setDataCart] = useState([])
  const [dataMenu, setDataMenu] = useState([])
  const [valueVoucher, setValueVoucher] = useState('')
  const [nominalVoucher, setNominalVoucher] = useState(0)

  const getMenu = async () => {
    const res = await fetch('https://tes-mobile.landa.id/api/menus')
    const menu = await res.json()
    setDataMenu(menu.datas)
  }

  const useVoucher = async () => {
    await fetch(`https://tes-mobile.landa.id/api/vouchers?kode=${valueVoucher}`)
      .then(async (res: any) => {
        const voucher = await res.json()
        setNominalVoucher(voucher.datas.nominal)
      })
  }

  const handleCheckout = async () => {
    const payload = {
      nominal_diskon: (nominalVoucher === 0 || nominalVoucher === undefined) ? '0' : nominalVoucher.toString(),
      nominal_pesanan: dataCart.reduce((a: number, v: any) => a = (a + v.data.harga) * v.total, 0).toString(),
      items: dataCart.map((item: any) => {
        return {
          id: item.data.id,
          harga: item.data.harga * item.total,
          catatan: item.catatan === '' ? 'tidak ada catatan' : item.catatan
        }
      })
    }
    await fetch('https://tes-mobile.landa.id/api/order', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        const response = await res.json()
        if (response.status_code === 200) {
          toast.success(
            <div>
              <Text
                variant='black'
                size='h4'
              >
                Order berhasil dibuat, jika ingin membatalkan pesanan klik tombol dibawah
              </Text>
              <Button
                variant='primary'
                size='primary'
                className='mt-2'
                onClick={() => handleCancelOrder(response.id)}
              >
                <>Batal</>
              </Button>
            </div>,
            {
              autoClose: 5000
            }
          )
        } else if (response.status_code === 400) {
          toast.error('Order gagal dibuat', { autoClose: 5000 })
        }
      })
  }
  
  const handleCancelOrder = async (id: number) => {
    await fetch(`https://tes-mobile.landa.id/api/order/cancel/${id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      window.location.reload()
      setDataCart([])
    })
  }

  useEffect(() => {
    getMenu()
  }, [])

  return (
    <CartContext.Provider
      value={{ dataCart, setDataCart }}
    >
      <ToastContainer/>
      <div className='bg-gray-100 min-h-screen'>
        <Header
          valueVoucher={valueVoucher}
          setValueVoucher={setValueVoucher}
          handleCheckout={handleCheckout}
          useVoucher={useVoucher}
          nominalVoucher={nominalVoucher}
        />
        <main className='container mx-auto px-4 py-8 grid grid-cols-6 gap-6'>
          {
            dataMenu.map((item: any, index: number) => (
              <CardMenu key={index} data={item} />
            ))
          }
        </main>
      </div>
    </CartContext.Provider>
  );
}

export default App;
