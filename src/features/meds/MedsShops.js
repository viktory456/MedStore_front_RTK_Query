import { useGetMedsShopsQuery, selectAllDtS} from '../api/medsToShopsSlice'
import Med from './Med';
import { useSelector } from "react-redux"


const MedsShops = ({shopId}) => {

  const medsShops = useSelector(selectAllDtS)
  const medsChosen = medsShops.filter(item =>item.shopId ===shopId);
  const meds = medsChosen?.map(id => <Med key={id.id} medId={id}/>);

  return (

    <div className='medsToShops'>{meds}</div>

  )
}

export default MedsShops