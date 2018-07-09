import ymaps from "ymaps";

export default async function(id){
  try{
    let api = await ymaps.load();
    let map = new api.Map(id, {
      center: [55.76, 37.64],
      zoom: 10,
    });
    return ({
      api: api,
      map: map
    });
  }catch(e){
    throw e;
  }
}