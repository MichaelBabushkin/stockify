import { useRouter } from 'next/router'
// import syntax (recommended)
 
const Stock = (data) => {
    console.log('data ',data);
  const router = useRouter()
  const { stock } = router.query
  return (<div>

      <p>Stock: {stock}</p>
      <p>Description: {data.assetProfile.longBusinessSummary}</p>
  </div>
      )
}




export async function getServerSideProps(context) { 
    const {stock} = context.query
    const res = await fetch (`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${stock.toLowerCase()}?modules=assetProfile`)
    const data = await res.json();
    const assetProfile = data.quoteSummary.result[0].assetProfile


    return {
        props: {
            assetProfile
        }
    }
}
 
 
export default Stock